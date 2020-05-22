import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './Monitoring.scss'
import Header from '../Header/Header'
import InterMonitor from './InterMonitor/InterMonitor'
import InfoBg from '../InterManagement/img/info_bg.png'

import { getInterList, getBasicInterInfo, getGlobalUnitInfo } from '../../../actions/data'

class Monitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.markers = []
  }
  componentDidMount() {
    this.renderMineMap()
  }
  componentDidUpdate = (prevState) => {
    const { globalUnitInfos, basicInterInfo } = this.props.data
    if (prevState.data.globalUnitInfos !== globalUnitInfos) {
      this.getInterLists(globalUnitInfos)
    }
    if (prevState.data.basicInterInfo !== basicInterInfo) {
      this.getInterBasicInfo(basicInterInfo)
    }
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
  // 路口列表
  getInterLists = (globalUnitInfos) => {
    this.addMarker(globalUnitInfos)
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
      <div style="width:480px;height:260px;background:url(${InfoBg}) center center no-repeat;background-size:100% 100%;">
        <div style="position:relative;height:50px;padding-top:13px;padding-left:20px;line-height:50px;font-size:15px;">
          路口名称 ：${interName}
        </div>
        <div style="height:130px;display:flex;padding-top:20px;font-size:14px;">
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:40px">所属城区 ：${this.belongArea}</p>
            <p style="height:32px;line-height:32px;padding-left:40px">信号系统 ：${singalSys}</p>
            <p style="height:32px;line-height:32px;padding-left:40px">运行阶段 ：<img width="36px" height="36px" src="${this.runStatePic}" />${this.runText || ''}</p>
          </div>
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:20px">控制状态 ：${this.controlState}</p>
            <p style="height:32px;line-height:32px;padding-left:20px">信号机IP ：${this.singalIp}</p>
            <p style="height:32px;line-height:32px;padding-left:20px">设备状态 ：${this.alarmState}</p>
          </div>
        </div>
        <div style="height:40px;display:flex;justify-content:center;align-items:center;">
          <div id="${id}" style="width:80px;height:30px;margin:20px auto 0;background-color:#0F85FF;text-align:center;line-height:30px;border-radius:4px;cursor:pointer;">路口监控</div>
        </div>
      </div>
    `
    this.popup = new window.minemap.Popup({ closeOnClick: true, closeButton: false, offset: [-1, -10] })
      .setLngLat([lng, lat])
      .setHTML(infoHtml)
      .addTo(this.map)
    if (document.getElementById(id)) {
      document.getElementById(id).addEventListener('click', () => {
        window.open(`#/interdetails/${interId}`)
      })
    }
    return this.popup
  }
  resetMapCenter = (lng, lat) => {
    this.map.setCenter([lng, lat])
  }
  // 初始化地图
  renderMineMap = () => {
    const map = new window.minemap.Map({
      container: 'mapContainer',
      style: '//minedata.cn/service/solu/style/id/2301',
      center: [106.713906, 26.59579],
      zoom: 14,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
    })
    this.map = map
    this.map.on('load', () => {
      // this.props.getInterList()
      this.props.getGlobalUnitInfo()
    })
  }
  render() {
    return (
      <div className={styles.monitorWrapper} id="mapContainer">
        <Header {...this.props} />
        <InterMonitor {...this.props} resetMapCenter={this.resetMapCenter} />
      </div>
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
    getGlobalUnitInfo: bindActionCreators(getGlobalUnitInfo, dispatch),
    getInterList: bindActionCreators(getInterList, dispatch),
    getBasicInterInfo: bindActionCreators(getBasicInterInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(Monitoring)
