import React, { Component } from 'react'
import { Icon, Input, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { geteditDistrictInfoThing, getloadUnitNames, getdeleteDistrict } from '../../../actions/management'
import styles from './RegiolManagementChild.scss'
import Header from '../Header/Header'
import CustomTree from './CustomTree/CustomTree'
import ModalPage from './ModalPage/ModalPage'
import InfoBg from './img/Infobg.png'


class RegiolManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interMonitorLeft: 15,
      visible: false,
      isModalPage: false,
      visibleTop: 0,
      visibleLeft: 0,
      interListHeight: 0,
      searchInterList: [],
    }
  }
  componentDidMount() {
    this.renderMineMap()
    document.addEventListener('click', (e) => {
      if (e.target !== this.searchInputBox) {
        this.setState({ interListHeight: 0 })
      }
    })
  }
  componentDidUpdate(prevState) {
    const { editDistrictInfoThing, loadUnitNames } = this.props.data
    if (prevState.data.editDistrictInfoThing !== editDistrictInfoThing) {
      this.geteditDistrictInfoThing(editDistrictInfoThing)
    }
    if (prevState.data.loadUnitNames !== loadUnitNames) {
      console.log()
      this.loadUnitName(loadUnitNames)
    }
  }
  geteditDistrictInfoThing = (editDistrictInfoThing) => {
    this.props.getloadUnitNames(editDistrictInfoThing.ID)
    this.roadDetail = editDistrictInfoThing
  }
  // 获取路口基本信息
  getInterBasicInfo = (basicInterInfo) => {
    this.belongArea = basicInterInfo.DISTRICT_NAME
    this.controlState = basicInterInfo.CONTROLSTATE
    this.alarmState = basicInterInfo.ALARMSTATE
    this.singalIp = basicInterInfo.SIGNAL_IP
    this.runStatePic = `http://192.168.1.230:8080/atms-web/resources/imgs/stage/${basicInterInfo.STAGE_IMAGE}`
    this.runText = basicInterInfo.STAGE_CODE
  }
  loadUnitName = (loadUnitNames) => {
    this.roadDetail.districtHas = loadUnitNames.districtHas
    this.setState({
      isModalPage: true,
    })
  }
  handleShowInterMonitor = () => {
    if (this.state.interMonitorLeft > 0) {
      this.setState({
        interMonitorLeft: -355,
      })
    } else {
      this.setState({
        interMonitorLeft: 15,
      })
    }
  }
  isShowModalPage = () => {
    this.setState({
      isModalPage: false,
    })
  }
  visibleShowLeft = (top, id, show) => { // 框的跳转与位置
    this.roadId = id
    if (top || id) {
      this.setState({
        visible: show,
        visibleTop: top,
      })
    } else {
      this.setState({
        visible: show,
      })
    }
  }
  handleSearchInterFocus = () => {
    this.setState({ interListHeight: 300 })
  }
  hanleSelectInter = (e) => {
    const interId = e.target.getAttribute('interid')
    const marker = document.getElementById('marker' + interId)
    const lng = e.target.getAttribute('lng')
    const lat = e.target.getAttribute('lat')
    const interName = e.target.innerText
    if (marker && this.map) {
      this.map.setCenter([lng, lat])
      marker.click()
      this.searchInputBox.value = interName
      this.setState({ interListHeight: 0 })
    } else {
      message.info('该路口尚未接入')
    }
  }
  handleSearchInputChange = (e) => {
    const { value } = e.target
    const searchInters = []
    if (this.searchTimer) {
      clearTimeout(this.searchTimer)
      this.searchTimer = null
    }
    this.searchTimer = setTimeout(() => {
      this.searchInterList.forEach((item) => {
        if (item.UNIT_NAME.indexOf(value) >= 0) {
          searchInters.push(item)
        }
      })
      this.setState({ searchInterList: searchInters })
    }, 200)
  }
  noShow = (e) => { // 禁止默认右键菜单
    e.stopPropagation()
    e.preventDefault()
  }
  addIntersection = () => { // 添加路口
    this.roadDetail = ''
    this.setState({
      isModalPage: true,
    })
  }
  delectRoad = () => { // 删除路段
    this.setState({
      visible: false,
    })
    this.props.getdeleteDistrict(this.roadId).then((res) => {
      const { code } = res.data
      if (code === 200) {
        message.success('删除成功')
      }
    })
  }
  seeGo = () => {
    this.props.geteditDistrictInfoThing(this.roadId)
    this.setState({
      visible: false,
    })
  }
  // 添加坐标点
  addMarker = () => {
    if (this.map) {
      this.infowindow += 1
      const el = document.createElement('div')
      el.id = 'marker'
      // el.style['background-image'] = 'url(/api/static/demo/js-api/zh/images/park.png)'
      el.style['background-color'] = '#ff0000'
      el.style['background-size'] = 'cover'
      el.style.width = '20px'
      el.style.height = '20px'
      el.style['border-radius'] = '50%'
      this.lnglat = this.map.getCenter()
      this.marker = new window.minemap.Marker(el, { offset: [-25, -25] })
        .setLngLat(this.lnglat)
        .setPopup(this.showInterInfo())
        .addTo(this.map)
      // el.addEventListener('click', this.showInterInfo)
    }
  }
  // 删除坐标点
  delMarker = () => {
    if (this.map && this.marker) {
      this.marker.remove()
      this.marker = null
    }
  }
  // 更新坐标点
  updateMarkerPosition = () => {
    if (this.map && this.marker) {
      const lnglat = this.map.getCenter()
      this.marker.setLngLat([lnglat.lng + 0.01, lnglat.lat + 0.01])
    }
  }
  // 关闭自定义信息窗体
  removeInterInfo = () => {
    if (this.popup) {
      this.popup.remove()
      this.popup = null
    }
  }
  // 自定义信息窗体
  showInterInfo = () => {
    this.removeInterInfo()
    const lnglat = this.map.getCenter()
    const id = `removeInterInfo${this.infowindow}`
    const infoHtml = `
      <div style="width:480px;height:260px;background:url(${InfoBg}) center center no-repeat;background-size:100% 100%;">
        <div style="position:relative;height:50px;padding-top:13px;padding-left:20px;line-height:50px;font-size:15px;">
          路口名称 ：123456
          <span id=${id} style="position:absolute;top:25px;right:25px;width:20px;height:20px;text-align:center;line-height:20px;font-size:16px;cursor:pointer;color:#49C2D5;">X</span>
        </div>
        <div style="height:200px;display:flex;padding-top:20px;font-size:14px;">
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:40px">所属城区 ：兴宁区</p>
            <p style="height:32px;line-height:32px;padding-left:40px">信号系统 ：海信</p>
            <p style="height:32px;line-height:32px;padding-left:40px">运行阶段 ：东西左转</p>
            <div style="width:80px;height:30px;margin:20px auto 0;background-color:#0F85FF;text-align:center;line-height:30px;border-radius:4px; cursor: pointer;">路口监控</div>
          </div>
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:20px">控制状态 ：本地多时段</p>
            <p style="height:32px;line-height:32px;padding-left:20px">信号机IP ：192.168.1.204</p>
            <p style="height:32px;line-height:32px;padding-left:20px">设备状态 ：正常</p>
            <div style="width:80px;height:30px;margin:20px auto 0;background-color:#0F85FF;text-align:center;line-height:30px;border-radius:4px; cursor: pointer;">路口优化</div>
          </div>
        </div>
      </div>
    `
    this.popup = new window.minemap.Popup({ closeOnClick: true, closeButton: false, offset: [-15, -25] })
      .setLngLat([lnglat.lng, lnglat.lat])
      .setHTML(infoHtml)
      .addTo(this.map)
    document.getElementById(id).addEventListener('click', this.removeInterInfo)
    return this.popup
  }
  // 初始化地图
  renderMineMap = () => {
    const map = new window.minemap.Map({
      container: 'mapContainer',
      style: '//minedata.cn/service/solu/style/id/2301',
      center: [106.709075, 26.586574],
      zoom: 14,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
    })
    this.map = map
    this.addMarker()
  }
  render() {
    const {
      interMonitorLeft,
      visible,
      visibleTop,
      isModalPage,
      searchInterList,
      interListHeight,
    } = this.state
    const { Search } = Input
    const { loadPlanTree } = this.props.data
    return (
      <div id="mapContainer" className={styles.RegiolManagementWrapper}>
        <Header {...this.props} />
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <div className={styles.title}>勤务路线查询</div>
          <div className={styles.interListBox}>
            <div className={styles.interSearch}>
              <span className={styles.searchBox}>
                <input
                  className={styles.searchInput}
                  onClick={this.handleSearchInterFocus}
                  onChange={this.handleSearchInputChange}
                  type="text"
                  placeholder="请输入你要搜索的路口"
                  ref={(input) => { this.searchInputBox = input }}
                />
                <Icon className={styles.searchIcon} type="search" />
              </span>
            </div>
            <div className={styles.interList} style={{ maxHeight: `${interListHeight}px`, overflowY: 'auto' }}>
              <div>
                {
                  loadPlanTree &&
                  loadPlanTree.map(item => (
                    <div
                      className={styles.interItem}
                      key={item.ID}
                      interid={item.ID}
                      lng={item.LONGITUDE}
                      lat={item.LATITUDE}
                      onClick={this.hanleSelectInter}
                    >{item.NAME}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className={styles.OptimizingBtns}><span>优化控制管理</span></div>
          <div className={styles.addtask}>
            <span onClick={this.addIntersection}>添加区域</span>
          </div>
          <div className={styles.treeBox}>
            <CustomTree visibleShowLeft={this.visibleShowLeft} />
          </div>
          {
            visible ?
              <ul style={{ top: `${visibleTop - 100}px` }} onContextMenu={this.noShow} className={styles.contextMenu}>
                <li onClick={this.seeGo}>查看</li>
                <li onClick={this.delectRoad}>删除</li>
              </ul> : null
          }
        </div>
        {
          isModalPage && <ModalPage roadDetail={this.roadDetail} isShowModalPage={this.isShowModalPage} />
        }
      </div >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.managements,
  }
}
const mapDisPatchToProps = dispatch => ({
  geteditDistrictInfoThing: bindActionCreators(geteditDistrictInfoThing, dispatch),
  getloadUnitNames: bindActionCreators(getloadUnitNames, dispatch),
  getdeleteDistrict: bindActionCreators(getdeleteDistrict, dispatch),
})
export default connect(mapStateToProps, mapDisPatchToProps)(RegiolManagement)

