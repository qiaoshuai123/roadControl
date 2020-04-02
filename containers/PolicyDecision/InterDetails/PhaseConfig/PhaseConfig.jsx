import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon } from 'antd'
import styles from './PhaseConfig.scss'

import { getPhaseList } from '../../../../actions/interCofig'

class PhaseConfig extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      phaseLists: null,
    }
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.props.getPhaseList(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { phaseLists } = this.props.data
    if (prevState.data.phaseLists !== phaseLists) {
      this.getPhaseLists(phaseLists)
    }
  }
  getPhaseLists = (phaseLists) => {
    this.setState({ phaseLists })
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const { phaseLists } = this.state
    return (
      <div className={styles.phaseConfigBox}>
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>相位配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left}>
            添加
          </div>
          <div className={styles.phaseConfigBoxCenter_left}>
            上载
          </div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>相位编号</div>
            <div className={styles.mountingTh}>相位名称</div>
            <div className={styles.mountingTh}>相位特征</div>
            <div className={`${styles.mountingTh} ${styles.mountingcar}`}>所属车道</div>
            <div className={styles.mountingTh} >相位放行人道方向</div>
            <div className={`${styles.mountingTh} ${styles.mountingTwo}`}>相位关键渠化</div>
            <div className={styles.mountingTh}>操作</div>
          </div>
          <div className={styles.mountingTbody}>
            {
              phaseLists &&
              phaseLists.map((item) => {
                return (
                  <div className={styles.mountingTr} key={item.PHASE_NO}>
                    <div className={styles.mountingTd}>{item.PHASE_NO}</div>
                    <div className={styles.mountingTd}>{item.PHASE_NAME}</div>
                    <div className={styles.mountingTd}>无关联</div>
                    <div className={`${styles.mountingTd} ${styles.mountingcar}`}>
                      <div className={styles.roadMsg}>车道序号</div>
                      <div className={styles.roadMsg}>方向</div>
                      <div className={styles.roadMsg}>属性</div>
                      <div className={styles.roadMsg}>流向</div>
                      <div className={styles.roadMsg}>特征</div>
                    </div>
                    <div className={styles.mountingTd}>*****</div>
                    <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
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
    getPhaseList: bindActionCreators(getPhaseList, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(PhaseConfig)
