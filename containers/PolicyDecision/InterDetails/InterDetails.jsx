import React from 'react'
import { Icon } from 'antd'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import Primitive from './Primitive/Primitive'
import styles from './InterDetails.scss'

// import { setInterId } from '../../../actions/data'

class InterDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interMonitorLeft: 15,
      configPop: null,
    }
    this.functionList = [
      { id: 1, name: '图元配置' },
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
    console.log(this.InterId)
  }
  componentDidUpdate = () => {
    // console.log(this.props)
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
  showInterConfig = () => { // 展示图元配置
    this.setState({ configPop: 'primitive' })
  }
  render() {
    const { interMonitorLeft, configPop } = this.state
    return (
      <div className={styles.interDetailsBox}>
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <p className={styles.title}>勤务路线查询</p>
          <ul className={styles.regionList}>
            <li>所属区域:<span>兴宁区</span> </li>
            <li>管理单位:指挥中心</li>
            <li>信号机类型:海信</li>
          </ul>
          <p className={styles.title}>功能列表</p>
          <ul className={styles.functionList}>
            {
              this.functionList.map(item => <li key={item.id} onClick={() => this.showPrimitive(item.id)}>{item.name}</li>)
            }
          </ul>
        </div>
        <div className={styles.AnimationTime}>
          1
        </div>
        <div className={styles.DeviceStatus}>
          <ul className={styles.DeviceStatus_left}>
            <li>设备状态:<span>正常在线</span></li>
            <li>控制状态:本地多时段</li>
            <li>当前时段: <span className={styles.icons}></span>东西自转</li>
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
            <dl>
              <dt><span></span></dt>
              <dd>锁定</dd>
            </dl>

          </div>
        </div>
        <div className={styles.messageBox}>
          <div className={styles.messageBox_top}>
            <Icon type="close" />
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
        <div className={styles.intersectionHeader_left}>
          <span>下个路口:海淀路口1-1</span>
        </div>
        <div className={styles.intersectionHeader_right}>
          <span>上个路口:海淀路口2-2</span>
        </div>
        {
          configPop === 'primitive' &&
          <Primitive IsprimitiveNone={this.closeInterConfig} InterId={this.InterId} />
        }
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
