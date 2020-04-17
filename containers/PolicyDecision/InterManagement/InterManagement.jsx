import React, { Component } from 'react'
import { Icon, Input } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './InterManagement.scss'

import Header from '../Header/Header'
import CustomTree from './CustomTree/CustomTree'
import ModalPage from './ModalPage/ModalPage'

import InfoBg from './img/info_bg.png'
import OnlineH from './img/online_h.png'
import OutlineH from './img/outline_h.png'
import OnlineS from './img/online_s.png'
import OutlineS from './img/ouline_s.png'

import { getInterList, getBasicInterInfo, getLoadPlanTree, getLoadChildTree } from '../../../actions/data'

class InterManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interList: null,
      searchInterList: null,
      interMonitorLeft: 15,
      isIntersection: true,
      isModalPage: true,
      visible: false,
      visibleTop: 0,
      loadPlanTree: null,
      defaultChildren: null,
    }
    this.markers = []
  }
  componentDidMount() {
    this.renderMineMap()
    console.log(this.props)
    this.props.getInterList()
    this.props.getLoadPlanTree()
  }
  componentDidUpdate = (prevState) => {
    const { interList, loadPlanTree, loadChildTree } = this.props.data
    if (prevState.data.interList !== interList) {
      this.getInterLists(interList)
    }
    if (prevState.data.loadPlanTree !== loadPlanTree) {
      this.getPlanTree(loadPlanTree)
    }
    if (prevState.data.loadChildTree !== loadChildTree) {
      this.getPlanChildTree(loadChildTree)
    }
  }
  getPlanTree = (loadPlanTree) => {
    this.defaultChildren = loadPlanTree.map(() => [])
    this.setState({ loadPlanTree, defaultChildren: this.defaultChildren })
  }
  // 路口列表
  getInterLists = (interList) => {
    this.searchInterList = interList
    this.setState({
      interList,
      searchInterList: interList,
    }, () => {
      this.addMarker(interList)
    })
  }
  // 从子集获取区域id和index 请求路口
  getSelectTreeId = (id, index) => {
    this.treeIndex = index
    this.props.getLoadChildTree(id)
  }
  // 二级目录 路口
  getPlanChildTree = (loadChildTree) => {
    console.log(loadChildTree)
    this.defaultChildren.splice(this.treeIndex, 1, loadChildTree)
    this.setState({ defaultChildren: this.defaultChildren })
  }
  handleShowInterMonitor = () => {
    if (this.state.interMonitorLeft > 0) {
      this.setState({ interMonitorLeft: -355 })
    } else {
      this.setState({ interMonitorLeft: 15 })
    }
  }
  visibleShowLeft = (top, id, show) => { // 框的跳转与位置
    if (top || id) {
      this.setState({
        visible: show,
        visibleTop: top,
      })
    } else {
      this.setState({ visible: show })
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
        if (item.SIGNAL_SYSTEM_CODE === 4 || item.SIGNAL_SYSTEM_CODE === 3) {
          const sysIcon = item.CONTROL_STATE === 10 && item.SIGNAL_SYSTEM_CODE === 4 ? OutlineH :
            item.CONTROL_STATE !== 10 && item.SIGNAL_SYSTEM_CODE === 4 ? OnlineH :
              item.CONTROL_STATE === 10 && item.SIGNAL_SYSTEM_CODE === 3 ? OutlineS :
                item.CONTROL_STATE !== 10 && item.SIGNAL_SYSTEM_CODE === 3 ? OnlineS : null
          el.style.background = `url(${sysIcon}) center center no-repeat`
          el.style['background-size'] = '100% 100%'
          el.style.width = '22px'
          el.style.height = '22px'
          new Promise((resolve) => {
            resolve(this.props.getBasicInterInfo(item.ID))
          }).then(() => {
            const marker = new window.minemap.Marker(el, { offset: [-25, -25] }).setLngLat({ lng: item.LONGITUDE, lat: item.LATITUDE })
              .setPopup(this.showInterInfo(item.LONGITUDE, item.LATITUDE, item.UNIT_NAME, item.SIGNAL_SYSTEM_CODE === 4 ? '海信' : '西门子', item.ID))
              .addTo(this.map)
            this.markers.push(marker)
          })
        }
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
      center: [108.322286, 22.810375],
      zoom: 14,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
    })
    this.map = map
  }

  render() {
    const { interMonitorLeft, visible, visibleTop, isModalPage, isIntersection, loadPlanTree, defaultChildren } = this.state
    const { Search } = Input
    return (
      <div id="mapContainer" className={styles.InterManagementWrapper}>
        <Header {...this.props} />
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <div className={styles.title}>勤务路线查询</div>
          <div className={styles.searchBox}>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: '100%' }}
            />
          </div>
          <div className={styles.OptimizingBtns}><span>优化控制管理</span></div>
          <div className={styles.addtask}>
            {
              isIntersection ? <span onClick={this.addIntersection}>添加路口</span> : <span style={{ borderColor: '#184783' }} onClick={this.removeIntersection}>取消添加</span>
            }
          </div>
          <div className={styles.treeBox}>
            {
              defaultChildren &&
              <CustomTree
                visibleShowLeft={this.visibleShowLeft}
                loopDate={loadPlanTree}
                childrenData={defaultChildren}
                getSelectTreeId={this.getSelectTreeId}
              />
            }
          </div>
          {
            visible ?
              <ul style={{ top: `${visibleTop - 100}px` }} onContextMenu={this.noShow} className={styles.contextMenu}>
                <li>查看</li>
                <li>删除</li>
              </ul> : null
          }
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
    data: state.data,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getInterList: bindActionCreators(getInterList, dispatch),
    getBasicInterInfo: bindActionCreators(getBasicInterInfo, dispatch),
    getLoadPlanTree: bindActionCreators(getLoadPlanTree, dispatch),
    getLoadChildTree: bindActionCreators(getLoadChildTree, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(InterManagement)
