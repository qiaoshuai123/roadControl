import React, { Component } from 'react'
import { Icon, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CustomInterTree from '_C/CustomInterTree/CustomInterTree'
import styles from './InterManagement.scss'

import Header from '../Header/Header'
import ModalPage from './ModalPage/ModalPage'

import InfoBg from './img/info_bg.png'

import { getInterList, getBasicInterInfo, getLoadPlanTree, getLoadChildTree, getAreaList } from '../../../actions/data'
import {
  getUnitInterInfo, getInterControlSys, getUnitInterType, getUnitDeviceType,
  getManagementUnit, getUnitDirection, getSaveInterManage, getDefaultUnitInfo,
} from '../../../actions/InterManage'

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
    this.props.getLoadPlanTree()
    this.props.getUnitDirection(6)
    this.props.getInterControlSys(13)
    this.props.getUnitInterType(7)
    this.props.getUnitDeviceType(22)
    this.props.getManagementUnit()
    this.props.getAreaList()
    document.addEventListener('click', (e) => {
      if (e.target !== this.searchInputBox) {
        this.setState({ interListHeight: 0 })
      }
    })
  }
  componentDidUpdate = (prevState) => {
    const { interList, basicInterInfo } = this.props.data
    if (prevState.data.interList !== interList) {
      this.getInterLists(interList)
    }
    if (prevState.data.basicInterInfo !== basicInterInfo) {
      this.getInterBasicInfo(basicInterInfo)
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
  getSelectChildId = (chidlId, lng, lat) => {
    const marker = document.getElementById('marker' + chidlId)
    if (marker) {
      this.map.setCenter([lng, lat])
      marker.click()
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
  handleUpdateUnitInterInfo = (params) => {
    this.props.getSaveInterManage(params).then((res) => {
      if (res.data.code === 200) {
        this.isShowModalPage()
      }
      message.info(res.data.message)
    })
  }
  noShow = (e) => { // 禁止默认右键菜单
    e.stopPropagation()
    e.preventDefault()
  }

  addIntersection = () => { // 添加路口
    this.map.on('click', this.mapEventOn)
    this.setState({ isIntersection: false })
  }
  removeIntersection = () => { // 取消添加路口
    this.map.off('click', this.mapEventOn)
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
          <div id="${id}" style="width:80px;height:30px;margin:20px auto 0;background-color:#0F85FF;text-align:center;line-height:30px;border-radius:4px;cursor:pointer;">路口信息</div>
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
  mapEventOn = (e) => {
    console.log(e)
    const { lng, lat } = e.lngLat
    const defaultMsg = {
      unitConnector: [],
      unitInfo: {
        BACKGROUND_IMG: '',
        DISTRICT_ID: 1,
        ID: '',
        LATITUDE: lat.toFixed(6),
        LONGITUDE: lng.toFixed(6),
        MANAGEMENT_UNIT_ID: 9592,
        MINOR_UNIT_NUMBER: 1,
        ROTATE_ANGLE: 0,
        SIGNAL_CODE: 1,
        SIGNAL_GATEWAY: '45.6.247.254',
        SIGNAL_IP: '45.6.247.152',
        SIGNAL_MASK: '255.255.255.0',
        SIGNAL_MODEL: 2,
        SIGNAL_PORT: 3000,
        SIGNAL_SUPPLIER: '',
        SIGNAL_SYSTEM_CODE: 1,
        SIGNAL_UNIT_ID: 1,
        UNIT_ID: 1,
        UNIT_NAME: '新路口',
        UNIT_TYPE_CODE: 1,
        SUREID: 'addPage',
      },
    }
    this.props.getDefaultUnitInfo(defaultMsg)
    this.setState({ isModalPage: true })
  }
  mapEventOff = (e) => {
    console.log(e)
  }
  // 初始化地图
  renderMineMap = () => {
    const map = new window.minemap.Map({
      container: 'mapContainer',
      // style: '//10.11.57.105:60050/service/solu/style/id/4636',
      style: '//221.13.10.30:22191/service/solu/style/id/4636',
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
              rightDownNone="true"
              getSelectTreeId={this.getSelectTreeId}
              getSelectChildId={this.getSelectChildId}
            />
          </div>
        </div>
        {
          isModalPage &&
          <ModalPage
            {...this.props}
            isShowModalPage={this.isShowModalPage}
            updateUnitInterInfo={this.handleUpdateUnitInterInfo}
          />
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
    getInterControlSys: bindActionCreators(getInterControlSys, dispatch),
    getUnitInterType: bindActionCreators(getUnitInterType, dispatch),
    getUnitDeviceType: bindActionCreators(getUnitDeviceType, dispatch),
    getManagementUnit: bindActionCreators(getManagementUnit, dispatch),
    getAreaList: bindActionCreators(getAreaList, dispatch),
    getUnitDirection: bindActionCreators(getUnitDirection, dispatch),
    getSaveInterManage: bindActionCreators(getSaveInterManage, dispatch),
    getDefaultUnitInfo: bindActionCreators(getDefaultUnitInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(InterManagement)
