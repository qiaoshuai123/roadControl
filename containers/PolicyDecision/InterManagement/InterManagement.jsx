import React, { Component } from 'react'
import { Icon, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CustomInterTree from '_C/CustomInterTree/CustomInterTree'
import styles from './InterManagement.scss'

import Header from '../Header/Header'
import ModalPage from './ModalPage/ModalPage'

import InfoBg from './img/info_bg.png'

import { getInterList, getBasicInterInfo, getLoadPlanTree, getLoadChildTree } from '../../../actions/data'
import { getUnitInterInfo } from '../../../actions/InterManage'

class InterManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInterList: null,
      interListHeight: 0,
      interMonitorLeft: 15,
      isIntersection: true,
      isModalPage: false,
    }
    this.markers = []
    this.searchInterList = []
  }
  componentDidMount() {
    this.renderMineMap()
    console.log(this.props)
    this.props.getInterList()
    this.props.getLoadPlanTree()
    this.props.getUnitInterInfo(5)
    document.addEventListener('click', (e) => {
      if (e.target !== this.searchInputBox) {
        this.setState({ interListHeight: 0 })
      }
    })
  }
  componentDidUpdate = (prevState) => {
    const { interList } = this.props.data
    if (prevState.data.interList !== interList) {
      this.getInterLists(interList)
    }
  }
  // 路口列表
  getInterLists = (interList) => {
    this.searchInterList = interList
    this.setState({
      searchInterList: interList,
    }, () => {
      this.addMarker(interList)
    })
  }
  // 从子集获取区域id和index 请求路口
  getSelectTreeId = (id) => {
    this.props.getLoadChildTree(id)
  }
  // 获取子id, 路口id
  getSelectChildId = (chidlId) => {
    const marker = document.getElementById('marker' + chidlId)
    marker.click()
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

  addIntersection = () => { // 添加路口
    this.setState({ isIntersection: false })
  }
  removeIntersection = () => { // 取消添加路口
    this.setState({ isIntersection: true })
  }
  isShowModalPage = () => { // 取消弹窗页面
    this.setState({ isModalPage: false })
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
          const marker = new window.minemap.Marker(el, { offset: [-25, -25] }).setLngLat({ lng: item.LONGITUDE, lat: item.LATITUDE })
            .setPopup(this.showInterInfo(item.LONGITUDE, item.LATITUDE, item.UNIT_NAME, item.SIGNAL_SYSTEM_CODE === 4 ? '海信' : '西门子', item.ID))
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
  showInterInfo = () => {
    this.removeInterInfo()
    const lnglat = this.map.getCenter()
    // const id = `removeInterInfo${this.infowindow}`
    // <span id=${id} style="position:absolute;top:25px;right:25px;width:20px;height:20px;text-align:center;line-height:20px;font-size:16px;cursor:pointer;color:#49C2D5;">X</span>
    const infoHtml = `
      <div style="width:480px;height:260px;background:url(${InfoBg}) center center no-repeat;background-size:100% 100%;">
        <div style="position:relative;height:50px;padding-top:13px;padding-left:20px;line-height:50px;font-size:15px;">
          路口名称 ：123456
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
    // document.getElementById(id).addEventListener('click', this.removeInterInfo)
    return this.popup
  }
  // 初始化地图
  renderMineMap = () => {
    const map = new window.minemap.Map({
      container: 'mapContainer',
      style: '//minedata.cn/service/solu/style/id/2301',
      center: [108.322286, 22.810375],
      zoom: 14,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
    })
    this.map = map
  }

  render() {
    const {
      interMonitorLeft, isModalPage, isIntersection, searchInterList, interListHeight,
    } = this.state
    return (
      <div id="mapContainer" className={styles.InterManagementWrapper}>
        <Header {...this.props} />
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <div className={styles.title}>路口查询</div>
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
                      lng={item.LONGITUDE}
                      lat={item.LATITUDE}
                      onClick={this.hanleSelectInter}
                    >{item.UNIT_NAME}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className={styles.OptimizingBtns}><span>优化控制管理</span></div>
          <div className={styles.addtask}>
            {
              isIntersection ?
                <span onClick={this.addIntersection}>添加路口</span> :
                <span style={{ borderColor: '#184783' }} onClick={this.removeIntersection}>取消添加</span>
            }
          </div>
          <div className={styles.treeBox}>
            <CustomInterTree
              {...this.props}
              getSelectTreeId={this.getSelectTreeId}
              getSelectChildId={this.getSelectChildId}
            />
          </div>
        </div>
        {
          isModalPage && <ModalPage isShowModalPage={this.isShowModalPage} />
        }
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: { ...state.data, ...state.interManage },
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getInterList: bindActionCreators(getInterList, dispatch),
    getBasicInterInfo: bindActionCreators(getBasicInterInfo, dispatch),
    getLoadPlanTree: bindActionCreators(getLoadPlanTree, dispatch),
    getLoadChildTree: bindActionCreators(getLoadChildTree, dispatch),
    getUnitInterInfo: bindActionCreators(getUnitInterInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(InterManagement)
