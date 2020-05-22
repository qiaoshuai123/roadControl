import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select, Icon, message } from 'antd'
import transfromXY from '../../../utils/transformMapXY'

import Header from '../Header/Header'
import Form from './form/Form'
import Histogram from '../../../components/Histogram/histogram'
import HollowPie from '../../../components/HollowPie/HollewPie'
import GraphCharts from '../../../components/GraphCharts/GraphCharts'
import styles from './Signahome.scss'

import InfoBg from './img/infobg.png'
import OnlineH from './img/online_h.png'
import OutlineH from './img/outline_h.png'
import OnlineS from './img/online_s.png'
import OutlineS from './img/ouline_s.png'

import { getInterList, getControlRoads, getControlCount, getPlanTime, getControlStatus, getRealTimeStatus, getfaultStatistics, getBasicInterInfo } from '../../../actions/data'

class SignalHome extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      interList: null,
      searchInterList: null,
      interListHeight: 0,
      controlRoads: [],
      controlCounts: [],
      planTimes: [],
      controlStatus: null,
      realTimeStatus: null,
      realTimeState: null,
      faultCompare: null,
      hisenseSingal: '000',
      siemensSingal: '000',
    }
    this.searchInterList = []
    this.markers = []
    this.infowindow = 0
    this.pieColor = ['#00cf4d', '#d3692f', '#0f85ff', '#00E8FF']
    this.time = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  }
  componentDidMount = () => {
    this.renderMineMap()
    this.props.getInterList()
    this.props.getControlRoads()
    this.props.getControlCount()
    this.props.getPlanTime()
    this.props.getControlStatus()
    this.props.getRealTimeStatus()
    this.props.getfaultStatistics()
    document.addEventListener('click', (e) => {
      if (e.target !== this.searchInputBox) {
        this.setState({ interListHeight: 0 })
      }
    })
  }
  componentDidUpdate = (prevState) => {
    const { interList, controlRoads, controlCounts, planTimes, controlStatus, realTimeStatus, faultStatistics, basicInterInfo } = this.props.data
    if (prevState.data.interList !== interList) {
      this.getInterList(interList)
    }
    if (prevState.data.controlRoads !== controlRoads) {
      this.getControlRoads(controlRoads)
    }
    if (prevState.data.controlCounts !== controlCounts) {
      this.getControlCount(controlCounts)
    }
    if (prevState.data.planTimes !== planTimes) {
      this.getPlanTimes(planTimes)
    }
    if (prevState.data.controlStatus !== controlStatus) {
      this.getControlState(controlStatus)
    }
    if (prevState.data.realTimeStatus !== realTimeStatus) {
      this.getRealTimeState(realTimeStatus)
    }
    if (prevState.data.faultStatistics !== faultStatistics) {
      this.getfaultTotle(faultStatistics)
    }
    if (prevState.data.basicInterInfo !== basicInterInfo) {
      this.getInterBasicInfo(basicInterInfo)
    }
  }
  // 路口列表
  getInterList = (interList) => {
    this.searchInterList = interList
    this.setState({
      interList,
      searchInterList: interList,
    }, () => {
      this.addMarker(interList)
    })
  }
  // 手控路口
  getControlRoads = (controlRoads) => {
    this.setState({ controlRoads })
  }
  // 手控次数
  getControlCount = (controlCounts) => {
    this.setState({ controlCounts })
  }
  // 配时变更
  getPlanTimes = (planTimes) => {
    this.setState({ planTimes })
  }
  // 信号变更状态
  getControlState = (controlStatus) => {
    const xdata = []
    const serise = []
    const obj = {}
    controlStatus.forEach((item) => {
      xdata.push(item.CODE_NAME)
      serise.push(item.C_CODE)
    })
    obj.xData = xdata
    obj.seriseData = serise
    this.setState({ controlStatus: obj })
  }
  // 实时状态
  getRealTimeState = (realTimeStatus) => {
    const serise = []
    const obj = {}
    let totleDevice = 0
    let hisenseSingal = 0
    let siemensSingal = 0
    realTimeStatus.forEach((item) => {
      if (item.SIGNAL_SYSTEM_CODE === 3 || item.SIGNAL_SYSTEM_CODE === 4) {
        const devices = {}
        devices.value = item.UNNORMALSIZE + item.NORMALSIZE
        devices.name = item.CODE_NAME
        totleDevice += devices.value
        serise.push(devices)
        const num = item.UNNORMALSIZE + item.NORMALSIZE
        if (item.SIGNAL_SYSTEM_CODE === 4) {
          hisenseSingal = String(num).length === 2 ? '0' + num : String(num).length === 1 ? '00' + num : String(num)
        }
        if (item.SIGNAL_SYSTEM_CODE === 3) {
          siemensSingal = String(num).length === 2 ? '0' + num : String(num).length === 1 ? '00' + num : String(num)
        }
      }
    })
    obj.seriseData = serise
    obj.totleDevice = totleDevice
    this.setState({
      realTimeStatus: obj,
      realTimeState: realTimeStatus,
      hisenseSingal,
      siemensSingal,
    })
  }
  // 故障统计
  getfaultTotle = (faultTotle) => {
    const today = new Array(24).fill(0)
    const yesterday = new Array(24).fill(0)
    faultTotle.today.forEach((item) => {
      const indexs = this.time.indexOf(item.HOURTIME)
      if (indexs >= 0) {
        today.splice(indexs, 1, item.UNITSIZE)
      }
    })
    faultTotle.yesterday.forEach((item) => {
      const indexs = this.time.indexOf(item.HOURTIME)
      if (indexs >= 0) {
        yesterday.splice(indexs, 1, item.UNITSIZE)
      }
    })
    this.setState({ faultCompare: { today, yesterday } })
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
            const lnglats = transfromXY(item.LONGITUDE, item.LATITUDE) // lng: lnglats.lat, lat: lnglats.lon
            console.log('转换前：', item.LONGITUDE, item.LATITUDE)
            console.log('转换后：', lnglats.lat, lnglats.lon)
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
    if (this.map && this.markers.length) {
      this.markers.forEach((item) => {
        item.remove()
      })
      this.markers = []
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
    this.popup = new window.minemap.Popup({ closeOnClick: true, closeButton: false, offset: [-15, -25] })
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
  }
  render() {
    const { interListHeight, interList, hisenseSingal, siemensSingal, searchInterList, controlCounts } = this.state
    return (
      <div className={styles.signalHomeBox} id="mapContainer">
        <Header {...this.props} />
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
        <div className={styles.interSysBox}>
          <div style={{ color: '#08FBED' }}>系统点位分布类型：</div>
          <div className={styles.systemPoint}>
            <div><span className={styles.upIconBox}><i /><b /></span>海信系统</div>
            <div><span className={styles.squareBox} />西门子</div>
            {/* <div><span className={styles.circleBox} />泰尔文特</div> */}
          </div>
        </div>
        <div className={styles.signaContainer_left}>
          <div className={`${styles.signaContainer_left_box} ${styles.controlRoadBox}`}>
            {
              this.state.controlRoads &&
              <Form name="最新手控路口TOP15" headOne="区域" headTwo="路口名称" headTre="最新控制时间" datas={this.state.controlRoads} />
            }
          </div>
          <div className={styles.signaContainer_left_box}>
            <div className={styles.title}>实时信号控制状态</div>
            <div style={{ height: '260px' }}>
              {
                this.state.controlStatus &&
                <Histogram chartsDatas={this.state.controlStatus} />
              }
            </div>
          </div>
          <div className={styles.title}>信号机实时状态统计</div>
          <div className={`${styles.signaContainer_left_box} ${styles.signaContainer_left_boxer}`}>
            <div className={styles.signaContainerLB_left}>
              <div style={{ height: '260px' }}>
                {
                  this.state.realTimeStatus &&
                  <HollowPie chartsDatas={this.state.realTimeStatus} />
                }
              </div>
            </div>
            <div className={styles.signaContainerLB_right}>
              {
                this.state.realTimeState &&
                this.state.realTimeState.map((item, index) => {
                  const totle = this.state.realTimeStatus.totleDevice
                  if (item.SIGNAL_SYSTEM_CODE === 3 || item.SIGNAL_SYSTEM_CODE === 4) {
                    return (
                      <dl key={item.CODE_NAME}>
                        <dt><b className={styles.bone} style={{ backgroundColor: this.pieColor[index] }} /><li>{item.CODE_NAME}</li><li className={styles.lione} style={{ color: this.pieColor[index] }}>在线{item.NORMALSIZE}处</li></dt>
                        <dd><b /><li className={styles.nums}>{((item.NORMALSIZE + item.UNNORMALSIZE) / totle).toFixed(1) * 100}%</li><li className={styles.lione} style={{ color: this.pieColor[index] }}>离线{item.UNNORMALSIZE}处</li></dd>
                      </dl>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
        <div className={styles.signaContainer_center}>
          <div className={`${styles.road_show_item} ${styles.buling}`}>
            <div><span>全市</span><span>信号点位</span></div>
            <div>
              {
                interList &&
                new Array(String(interList.length).length).fill(true).map((item, index) => (
                  <span key={item + index}>{String(interList.length).charAt(index)}</span>
                ))
              }
            </div><div>处</div>
          </div>
          <div className={`${styles.road_show_item} ${styles.buling}`}>
            <div><span>海信</span><span>接入</span></div>
            <div>
              {
                hisenseSingal &&
                new Array(hisenseSingal.length).fill(true).map((item, index) => (
                  <span key={item + index}>{hisenseSingal.charAt(index)}</span>
                ))
              }
            </div><div>处</div>
          </div>
          <div className={`${styles.road_show_item} ${styles.buling}`}>
            <div><span>中控</span><span>接入</span></div>
            <div>
              {
                siemensSingal &&
                new Array(siemensSingal.length).fill(true).map((item, index) => (
                  <span key={item + index}>{siemensSingal.charAt(index)}</span>
                ))
              }
            </div><div>处</div>
          </div>
        </div>
        <div className={styles.signaContainer_right}>
          <div className={styles.rightListPop}>
            <div className={styles.listBox}>
              {
                this.state.controlCounts &&
                <Form name="最新手控路口次数TOP15" headOne="路口名称" headTwo="当月控制次数" headTre="最新控制时间" datas={this.state.controlCounts} type="count" />
              }
            </div>
            <div className={styles.listBox}>
              {
                this.state.planTimes &&
                <Form name="最新方案配时变更路数TOP15" headOne="区域名称" headTwo="路口名称" headTre="配时变更时间" datas={this.state.planTimes} type="times" />
              }
            </div>
          </div>
          <div className={styles.malfunctionBox}>
            <div className={styles.title}>故障统计曲线图</div>
            <div style={{ height: '260px' }}>
              {
                this.state.faultCompare &&
                <GraphCharts chartsDatas={this.state.faultCompare} times={this.time} />
              }
            </div>
          </div>
        </div>
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
    getInterList: bindActionCreators(getInterList, dispatch),
    getControlRoads: bindActionCreators(getControlRoads, dispatch),
    getControlCount: bindActionCreators(getControlCount, dispatch),
    getPlanTime: bindActionCreators(getPlanTime, dispatch),
    getControlStatus: bindActionCreators(getControlStatus, dispatch),
    getRealTimeStatus: bindActionCreators(getRealTimeStatus, dispatch),
    getfaultStatistics: bindActionCreators(getfaultStatistics, dispatch),
    getBasicInterInfo: bindActionCreators(getBasicInterInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(SignalHome)
