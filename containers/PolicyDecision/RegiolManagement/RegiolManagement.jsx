import React, { Component } from 'react'
import { Icon, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CustomInterTree from '_C/CustomInterTree/CustomInterTree'
import styles from './RegiolManagement.scss'

import Header from '../Header/Header'
import ModalPage from '../InterManagement/ModalPage/ModalPage'
import ModalPages from './ModalPage/ModalPage'
import mapStyles from '../../../utils/styles_2301'
import InfoBg from './img/info_bg.png'

import { getBasicInterInfo, getInterList, getLoadPlanTree, getLoadChildTree, geteditDistrictInfoThings, getAreaList } from '../../../actions/data'
import { getUnitInterInfo } from '../../../actions/InterManage'
import { getloadUnitNames, getdeleteDistrict, getnewchildree } from '../../../actions/management'

class RegiolManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInterList: null,
      interListHeight: 0,
      interMonitorLeft: 15,
      visibleTop: 0,
      isModalPage: false,
      visible: false,
      showAreaMsg: false,
    }
    this.markers = []
    this.searchInterList = []
  }
  componentDidMount() {
    this.renderMineMap()
    this.props.getAreaList()
    this.props.getLoadPlanTree()
    document.addEventListener('click', (e) => {
      if (e.target !== this.searchInputBox) {
        this.setState({ interListHeight: 0 })
      }
    })
  }
  componentDidUpdate = (prevState) => {
    const { areaList, basicInterInfo, editDistrictInfoThings, loadUnitNames, interList } = this.props.data
    if (prevState.data.interList !== interList) {
      this.getInterLists(interList)
    }
    if (prevState.data.areaList !== areaList) {
      this.getAreaList(areaList)
    }
    if (prevState.data.basicInterInfo !== basicInterInfo) {
      this.getInterBasicInfo(basicInterInfo)
    }
    if (prevState.data.editDistrictInfoThings !== editDistrictInfoThings) {
      this.geteditDistrictInfoThings(editDistrictInfoThings)
    }
    if (prevState.data.loadUnitNames !== loadUnitNames) {
      this.getloadUnitNames(loadUnitNames)
    }
  }
  getloadUnitNames = (loadUnitNames) => {
    this.roadDetail.districtHas = loadUnitNames.districtHas
    this.setState({
      showAreaMsg: true,
    })
  }
  geteditDistrictInfoThings = (editDistrictInfoThing) => {
    this.props.getloadUnitNames(editDistrictInfoThing.ID)
    this.roadDetail = editDistrictInfoThing
  }
  // 道路列表
  getInterLists = (interList) => {
    this.addMarker(interList)
  }
  // 路口列表
  getAreaList = (areaList) => {
    this.searchInterList = areaList
    this.setState({
      searchInterList: areaList,
    })
  }
  // 从子集获取区域id和index 请求路口
  getSelectTreeId = (id) => {
    this.props.getLoadChildTree(id)
  }
  // 获取子id, 路口id
  getSelectChildId = (chidlId, lng, lat) => {
    const marker = document.getElementById('marker' + chidlId)
    if (marker && this.map) {
      this.map.setCenter([lng, lat])
      marker.click()
    } else {
      message.info('该路口尚未接入')
    }
  }
  // 获取路口基本信息
  getInterBasicInfo = (basicInterInfo) => {
    this.belongArea = basicInterInfo.DISTRICT_NAME
    this.controlState = basicInterInfo.CONTROLSTATE
    this.alarmState = basicInterInfo.ALARMSTATE
    this.singalIp = basicInterInfo.SIGNAL_IP
    // this.runStatePic = `http://192.168.1.230:8080/atms-web/resources/imgs/stage/${basicInterInfo.STAGE_IMAGE}`
    this.runStatePic = `http://10.11.57.101:20206/atms-web/resources/imgs/stage/${basicInterInfo.STAGE_IMAGE}`
    this.runText = basicInterInfo.STAGE_CODE
  }
  addIntersection = () => { // 添加路口
    this.roadDetail = ''
    this.setState({
      showAreaMsg: true,
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
    this.props.geteditDistrictInfoThings(this.roadId)
    this.setState({
      visible: false,
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
  hanleSelectInterSelect = (e) => { // 下拉框选择切换
    const values = e.currentTarget.innerText
    this.searchInputBox.value = values
    const arrs = this.searchInterList.filter(item => item.NAME === values)
    this.props.getnewchildree(arrs)
  }
  hanleSelectInter = (e) => {
    const interId = e.currentTarget.getAttribute('interid')
    const marker = document.getElementById('marker' + interId)
    const lng = Number(e.currentTarget.getAttribute('lng'))
    const lat = Number(e.currentTarget.getAttribute('lat'))
    // const interName = e.currentTarget.innerText
    if (marker && this.map) {
      this.map.setCenter([lng, lat])
      // marker.click()
      // this.searchInputBox.value = interName
      // this.setState({ interListHeight: 0 })
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
        if (item.NAME.includes(value)) {
          searchInters.push(item)
        }
      })
      this.setState({ searchInterList: searchInters })
    }, 200)
    if (value === '') {
      this.props.getnewchildree(this.searchInterList)
    }
  }
  handleShowInterMonitor = () => {
    if (this.state.interMonitorLeft > 0) {
      this.setState({ interMonitorLeft: -345 })
    } else {
      this.setState({ interMonitorLeft: 15 })
    }
  }
  noShow = (e) => { // 禁止默认右键菜单
    e.stopPropagation()
    e.preventDefault()
  }
  isShowModalPage = () => { // 取消弹窗页面
    this.setState({ showAreaMsg: false, isModalPage: false })
  }
  // 添加坐标点
  addMarker = (interList) => {
    if (this.map) {
      this.infowindow += 1
      interList.forEach((item) => {
        const el = document.createElement('div')
        el.id = `marker${item.ID}`
        el.style.width = '22px'
        el.style.height = '22px'
        el.style.borderRadius = '50%'
        el.style.backgroundImage = 'linear-gradient(to bottom, #DFFBB3, #37DF1A)'
        new Promise((resolve) => {
          resolve(this.props.getBasicInterInfo(item.ID))
        }).then(() => {
          const marker = new window.minemap.Marker(el, { offset: [-11, -11] }).setLngLat({ lng: item.LONGITUDE, lat: item.LATITUDE })
            .setPopup(this.showInterInfo(item.LONGITUDE, item.LATITUDE, item.UNIT_NAME, item.SIGNAL_SYSTEM_CODE === 4 ? '海信' : '中控', item.ID))
            .addTo(this.map)
          this.markers.push(marker)
        })
      })
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
  showInterInfo = (lng, lat, interName, singalSys, interId) => {
    this.removeInterInfo()
    const id = `monitor${interId}`
    // <span id=${id} style="position:absolute;top:25px;right:25px;width:20px;height:20px;text-align:center;line-height:20px;font-size:16px;cursor:pointer;color:#49C2D5;">X</span>
    const infoHtml = `
    <div style="width:480px;height:260px;background:linear-gradient(to bottom, rgba(29, 64, 113, 0.9), rgba(21, 46, 83, 0.9));">
    <div style="color:#60B5F1;position:relative;height:50px;padding-top:13px;padding-left:20px;line-height:50px;font-size:15px;">
      路口名称 ：${interName}
    </div>
    <div style="height:130px;display:flex;padding-top:20px;font-size:14px;">
      <div style="flex:1;">
        <p style="height:32px;line-height:32px;padding-left:40px"><span style="color:#599FE0">所属城区 ：</span>${this.belongArea}</p>
        <p style="height:32px;line-height:32px;padding-left:40px"><span style="color:#599FE0">信号系统 ：</span>${singalSys}</p>
        <p style="height:32px;line-height:32px;padding-left:40px"><span style="color:#599FE0">运行阶段 ：</span><img width="36px" height="36px" src="${this.runStatePic}" />${this.runText || ''}</p>
      </div>
      <div style="flex:1;">
        <p style="height:32px;line-height:32px;padding-left:20px"><span style="color:#599FE0">控制状态 ：</span>${this.controlState}</p>
        <p style="height:32px;line-height:32px;padding-left:20px"><span style="color:#599FE0">信号机IP ：</span>${this.singalIp}</p>
        <p style="height:32px;line-height:32px;padding-left:20px"><span style="color:#599FE0">设备状态 ：</span>${this.alarmState}</p>
      </div>
    </div>
    <div style="height:40px;display:flex;justify-content:center;align-items:center;">
      <div id="${id}" style="width:80px;color:#2CB3E3;height:30px;margin:20px auto 0;background-color:#0673B6;text-align:center;line-height:30px;border-radius:4px;cursor:pointer;">路口信息</div>
    </div>
  </div>
    `
    this.popup = new window.minemap.Popup({ closeOnClick: true, closeButton: false, offset: [-1, -10] })
      .setLngLat([lng, lat])
      .setHTML(infoHtml)
      .addTo(this.map)
    if (document.getElementById(id)) {
      document.getElementById(id).addEventListener('click', () => {
        this.setState({ isModalPage: true })
        this.props.getUnitInterInfo(interId) // 获取路口信息
      })
    }
    return this.popup
  }
  // 初始化地图
  renderMineMap = () => {
    const map = new window.minemap.Map({
      container: 'mapContainer',
      // style: '//10.11.57.105:60050/service/solu/style/id/4636',
      // style: '//221.13.10.30:22191/service/solu/style/id/4636',
      style: mapStyles,
      center: [106.713906, 26.59579],
      zoom: 14,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
    })
    this.map = map
    this.map.on('load', () => {
      this.props.getInterList()
    })
  }

  render() {
    const {
      interMonitorLeft, isModalPage, searchInterList, interListHeight, visible, visibleTop, showAreaMsg,
    } = this.state
    return (
      <div id="mapContainer" className={styles.InterManagementWrapper}>
        <Header {...this.props} />
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <div className={styles.title}>区域查询</div>
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
                  searchInterList &&
                  searchInterList.map(item => (
                    <div
                      className={styles.interItem}
                      key={item.ID}
                      interid={item.ID}
                      onClick={this.hanleSelectInterSelect}
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
            <CustomInterTree
              {...this.props}
              visibleShowLeft={this.visibleShowLeft}
              getSelectTreeId={this.getSelectTreeId}
              getSelectChildId={this.getSelectChildId}
            />
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
          isModalPage && <ModalPage {...this.props} isShowModalPage={this.isShowModalPage} />
        }
        {
          showAreaMsg && <ModalPages roadDetail={this.roadDetail} isShowModalPage={this.isShowModalPage} />
        }
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: { ...state.data, ...state.interManage, ...state.managements },
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    geteditDistrictInfoThings: bindActionCreators(geteditDistrictInfoThings, dispatch),
    getInterList: bindActionCreators(getInterList, dispatch),
    getBasicInterInfo: bindActionCreators(getBasicInterInfo, dispatch),
    getLoadPlanTree: bindActionCreators(getLoadPlanTree, dispatch),
    getLoadChildTree: bindActionCreators(getLoadChildTree, dispatch),
    getnewchildree: bindActionCreators(getnewchildree, dispatch),
    getUnitInterInfo: bindActionCreators(getUnitInterInfo, dispatch),
    getloadUnitNames: bindActionCreators(getloadUnitNames, dispatch),
    getdeleteDistrict: bindActionCreators(getdeleteDistrict, dispatch),
    getAreaList: bindActionCreators(getAreaList, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(RegiolManagement)
