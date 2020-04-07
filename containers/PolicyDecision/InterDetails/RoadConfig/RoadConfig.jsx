import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './RoadConfig.scss'

import { getRoadLists } from '../../../../actions/interCofig'

class RoadConfig extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      roadList: null,
    }
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.props.getRoadLists(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { roadList } = this.props.data
    if (prevState.data.roadList !== roadList) {
      this.getTimingPlanList(roadList)
    }
  }
  getTimingPlanList = (roadList) => {
    this.setState({ roadList }, () => {
      console.log(this.state.roadList)
    })
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const { roadList } = this.state
    return (
      <div className={styles.phaseConfigBox}>
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>车道配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left}>添加</div>
          <div className={styles.phaseConfigBoxCenter_left}>上载</div>
          <div className={styles.phaseConfigBoxCenter_left}>下发</div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>车道方向</div>
            <div className={styles.mountingTh}>进出口</div>
            <div className={styles.mountingTh}>车道序号</div>
            <div className={styles.mountingTh}>车道类型</div>
            <div className={styles.mountingTh}> 车道车流</div>
            <div className={styles.mountingTh}> 左转比例</div>
            <div className={styles.mountingTh}> 直行比例</div>
            <div className={styles.mountingTh}> 右转比例</div>
            <div className={styles.mountingTh}> 关联通道号</div>
            <div className={styles.mountingTh}> 操作</div>
          </div>
          <div className={styles.mountingTbody}>
            {
              roadList &&
              roadList.map((item, index) => {
                return (
                  <div className={styles.mountingTr} key={item.LANE_ORDER + index}>
                    <div className={styles.mountingTd}>{item.DIRECTION}</div>
                    <div className={styles.mountingTd}>{item.IN_OR_OUT}</div>
                    <div className={styles.mountingTd}>{item.LANE_ORDER}</div>
                    <div className={styles.mountingTd}>{item.LANE_TYPE}</div>
                    <div className={styles.mountingTd}>{item.CHANNEL_NO}</div>
                    <div className={styles.mountingTd}>{item.LEFT_RATIO}</div>
                    <div className={styles.mountingTd}>{item.STRAIGHT_RATIO}</div>
                    <div className={styles.mountingTd}>{item.RIGHT_RATIO}</div>
                    <div className={styles.mountingTd}>{item.FLOW_DIRECTION}</div>
                    <div className={styles.mountingTd}>
                      <div className={styles.deviceMsg}><span>修改</span></div>
                      <div className={styles.deviceMsg}><span>删除</span></div>
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
    getRoadLists: bindActionCreators(getRoadLists, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(RoadConfig)
