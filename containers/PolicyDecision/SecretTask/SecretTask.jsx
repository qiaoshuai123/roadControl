import React, { PureComponent } from 'react'
import { Icon, Input, message, DatePicker, Select } from 'antd'
import moment from 'moment'
import styles from './SecretTask.scss'
import Header from '../Header/Header'
import classNames from 'classnames'
// import CustomTree from './CustomTree/CustomTree'
import CustomInterTree from '_C/CustomInterTree/CustomInterTree'
import InfoBg from './img/Infobg.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getInterList, getBasicInterInfo, getVipRoute, getVipRouteChild } from '../../../actions/data'
import { getAddUnitsIfram, getDeleteUnitFram, getDeleteVipRoad, getFindRoadByVipId, getFindList, getInitRoad, getLoadUnitStage, getSaveVipRoad   } from '../../../actions/SecretTask'
import OnlineH from '../SignalHome/img/online_h.png'
import OutlineH from '../SignalHome/img/outline_h.png'
import OnlineS from '../SignalHome/img/online_s.png'
import OutlineS from '../SignalHome/img/ouline_s.png'
const { Option } = Select
class SecretTask extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      interList: null,
      searchInterList: null,
      interListHeight: 0,
      hisenseSingal: '000',
      siemensSingal: '000',
      interMonitorLeft: 15,
      visible: false,
      visibleTop: 0,
      visibleLeft: 0,
      vipRouteList: null,
      searchVal: '',
      popSecreTask: true,
      startValue: null,
      endValue: null,
      endOpen: false,
    }
    this.searchInterList = []
    this.markers = []
    this.infowindow = 0
  }
  componentDidMount() {
    this.renderMineMap()
    this.props.getInterList()
    this.props.getVipRoute()
    document.addEventListener('click', (e) => {
      if (e.target !== this.searchInputBox) {
        this.setState({ interListHeight: 0 })
      }
      this.visibleShowLeft('', '', false)
    })
  }
  componentDidUpdate = (prevState) => {
    const { interList, basicInterInfo } = this.props.data
    if (prevState.data !== this.props.data) {
      console.log(this.props.data)
    }
    if (prevState.data.interList !== interList) {
      this.getInterList(interList)
    }
    if (prevState.data.basicInterInfo !== basicInterInfo) {
      this.getInterBasicInfo(basicInterInfo)
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
  // 获取路口基本信息
  getInterBasicInfo = (basicInterInfo) => {
    this.belongArea = basicInterInfo.DISTRICT_NAME
    this.controlState = basicInterInfo.CONTROLSTATE
    this.alarmState = basicInterInfo.ALARMSTATE
    this.singalIp = basicInterInfo.SIGNAL_IP
    this.runStatePic = `http://192.168.1.230:8080/atms-web/resources/imgs/stage/${basicInterInfo.STAGE_IMAGE}`
    this.runText = basicInterInfo.STAGE_CODE
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
  handleSearchInterFocus = () => {
    this.setState({ interListHeight: 300 })
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
  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

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
      interMonitorLeft,
      visible,
      visibleTop,
      vipRouteList,
      interListHeight, searchInterList, searchVal, popSecreTask, startValue, endValue, endOpen,
    } = this.state
    const { Search } = Input
    return (
      <div id="mapContainer" className={styles.secretTaskWrapper}>
        <Header {...this.props} />
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
          <div className={styles.title}>勤务路线查询</div>
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
              <Icon className={styles.searchIcon} type="search" onClick={() => {this.props.getVipRoute('', searchVal)}} />
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
          <div className={styles.OptimizingBtns}><span>优化控制管理</span></div>
          <div className={styles.addtask}>
            <span>快速特勤任务</span>
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
                <li onClick={() => {
                  this.props.getFindRoadByVipId(100)
                  this.props.getInitRoad({
                    "afterStr": "",
                    "beforStr": "",
                    "id": "30",
                    "orders": "123",
                    "vipId": "100"})
                }}>查看</li>
                <li>删除</li>
              </ul> : null
          }
        </div>
        {
          popSecreTask ?
            <div className={styles.MaskBox}>
              <div className={styles.secretTaskBox}>
                <div className={styles.title}>特勤任务 <Icon className={styles.Close} type='close' /></div>
                <div className={styles.secretTaskCon}>
                  <div className={styles.conTop}>
                    <div className={styles.formBox}><span>勤务名称：</span><Input style={{width: '100px'}} onChange={this.changeFont} placeholder="请输入勤务名称" /></div>
                    <div className={styles.formBox}><span>备注描述：</span><Input onChange={this.changeRegion} placeholder="请输入备注描述" /></div>
                    <div className={styles.formBox}><span>计划时间：</span>
                      <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={startValue}
                        placeholder="开始时间"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                      />
                      <span style={{margin:'0 5px'}}>-</span>
                      <DatePicker
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={endValue}
                        placeholder="结束时间"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                      />
                        </div>
                  </div>
                  <div className={styles.conLeft}>
                    <div className={styles.titleSmall}>勤务路口<em>添加路口</em></div>
                    <div className={styles.conLeftBox}>
                      <div className={styles.leftItem}>
                        <div className={styles.itemTit}>标题<Icon className={styles.Close} type='close' /></div>
                        <div className={styles.itemCon}>
                          <div className={styles.imgBox}><img src='a.png' /></div>
                          <div className={styles.imgBox}>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                          </div>
                        </div>
                        <div className={styles.formBox}><span>预设勤务阶段：</span>
                          <Select defaultValue="0">
                            <Option value='0'>请选择</Option>
                          </Select>
                          <em>保&nbsp;&nbsp;存</em>
                        </div>
                      </div>
                      <div className={styles.leftItem}>
                        <div className={styles.itemTit}>标题<Icon className={styles.Close} type='close' /></div>
                        <div className={styles.itemCon}>
                          <div className={styles.imgBox}><img src='a.png' /></div>
                          <div className={styles.imgBox}>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                            <div className={styles.dirItem}><img src='a.png' /><b>紧急序号1</b></div>
                          </div>
                        </div>
                        <div className={styles.formBox}><span>预设勤务阶段：</span>
                          <Select defaultValue="0">
                            <Option value='0'>请选择</Option>
                          </Select>
                          <em>保&nbsp;&nbsp;存</em>
                        </div>
                      </div>
                    </div>
                      
                    </div>
                  <div className={styles.conRight}>
                    <div className={styles.titleSmall}>勤务路线<em>保存路线</em></div>
                    <div className={styles.itemTit}>勤务路线<em>一键勤务</em></div>
                    <div className={styles.itemCon}>
                      <div className={classNames(styles.listItem, styles.listTit)}>
                        <s>序号</s>
                        <s>路口名称</s>
                        <s>勤务阶段</s>
                        <s>勤务状态</s>
                        <s>操作</s>
                      </div>
                      <div className={styles.conRightBox}>
                        <div className={styles.listItem}>
                          <s>1</s>
                          <s><img src='a.png' />路口名称</s>
                          <s>勤务阶段</s>
                          <s>勤务状态</s>
                          <s><span>锁定</span></s>
                        </div>
                        <div className={styles.listItem}>
                          <s>1</s>
                          <s><img src='a.png' />路口名称</s>
                          <s>勤务阶段</s>
                          <s>勤务状态</s>
                          <s><span>锁定</span></s>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> : null
        }
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
    getAddUnitsIfram: bindActionCreators(getAddUnitsIfram, dispatch),
    getDeleteUnitFram: bindActionCreators(getDeleteUnitFram, dispatch),
    getDeleteVipRoad: bindActionCreators(getDeleteVipRoad, dispatch),
    getFindRoadByVipId: bindActionCreators(getFindRoadByVipId, dispatch),
    getFindList: bindActionCreators(getFindList, dispatch),
    getInitRoad: bindActionCreators(getInitRoad, dispatch),
    getLoadUnitStage: bindActionCreators(getLoadUnitStage, dispatch),
    getSaveVipRoad: bindActionCreators(getSaveVipRoad, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(SecretTask)
