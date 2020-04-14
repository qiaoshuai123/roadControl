import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon } from 'antd'
import styles from './Schedule.scss'

import { getScheduleList } from '../../../../actions/interCofig'

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scheduleList: null,
    }
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.props.getScheduleList(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { scheduleList } = this.props.data
    if (prevState.data.scheduleList !== scheduleList) {
      this.getScheduleDetails(scheduleList)
    }
  }
  getScheduleDetails = (scheduleList) => {
    this.setState({ scheduleList })
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const { scheduleList } = this.state
    return (
      <div className={styles.phaseConfigBox}>
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>调度表配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left} onClick={this.handleAddFollowPhase}>添加</div>
          <div className={styles.phaseConfigBoxCenter_left}>上载</div>
          <div className={styles.phaseConfigBoxCenter_left}>下发</div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>调度计划号</div>
            <div className={styles.mountingTh}>日计划</div>
            <div className={styles.mountingTh}>月计划</div>
            <div className={styles.mountingTh}>星期计划</div>
            <div className={styles.mountingTh}>时段表号</div>
            <div className={styles.mountingTh}>操作</div>
          </div>
          <div className={styles.mountingTbody}>
            {
              scheduleList &&
              scheduleList.map((item) => {
                return (
                  <div className={styles.mountingTr} key={item.ID}>
                    <div className={styles.mountingTd}>123</div>
                    <div className={styles.mountingTd}>123</div>
                    <div className={styles.mountingTd}>123</div>
                    <div className={styles.mountingTd}>123</div>
                    <div className={styles.mountingTd}>123</div>
                    <div className={styles.mountingTd}>
                      <div className={styles.deviceMsg}><span onClick={() => { this.handleEditFlowPhase() }}>修改</span></div>
                      <div className={styles.deviceMsg}><span onClick={this.handleDeleteFollowPhase}>删除</span></div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
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
    getScheduleList: bindActionCreators(getScheduleList, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(Schedule)
