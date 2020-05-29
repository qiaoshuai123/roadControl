import React, { PureComponent } from 'react'
import { Icon, Input, message, Select, Modal } from 'antd'
import styles from './Surveillance.scss'
import Header from '../Header/Header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getInterList, getBasicInterInfo, getVipRoute, getVipRouteChild } from '../../../actions/data'
import { getDeleteUnitFram, getDeleteVipRoad, getFindRoadByVipId, getFindList, getInitRoad, getLoadUnitStage } from '../../../actions/SecretTask'
import Areaedit from './Areaedit/Areaedit'
import CustomInterTree from '_C/CustomInterTree/CustomInterTree'
import InfoBg from './img/Infobg.png'
import OnlineH from '../SignalHome/img/online_h.png'
import OutlineH from '../SignalHome/img/outline_h.png'
import OnlineS from '../SignalHome/img/online_s.png'
import OutlineS from '../SignalHome/img/ouline_s.png'
import mapStyles from '../../../utils/styles_2301'
import Uico from './img/u149.png'

const { Option } = Select
const { TextArea } = Input
class SecretTask extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchInterList: null,
      interListHeight: 0,
      interMonitorLeft: 15,
      visible: false,
      visibleTop: 0,
      vipId: '',
      selectStateArr: [],
      searchVal: '',
      roadCrossingFlag: null,
      secretTaskLeftOld: null,
      secretTaskLeft: null,
      addGreenMeg: false,// 绿波添加显示弹窗
      showAreaedit: false, // 展示区域协调方案编辑页面
      MaintenancePhine: '',
      MaintenanceName: '',
      EquipmentDetail: '',
    }
    this.searchInterList = []
    this.markers = []
    this.infowindow = 0
    // this.processUrl = 'http://192.168.1.123:26001' // dev
    this.processUrl = 'http://39.100.128.220:7002' // porduction
    this.imgBgUrl = `${this.processUrl}/atms/comm/dzimg/10/`
    this.imgDirUrl = `${this.processUrl}/atms/comm/dzimg/2/`
    this.imgInfoUrl = `${this.processUrl}/atms/comm/images/anniu/`
    this.IsaddEvlregionOptPlan = false // 判断是否保存方案
  }
  componentDidMount() {
    this.renderMineMap()
    this.props.getInterList()
    this.props.getVipRoute()
    document.addEventListener('click', (e) => {
      if (e.target !== this.searchInputBox) {
        this.setState({ interListHeight: 0, interListHeights: 0 })
      }
      this.visibleShowLeft('', '', false)
    })
  }
  componentDidUpdate = (prevState) => {
    const { interList, basicInterInfo } = this.props.data
    if (prevState.data !== this.props.data) {
      // console.log(this.props.data)
    }
    if (prevState.data.interList !== interList) {
      this.getInterList(interList)
    }
    if (prevState.data.basicInterInfo !== basicInterInfo) {
      this.getInterBasicInfo(basicInterInfo)
    }
  }
  // 从子集获取区域id和index 请求路口
  getSelectTreeId = (id) => {
    this.props.getVipRouteChild(id)
  }
  // 获取子id, 路口id
  getSelectChildId = (childId) => {
    const childrenArr = this.props.data.loadChildTree
    const marker = document.getElementById('marker' + childId)
    let lng, lat;
    childrenArr.map((item) => {
      if (childId === item.ID) {
        lng = item.LONGITUDE
        lat = item.LATITUDE
      }
    })
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
  // 删除路口
  getDeleteUnitFram = (vipId, unitId) => {
    const _this = this
    Modal.confirm({
      title: '确认要删除当前路口？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        _this.props.data.vip_delSucess = ''
        _this.setState({
          secretTaskLeft: null,
        }, () => {
          _this.props.getDeleteUnitFram(vipId, unitId)
        })
      },
      onCancel() { },
    })
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
  changValue = (e) => { // 绿波方案基本信息
    const name = e.target.name
    const value = e.target.value
    // console.log(name, value)
    this.setState({
      [name]: value,
    })
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
            const marker = new window.minemap.Marker(el, { offset: [-11, -11] }).setLngLat({ lng: item.LONGITUDE, lat: item.LATITUDE })
              .setPopup(this.showInterInfo(item.LONGITUDE, item.LATITUDE, item.UNIT_NAME, item.SIGNAL_SYSTEM_CODE === 4 ? '海信' : '中控', item.ID))
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
  hanleSelectInter = (e) => {
    const interId = e.currentTarget.getAttribute('interid')
    const marker = document.getElementById('marker' + interId)
    const lng = e.currentTarget.getAttribute('lng')
    const lat = e.currentTarget.getAttribute('lat')
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
        vipId: id,
      }, () => {
        // console.log(id, '显示右键信息')
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
  handleSearchInterFocus = () => {
    this.setState({ interListHeight: 300 })
  }
  closeAddroaders = () => { // 关闭添加路口
    this.setState({
      addroader: false,
    })
  }
  // 展示区域协调方案编辑页面
  showAreaeditBtn = (boolean) => {
    this.addList = boolean
    this.setState({
      showAreaedit: true,
    })
  }

  closeMegFa = () => {
    this.setState({
      showAreaedit: false,
    })
  }
  handleSearchInputChange = (e) => {
    const { value } = e.target
    this.setState({
      searchVal: value,
    })
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
  // 快速特勤任务
  quicklySecretTask = () => {
    this.setState({
      addGreenMeg: true,
    })
  }
  // 查看路线
  lookRoadLine = (vipId) => {
    this.props.getFindRoadByVipId(vipId)
    this.props.getFindList(vipId)
  }

  // 删除路线
  delRoadLine = (vipId) => {
    let roadLineName = ''
    this.props.data.loadPlanTree.map((item) => {
      if (item.ID === vipId) {
        roadLineName = item.NAME
      }
    })
    const _this = this
    Modal.confirm({
      title: '确认要删除勤务路线：( ' + roadLineName + ' ) ?',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        _this.props.data.vip_delRoadSucess = ''
        _this.props.getDeleteVipRoad(vipId)
      },
      onCancel() { },
    })
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
  }
  render() {
    const {
      visibleTop, visible, interMonitorLeft, vipId,
      interListHeight, searchInterList, searchVal, showAreaedit,
    } = this.state
    return (
      <div id="mapContainer" className={styles.secretTaskWrapper}>
        <Header {...this.props} />
        {
          showAreaedit && <Areaedit addList={this.addList} closeMegFa={this.closeMegFa} />
        }
        <div className={styles.Popup}>
          <p className={styles.Popup_p}><span>路口路线</span><span onClick={() => this.showAreaeditBtn(false)}>编辑&gt;&gt;</span></p>
          <div className={styles.PopupBo}>
            <div className={styles.Popup_box}>
              <p>路口一</p>
              <ul className={styles.Popup_box_ulOne}>
                <li>协调相位</li>
                <li>协调相位差</li>
                <li>运行周期</li>
                <li>通行速度</li>
              </ul>
              <div className={styles.Popup_box_ulTwo}>
                <li>
                  <b>
                    <img src={Uico} alt="" />
                  </b>
                </li>
                <li>20秒</li>
                <li>120秒</li>
                <li>40km/h</li>
              </div>
            </div>
            <div className={styles.Popup_box}>
              <p>路口一</p>
              <ul className={styles.Popup_box_ulOne}>
                <li>协调相位</li>
                <li>协调相位差</li>
                <li>运行周期</li>
                <li>通行速度</li>
              </ul>
              <div className={styles.Popup_box_ulTwo}>
                <li>
                  <b>
                    <img src={Uico} alt="" />
                  </b>
                </li>
                <li>20秒</li>
                <li>120秒</li>
                <li>40km/h</li>
              </div>
            </div>
            <div className={styles.Popup_box}>
              <p>路口一</p>
              <ul className={styles.Popup_box_ulOne}>
                <li>协调相位</li>
                <li>协调相位差</li>
                <li>运行周期</li>
                <li>通行速度</li>
              </ul>
              <div className={styles.Popup_box_ulTwo}>
                <li>
                  <b>
                    <img src={Uico} alt="" />
                  </b>
                </li>
                <li>20秒</li>
                <li>120秒</li>
                <li>40km/h</li>
              </div>
            </div>
            <div className={styles.Popup_box}>
              <p>路口一</p>
              <ul className={styles.Popup_box_ulOne}>
                <li>协调相位</li>
                <li>协调相位差</li>
                <li>运行周期</li>
                <li>通行速度</li>
              </ul>
              <div className={styles.Popup_box_ulTwo}>
                <li>
                  <b>
                    <img src={Uico} alt="" />
                  </b>
                </li>
                <li>20秒</li>
                <li>120秒</li>
                <li>40km/h</li>
              </div>
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
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <div className={styles.title}>绿波方案查询</div>
          <div className={styles.searchBox}>
            <input
              className={styles.searchInput}
              onClick={this.handleSearchInterFocus}
              onChange={this.handleSearchInputChange}
              type="text"
              placeholder="请输入你要搜索的路口 / 路线"
              ref={(input) => { this.searchInputBox = input }}
              style={{ width: '100%' }}
            />
            <Icon className={styles.searchIcon} type="search" onClick={() => { this.props.getVipRoute('', searchVal) }} />
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
          <div className={styles.OptimizingBtns}><span>绿波方案列表</span></div>
          <div className={styles.addtask}>
            <span onClick={() => this.showAreaeditBtn(true)}>添加绿波方案</span>
          </div>
          <div className={styles.treeBox}>
            {/* <CustomTree visibleShowLeft={this.visibleShowLeft} vipRouteList={vipRouteList} getChildInfo={this.getChildInfo} hanleSelectInter={this.hanleSelectInter} /> */}
            <CustomInterTree
              {...this.props}
              getSelectTreeId={this.getSelectTreeId}
              getSelectChildId={this.getSelectChildId}
              visibleShowLeft={this.visibleShowLeft}
            />
          </div>
          {
            visible ?
              <ul style={{ top: `${visibleTop - 100}px` }} onContextMenu={this.noShow} className={styles.contextMenu}>
                <li onClick={() => { this.lookRoadLine(vipId) }}>查看</li>
                <li onClick={() => { this.delRoadLine(vipId) }}>删除</li>
              </ul> : null
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    data: { ...state.data, ...state.secretTask },
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getInterList: bindActionCreators(getInterList, dispatch),
    getBasicInterInfo: bindActionCreators(getBasicInterInfo, dispatch),
    getVipRoute: bindActionCreators(getVipRoute, dispatch),
    getVipRouteChild: bindActionCreators(getVipRouteChild, dispatch),
    // getAddUnitsIfram: bindActionCreators(getAddUnitsIfram, dispatch),
    getDeleteUnitFram: bindActionCreators(getDeleteUnitFram, dispatch),
    getDeleteVipRoad: bindActionCreators(getDeleteVipRoad, dispatch),
    getFindRoadByVipId: bindActionCreators(getFindRoadByVipId, dispatch),
    getFindList: bindActionCreators(getFindList, dispatch),
    getInitRoad: bindActionCreators(getInitRoad, dispatch),
    getLoadUnitStage: bindActionCreators(getLoadUnitStage, dispatch),
    // getSaveVipRoad: bindActionCreators(getSaveVipRoad, dispatch),
    // getSaveUnitRunStage: bindActionCreators(getSaveUnitRunStage, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(SecretTask)
