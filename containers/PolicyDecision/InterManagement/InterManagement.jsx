import React, { Component } from 'react'
import { Icon, Input } from 'antd'
import styles from './InterManagement.scss'
import Header from '../Header/Header'
import CustomTree from './CustomTree/CustomTree'
import ModalPage from './ModalPage/ModalPage'
import InfoBg from './img/Infobg.png'

class InterManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interMonitorLeft: 15,
      isIntersection: true,
      isModalPage: true,
      visible: false,
      visibleTop: 0,
      visibleLeft: 0,
    }
  }
  componentDidMount() {
    this.renderMineMap()
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
  visibleShowLeft = (top, id, show) => { // 框的跳转与位置
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
  noShow = (e) => { // 禁止默认右键菜单
    e.stopPropagation()
    e.preventDefault()
  }

  addIntersection = () => { // 添加路口
    this.setState({
      isIntersection: false,
    })
  }
  removeIntersection = () => { // 取消添加路口
    this.setState({
      isIntersection: true,
    })
  }
  isShowModalPage = () => { // 取消弹窗页面
    this.setState({
      isModalPage: false,
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
      isIntersection,
    } = this.state
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
            <CustomTree visibleShowLeft={this.visibleShowLeft} />
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

export default InterManagement
