import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Primitive from './Primitive/Primitive'
import styles from './InterDetails.scss'

import { getSingalInfo, getPlanStage, getMonitorInfo } from '../../../actions/interCofig'

class InterDetails extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      interMonitorLeft: 15,
      configPop: null,
      sinaglInfo: null,
      planRunStage: null,
      devicePics: null,
      stagePics: null,
      planTimeInfo: null,
      showDeviceInfo: false,
      systemTime: null,
      deviceMsgT: 0,
      deviceMsgL: 0,
      deviceInfoMsg: null,
    }
    this.functionList = [
      { id: 1, name: '图元配置', configname: 'primitive' },
      { id: 2, name: '相位配置' },
      { id: 3, name: '跟随相位配置' },
      { id: 4, name: '阶段配置' },
      { id: 5, name: '配时方案配置' },
      { id: 6, name: '时基动作配置' },
      { id: 7, name: '时段表配置' },
      { id: 8, name: '调度表配置' },
      { id: 9, name: '信号机配置', configname: 'singalConfig' },
    ]
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.props.getSingalInfo(this.InterId)
    this.props.getPlanStage(this.InterId)
    this.props.getMonitorInfo(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { sinaglInfo, planStage, monitorInfo } = this.props.data
    if (prevState.data.sinaglInfo !== sinaglInfo) {
      this.getInterSingalInfo(sinaglInfo)
    }
    if (prevState.data.planStage !== planStage) {
      this.getPlanRunStage(planStage)
    }
    if (prevState.data.monitorInfo !== monitorInfo) {
      this.getInfoMotor(monitorInfo)
    }
  }
  // 获取路口信号信息
  getInterSingalInfo = (sinaglInfo) => {
    console.log(sinaglInfo)
    this.setState({ sinaglInfo })
  }
  // 获取方案运行阶段
  getPlanRunStage = (planStage) => {
    this.setState({ planRunStage: planStage })
  }
  // 获取设备图片信息
  getInfoMotor = (monitorInfo) => {
    console.log(monitorInfo)
    this.setState({
      devicePics: monitorInfo.UI_UNIT_CONFIGS,
      stagePics: monitorInfo.cfgStageInfos,
      planTimeInfo: monitorInfo.cfgPlan,
      systemTime: monitorInfo.SINGE_SYSTEM_TIME,
    })
  }
  handleShowInterMonitor = () => {
    if (this.state.interMonitorLeft > 0) {
      this.setState({ interMonitorLeft: -300 })
    } else {
      this.setState({ interMonitorLeft: 15 })
    }
  }
  handleShowDeviceInfo = (item) => {
    this.setState({
      deviceInfoMsg: item,
      showDeviceInfo: true,
      deviceMsgL: item.P_LEFT + 10,
      deviceMsgT: item.P_TOP,
    })
  }
  handleCloseDeviceInfo = () => {
    this.setState({ showDeviceInfo: false })
  }
  closeInterConfig = () => { // 图元配置出发关闭
    this.setState({ configPop: null })
  }
  showInterConfig = (e) => { // 展示图元配置
    const configName = e.target.getAttribute('configname')
    this.setState({ configPop: configName })
  }
  render() {
    const { interMonitorLeft, configPop, sinaglInfo, planRunStage, devicePics, stagePics, planTimeInfo, showDeviceInfo, systemTime, deviceInfoMsg } = this.state
    return (
      <div className={styles.interDetailsBox}>
        <div className={styles.imgBox}>
          {
            sinaglInfo &&
            <img width="100%" height="100%" src={`http://192.168.1.230:8080/atms-web/resources/imgs/backupsImg/${sinaglInfo.UNIT_BACKGROUND_IMG}`} alt="" />
          }
          {
            devicePics &&
            devicePics.map((item) => {
              const imgStyle = { position: 'absolute', top: `${item.P_TOP}px`, left: `${item.P_LEFT}px`, width: `${item.UI_WIDTH}px`, height: `${item.UI_HIGHT}px`, cursor: 'pointer' }
              const srcs = item.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '海信' ? 'jm/' :
                item.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '西门子' ? 'byzt/' : ''
              return (
                <img
                  key={item.P_LEFT + item.P_TOP}
                  style={imgStyle}
                  src={`http://192.168.1.230:8080/atms-web/resources/imgs/${item.UI_TYPE_ID}/${srcs}${item.UI_IMAGE_NAME}`}
                  alt=""
                  onClick={() => { this.handleShowDeviceInfo(item) }}
                />
              )
            })
          }
          {
            showDeviceInfo &&
            <div className={styles.messageBox} style={{ top: `${this.state.deviceMsgT}px`, left: `${this.state.deviceMsgL}px` }}>
              <div className={styles.messageBox_top} onClick={this.handleCloseDeviceInfo}><Icon type="close" /></div>
              <div className={styles.messageBox_bottom}>
                <ul className={styles.messageBox_bottom_left} style={{ paddingLeft: '34px' }}>
                  <li>关联编号 : {deviceInfoMsg.DEVICE_CODE}</li>
                  <li>维护单位 : &nbsp;<span className={styles.unitName}>{deviceInfoMsg.MAINTENANCE_UNIT_NAME}</span></li>
                  <li>管理单位 : &nbsp;<span className={styles.unitName}>{deviceInfoMsg.MANAGEMENT_UNIT_NAME}</span></li>
                </ul>
                <ul className={styles.messageBox_bottom_right}>
                  <li>设备型号 : {deviceInfoMsg.DEVICE_MODEL}</li>
                  <li>维护电话 : {deviceInfoMsg.MAINTENANCE_UNIT_TEL}</li>
                  <li>设备状态 :<span>&nbsp;{deviceInfoMsg.DEVICESTATENAME}</span></li>
                </ul>
              </div>
            </div>
          }
        </div>
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <p className={styles.title}>勤务路线查询</p>
          <ul className={styles.regionList}>
            <li>所属区域 : <span>&nbsp;{sinaglInfo ? sinaglInfo.DISTRICT_NAME : '--'}</span></li>
            <li>管理单位 : {sinaglInfo ? sinaglInfo.USER_GROUP_NAME : '--'}</li>
            <li>信号机类型 : {sinaglInfo ? sinaglInfo.SIGNALSYSTEM : '--'}</li>
          </ul>
          <p className={styles.title}>功能列表</p>
          <ul className={styles.functionList}>
            {
              this.functionList.map(item => <li key={item.id} configname={item.configname} onClick={this.showInterConfig}>{item.name}</li>)
            }
          </ul>
        </div>
        <div className={styles.AnimationTime}>
          <div className={styles.palnRunBox}>
            {
              planRunStage &&
              planRunStage.map((item) => {
                const greenWid = item.GREEN * 2
                const redWid = item.ALLRED * 2
                const yellowWid = item.YELLOW * 2
                return (
                  <div className={styles.planRunStage} key={item.STAGE_ID}>
                    <span className={styles.stageMsg}>阶段{item.STAGE_ID} &nbsp;{item.GREEN + item.ALLRED + item.YELLOW}秒</span>
                    <div className={styles.runStage} style={{ width: '20px' }} />
                    <div className={styles.greenStage} style={{ width: `${greenWid}px` }} />
                    <div className={styles.redStage} style={{ width: `${redWid}px` }} />
                    <div className={styles.yellowStage} style={{ width: `${yellowWid}px` }} />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={styles.DeviceStatus}>
          <ul className={styles.DeviceStatus_left}>
            <li>设备状态 :<span>&nbsp;{sinaglInfo ? sinaglInfo.ALARMSTATE : '--'}</span></li>
            <li>控制状态 : {sinaglInfo ? sinaglInfo.CONTROLSTATE : '--'}</li>
            <li>
              当前时段 :&nbsp;
              {
                sinaglInfo &&
                <img width="30px" height="30px" src={`http://192.168.1.230:8080/atms-web/resources/imgs/stage/${sinaglInfo.STAGE_IMAGE}`} alt="" />
              }
              {sinaglInfo ? sinaglInfo.STAGE_CODE : '--'}
            </li>
            <li>当前方案 : {planTimeInfo ? planTimeInfo.PLANNAME : '--'}</li>
            <li><span>{systemTime}</span></li>
          </ul>
          <div className={styles.DeviceStatus_right}>
            <dl className={styles.deviceControlBtn}>
              <dt><span>锁定</span></dt>
              <dd>锁定</dd>
            </dl>
            <dl className={styles.deviceControlBtn}>
              <dt><span>自动</span></dt>
              <dd>取消步进</dd>
            </dl>
            {
              stagePics &&
              stagePics.map((item) => {
                return (
                  <dl key={item.STAGENAME}>
                    <dt><img width="30px" height="30px" src={`http://192.168.1.230:8080/atms-web/resources/imgs/stage/${item.STAGE_IMAGE}`} alt="" /></dt>
                    <dd>{item.STAGENAME}</dd>
                  </dl>
                )
              })
            }
            {/* <dl>
              <dt><span /></dt>
              <dd>锁定</dd>
            </dl> */}
          </div>
        </div>
        <div className={styles.intersectionHeader_left}>
          <span>下个路口 : 海淀路口1-1</span>
        </div>
        <div className={styles.intersectionHeader_right}>
          <span>上个路口 : 海淀路口2-2</span>
        </div>
        {
          configPop === 'primitive' &&
          <Primitive IsprimitiveNone={this.closeInterConfig} InterId={this.InterId} />
        }
        {
          configPop === 'singalConfig' &&
          <div className={styles.singalConfigBox}>
            <div className={styles.singlConfig}>
              123
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.interConfig,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getSingalInfo: bindActionCreators(getSingalInfo, dispatch),
    getPlanStage: bindActionCreators(getPlanStage, dispatch),
    getMonitorInfo: bindActionCreators(getMonitorInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(InterDetails)

