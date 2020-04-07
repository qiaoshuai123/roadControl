import React from 'react'
import { Icon, Input, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './TimingPlan.scss'

import { getTimingPlan, gePhaseNoInfo } from '../../../../actions/interCofig'

class TimingPlan extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      timingPlans: null,
      phaseNoInfo: null,
      timingMsg: null,
      showEditTiming: false,
    }
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.props.getTimingPlan(this.InterId)
    this.props.gePhaseNoInfo(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { timingPlan, phaseNoInfo } = this.props.data
    if (prevState.data.timingPlan !== timingPlan) {
      this.getTimingPlanList(timingPlan)
    }
    if (prevState.data.phaseNoInfo !== phaseNoInfo) {
      this.getPhaseNumber(phaseNoInfo)
    }
  }
  getTimingPlanList = (timingPlans) => {
    this.setState({ timingPlans })
  }
  getPhaseNumber = (phaseNoInfo) => {
    this.setState({ phaseNoInfo: phaseNoInfo.phaseNoList })
  }
  handleEditTimingMsg = (timingMsg) => {
    console.log(timingMsg)
    this.setState({
      timingMsg,
      showEditTiming: true,
    })
  }
  handleCloseEdit = () => {
    this.setState({ showEditTiming: false })
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const { timingPlans, phaseNoInfo, timingMsg, showEditTiming } = this.state
    return (
      <div className={styles.phaseConfigBox}>
        {
          showEditTiming &&
          <div className={styles.editBox}>
            <div className={styles.editDetails}>
              <div className={styles.editTitle}>
                编辑方案
                <span className={styles.cloeEditIcon} onClick={this.handleCloseEdit}><Icon type="close" /></span>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>方案编号</div>
                <div className={styles.editItems}>
                  <Input defaultValue={timingMsg && timingMsg.PLANNO} />
                </div>
                <div className={styles.editItemsName}>方案名称</div>
                <div className={styles.editItems}>
                  <Input defaultValue={timingMsg && timingMsg.PLANNAME} />
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>周期长</div>
                <div className={styles.editItems}>
                  <Input defaultValue={timingMsg && timingMsg.CYCLELEN} />
                </div>
                <div className={styles.editItemsName}>协调相位差</div>
                <div className={styles.editItems}>
                  <Input defaultValue={timingMsg && timingMsg.OFFSET} />
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>协调相位</div>
                <div className={styles.editItems}>
                  {
                    phaseNoInfo &&
                    phaseNoInfo.map((item) => {
                      return (
                        <span className={styles.phaseSelBox} key={item}><Checkbox>相位{item}</Checkbox></span>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>关联阶段 <br />(含过渡时间)</div>
                <div className={styles.editItems}>
                  {
                    timingMsg && timingMsg.STAGEIMAGES &&
                    timingMsg.STAGEIMAGES.split(',').map((stage, indexs) => {
                      return (
                        <div key={stage + indexs}>
                          <p className={styles.phaseNo}>{(timingMsg.STAGENOLIST.split(','))[indexs]}</p>
                          <img width="35px" height="35px" style={{ marginRight: '5px' }} src={`http://192.168.1.123:26001/atms/comm/images/anniu/${stage}`} alt="" />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.editBtnBox}>
                <div className={styles.editBtn} style={{ backgroundColor: '#ccc' }} onClick={this.handleCloseEdit}>取消</div>
                <div className={styles.editBtn} onClick={this.handleSaveTimeTalbe}>确定</div>
              </div>
            </div>
          </div>
        }
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>配时方案配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left}>添加</div>
          <div className={styles.phaseConfigBoxCenter_left}>上载</div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>方案号</div>
            <div className={styles.mountingTh}>方案名称</div>
            <div className={styles.mountingTh}>周期长</div>
            <div className={styles.mountingTh}>协调相位</div>
            <div className={styles.mountingTh}> 协调相位差(秒)</div>
            <div className={`${styles.mountingTh} ${styles.mountingcar}`}> 关联阶段</div>
            <div className={styles.mountingTh}> 操作</div>
          </div>
          <div className={styles.mountingTbody}>
            {
              timingPlans &&
              timingPlans.map((item) => {
                console.log(item)
                return (
                  <div className={styles.mountingTr} key={item.ID}>
                    <div className={styles.mountingTd}>{item.PLANNO}</div>
                    <div className={styles.mountingTd}>{item.PLANNAME}</div>
                    <div className={styles.mountingTd}>{item.CYCLELEN}</div>
                    <div className={styles.mountingTd}>{item.OFFSET}</div>
                    <div className={styles.mountingTd}>{item.PHASE_SEQUENCE_NO}</div>
                    <div className={`${styles.mountingTd} ${styles.mountingcar}`}>
                      {
                        item.STAGEIMAGES &&
                        item.STAGEIMAGES.split(',').map((stage, indexs) =>{
                          return (
                            <img key={item.ID + indexs} width="35px" height="35px" style={{ marginRight: '3px' }} src={`http://192.168.1.123:26001/atms/comm/images/anniu/${stage}`} alt="" />
                          )
                        })
                      }
                    </div>
                    <div className={styles.mountingTd}>
                      <div className={styles.deviceMsg}><span onClick={() => { this.handleEditTimingMsg(item) }}>修改</span></div>
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
    getTimingPlan: bindActionCreators(getTimingPlan, dispatch),
    gePhaseNoInfo: bindActionCreators(gePhaseNoInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(TimingPlan)
