import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Primitive from './Primitive/Primitive'
import styles from './InterDetails.scss'

import { getSingalInfo, getPlanStage } from '../../../actions/interCofig'

class InterDetails extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      interMonitorLeft: 15,
      configPop: null,
      sinaglInfo: null,
      planRunStage: null,
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
      { id: 9, name: '信号机配置' },
    ]
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.props.getSingalInfo(this.InterId)
    this.props.getPlanStage(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { sinaglInfo, planStage } = this.props.data
    if (prevState.data.sinaglInfo !== sinaglInfo) {
      this.getInterSingalInfo(sinaglInfo)
    }
    if (prevState.data.planStage !== planStage) {
      this.getPlanRunStage(planStage)
    }
  }
  // 获取路口信号信息
  getInterSingalInfo = (sinaglInfo) => {
    this.setState({ sinaglInfo })
  }
  // 获取方案运行阶段
  getPlanRunStage = (planStage) => {
    this.setState({ planRunStage: planStage })
  }
  handleShowInterMonitor = () => {
    if (this.state.interMonitorLeft > 0) {
      this.setState({ interMonitorLeft: -300 })
    } else {
      this.setState({ interMonitorLeft: 15 })
    }
  }
  closeInterConfig = () => { // 图元配置出发关闭
    this.setState({ configPop: null })
  }
  showInterConfig = (e) => { // 展示图元配置
    const configName = e.target.getAttribute('configname')
    this.setState({ configPop: configName })
  }
  render() {
    const { interMonitorLeft, configPop, sinaglInfo, planRunStage } = this.state
    return (
      <div className={styles.interDetailsBox}>
        <div className={styles.imgBox}>
          {
            sinaglInfo &&
            <img width="100%" height="100%" src={`http://192.168.1.230:8080/atms-web/resources/imgs/backupsImg/${sinaglInfo.UNIT_BACKGROUND_IMG}`} alt="图元" />
          }
        </div>
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <p className={styles.title}>勤务路线查询</p>
          <ul className={styles.regionList}>
            <li>所属区域 : <span>&nbsp;{sinaglInfo ? sinaglInfo.DISTRICT_NAME : '--'}</span></li>
            <li>管理单位 : 指挥中心</li>
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
                  <div className={styles.planRunStage}>
                    <span className={styles.stageMsg}>阶段{item.STAGE_ID} &nbsp;&nbsp;</span>
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
            <li>当前方案 : 方案01</li>
            <li>2019/12/02 22:43:20</li>
          </ul>
          <div className={styles.DeviceStatus_right}>
            <dl>
              <dt><span /></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span /></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span /></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span /></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span /></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span /></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span /></dt>
              <dd>锁定</dd>
            </dl>
          </div>
        </div>
        <div className={styles.messageBox}>
          <div className={styles.messageBox_top}><Icon type="close" /></div>
          <div className={styles.messageBox_bottom}>
            <ul className={styles.messageBox_bottom_left} style={{ paddingLeft: '34px' }}>
              <li>关联编号 : 1001</li>
              <li>维护单位 : &nbsp;<span className={styles.unitName}>指挥中心</span></li>
              <li>管理单位 : &nbsp;<span className={styles.unitName}>指挥中心</span></li>
            </ul>
            <ul className={styles.messageBox_bottom_right}>
              <li>设备型号 : 信号机1001</li>
              <li>维护电话 : 110</li>
              <li>设备转台 :<span>&nbsp;正常</span></li>
            </ul>
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
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(InterDetails)

