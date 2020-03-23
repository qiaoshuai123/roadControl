import React from 'react'
import { Icon } from 'antd'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import styles from './InterDetails.scss'

// import { setInterId } from '../../../actions/data'

class InterDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interMonitorLeft: 15,
    }
  }
  componentDidMount = () => {
    // this.props.setInterId()
    console.log(this.props)
  }
  componentDidUpdate = () => {
    console.log(this.props)
  }
  handleShowInterMonitor = () => {
    if (this.state.interMonitorLeft > 0) {
      this.setState({
        interMonitorLeft: -305,
      })
    } else {
      this.setState({
        interMonitorLeft: 15,
      })
    }
  }
  render() {
    const { interMonitorLeft } = this.state
    return (
      <div className={styles.interDetailsBox}>
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <p className={styles.title}>勤务路线查询</p>
          <ul className={styles.regionList}>
            <li>所属区域<span>兴宁区</span> </li>
            <li>管理单位:指挥中心</li>
            <li>信号机类型:海信</li>
          </ul>
          <p className={styles.title}>功能列表</p>
          <ul className={styles.functionList}>
            <li>图元配置</li>
            <li>相位配置</li>
            <li>跟随相位配置</li>
            <li>阶段配置</li>
            <li>配时方案配置</li>
            <li>时基动作配置</li>
            <li>时段表配置</li>
            <li>调度表配置</li>
            <li>信号机配置</li>
          </ul>
        </div>
        <div className={styles.AnimationTime}>
          1
        </div>
        <div className={styles.DeviceStatus}>
          <ul className={styles.DeviceStatus_left}>
            <li>设备状态:<span>正常在线</span></li>
            <li>控制状态:本地多时段</li>
            <li>当前时段: <span></span>东西自转</li>
            <li>当前方案:方案01</li>
            <li>2019/12/02 22:43:20</li>
          </ul>
          <div className={styles.DeviceStatus_right}>
            <dl>
              <dt><span></span></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span></span></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span></span></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span></span></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span></span></dt>
              <dd>锁定</dd>
            </dl>
            <dl>
              <dt><span></span></dt>
              <dd>锁定</dd>
            </dl>

          </div>
        </div>
        <div className={styles.messageBox}>
          <div className={styles.messageBox_top}>
            x
          </div>
          <div className={styles.messageBox_bottom}>
            <ul className={styles.messageBox_bottom_left}>
              <li>关联编号:1001</li>
              <li>维护单位:指挥中心</li>
              <li>管理单位:指挥中心</li>
            </ul>
            <ul className={styles.messageBox_bottom_right}>
              <li>设备型号:信号机1001</li>
              <li>维护电话:110</li>
              <li>设备转台:<span>正常</span></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     data: state.data,
//   }
// }
// const mapDisPatchToProps = (dispatch) => {
//   return {
//     setInterId: bindActionCreators(setInterId, dispatch),
//   }
// }
export default InterDetails
// connect(mapStateToProps, mapDisPatchToProps)()
