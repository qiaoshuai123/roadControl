import React from 'react'
import { Icon, Input, Checkbox, message, Modal } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './TimingPlan.scss'

import { getTimingPlan, getTimePlanInfo, getSaveTimingPlan, getAddTimingPlan, getDeleteTimingPlan, getPlanStageList } from '../../../../actions/interCofig'

class TimingPlan extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      timingPlans: null,
      showEditTiming: false,
      planDetails: null,
      planStageList: null,
      phaseNoList: null,
      editPlanStageList: null,
      editStageSelect: false,
      stageRadioIndex: 0,
    }
    this.saveParams = {
      coordPhase: 'string',
      id: 'string',
      lose_phase: 'string',
      offset: 'string',
      phase_Sequence_No: 'string',
      planName: 'string',
      planNo: 'string',
      stageNos: 'string',
      stageTimes: 'string',
      unitId: 'string',
    }
    this.stageTimes = []
    this.coordPhases = []
    this.planStageList = []
    this.stageNos = []
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.saveParams.unitId = this.InterId
    this.props.getTimingPlan(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { timingPlan, timePlanInfo, addTimingPlan, planStageList } = this.props.data
    if (prevState.data.timingPlan !== timingPlan) {
      this.getTimingPlanList(timingPlan)
    }
    if (prevState.data.timePlanInfo !== timePlanInfo) {
      this.getTimePlanDetails(timePlanInfo)
    }
    if (prevState.data.addTimingPlan !== addTimingPlan) {
      this.getAdd(addTimingPlan)
    }
    if (prevState.data.planStageList !== planStageList) {
      this.getEditStageList(planStageList)
    }
  }
  getEditStageList = (planStageList) => {
    this.setState({ editPlanStageList: planStageList.planStageList })
  }
  getAdd = (addTimingPlan) => {
    const planInfo = {
      COORD_PHASE: null,
      LOSE_PHASE: null,
      CYCLELEN: 0,
      PLANNAME: '添加方案',
      PHASE_SEQUENCE_NO: 1,
      OFFSET: 0,
      PLANNO: 1,
    }
    this.setState({
      planDetails: planInfo,
      planStageList: addTimingPlan.planStageList,
      phaseNoList: addTimingPlan.phaseNoList,
    })
    addTimingPlan.planStageList.forEach((item) => {
      this.stageTimes.push(item.GREEN)
    })
  }
  getTimingPlanList = (timingPlans) => {
    this.setState({ timingPlans })
  }
  getTimePlanDetails = (timePlanInfo) => {
    this.planStageList = timePlanInfo.planStageList
    this.setState({
      planDetails: timePlanInfo.planInfo,
      planStageList: timePlanInfo.planStageList,
      phaseNoList: timePlanInfo.phaseNoList,
    })
    timePlanInfo.planStageList.forEach((item) => {
      this.stageTimes.push(item.GREEN)
      this.stageNos.push(item.STAGE_ID)
    })
  }
  handleEditTimingMsg = (timingMsg) => {
    console.log(timingMsg)
    this.stageTimes = []
    this.coordPhases = []
    this.stageNos = []
    this.saveParams = {
      coordPhase: timingMsg.COORD_PHASE,
      id: timingMsg.ID,
      lose_phase: timingMsg.LOSE_PHASE,
      offset: timingMsg.OFFSET,
      phase_Sequence_No: timingMsg.PHASE_SEQUENCE_NO,
      planName: timingMsg.PLANNAME,
      planNo: timingMsg.PLANNO,
      stageNos: timingMsg.STAGENOLIST,
      stageTimes: '',
      unitId: this.InterId,
    }
    this.coordPhases = timingMsg.COORD_PHASE ? timingMsg.COORD_PHASE.split(',') : []
    this.props.getTimePlanInfo(timingMsg.ID, timingMsg.PLANNO, this.InterId)
    this.props.getPlanStageList(this.InterId)
    this.setState({ showEditTiming: true })
  }
  handleCloseEdit = () => {
    this.setState({ showEditTiming: false })
  }
  handleEditChange = (e) => {
    const paramsName = e.target.getAttribute('pname')
    this.saveParams[paramsName] = e.target.value
  }
  handlePhaseChange = (e) => {
    const { id } = e.target
    const isChecked = e.target.checked
    if (isChecked) {
      this.coordPhases.push(id)
    } else {
      const index = this.coordPhases.indexOf(id)
      this.coordPhases.splice(index, 1)
    }
  }
  handleStageTimeChange = (e, indexs) => {
    this.stageTimes[indexs] = e.target.value
  }
  handleAddTimingPlan = () => {
    this.stageTimes = []
    this.coordPhases = []
    this.stageNos = []
    this.saveParams.id = 0
    this.props.getAddTimingPlan(this.InterId)
    this.setState({ showEditTiming: true })
  }
  handleSaveTimingPlan = () => {
    this.saveParams.stageTimes = this.stageTimes.join(',')
    this.saveParams.coordPhase = this.coordPhases.join(',')
    this.saveParams.stageNos = this.stageNos.join(',')
    console.log(this.saveParams)
    this.props.getSaveTimingPlan(this.saveParams).then((res) => {
      if (res.data.code === 200) {
        this.props.getTimingPlan(this.InterId)
      }
      message.info(res.data.message)
      this.setState({ showEditTiming: false })
    })
  }
  handleDelete = (e) => {
    const planNo = e.target.getAttribute('planno')
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除吗？',
      className: styles.confirmBox,
      onOk() {
        selfThis.props.getDeleteTimingPlan(planNo, selfThis.InterId).then((res) => {
          if (res.data.code === 200) {
            selfThis.props.getTimingPlan(selfThis.InterId)
          }
          message.info(res.data.message)
        })
      },
    })
  }
  handleAddStage = () => {
    this.setState({ editStageSelect: true })
  }
  handleDeleteStage = () => {
    if (this.planStageList && this.planStageList.length > 0) {
      this.planStageList.pop()
      this.setState({ planStageList: this.planStageList }, () => {
        this.stageNos = this.state.planStageList.map(item => item.STAGE_ID)
        this.stageTimes = this.state.planStageList.map(item => item.GREEN)
      })
    } else {
      message.info('请至少保留一个关联阶段')
    }
  }
  handleCancelStage = () => {
    this.setState({ editStageSelect: false })
  }
  handleRadioStageCheck = (index, stage) => {
    this.radioStageCheck = []
    this.radioStageCheck.push(stage)
    this.setState({ stageRadioIndex: index })
  }
  handleAddStageCheck = () => {
    this.planStageList = [...this.planStageList, ...this.radioStageCheck]
    this.setState({
      planStageList: this.planStageList,
      editStageSelect: false,
    }, () => {
      this.stageNos = this.state.planStageList.map(item => item.STAGE_ID)
      this.stageTimes = this.state.planStageList.map(item => item.GREEN)
    })
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const {
      timingPlans, showEditTiming, planDetails, phaseNoList, planStageList, editPlanStageList, editStageSelect, stageRadioIndex,
    } = this.state
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
                  <Input defaultValue={planDetails && planDetails.PLANNO} key={planDetails && planDetails.PLANNO} pname="planNO" onChange={this.handleEditChange} />
                </div>
                <div className={styles.editItemsName}>方案名称</div>
                <div className={styles.editItems}>
                  <Input defaultValue={planDetails && planDetails.PLANNAME} key={planDetails && planDetails.PLANNAME} pname="planName" onChange={this.handleEditChange} />
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>周期长</div>
                <div className={styles.editItems}>
                  <Input defaultValue={planDetails && planDetails.CYCLELEN} key={planDetails && planDetails.CYCLELEN} disabled />
                </div>
                <div className={styles.editItemsName}>协调相位差</div>
                <div className={styles.editItems}>
                  <Input defaultValue={planDetails && planDetails.OFFSET} key={planDetails && planDetails.OFFSET} pname="offset" onChange={this.handleEditChange} />
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>协调相位</div>
                <div className={styles.editItems} style={{ maxHeight: '65px', overflowY: 'auto' }}>
                  {
                    phaseNoList &&
                    phaseNoList.map((item, index) => {
                      return (
                        <span className={styles.phaseSelBox} key={item + index}>
                          <Checkbox id={item} onChange={this.handlePhaseChange} defaultChecked={this.coordPhases.indexOf(item) >= 0}>相位{item}</Checkbox>
                        </span>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>关联阶段 <br />(含过渡时间)</div>
                <div className={styles.editItems} style={{ maxHeight: '85px', overflowY: 'auto' }}>
                  {
                    planStageList &&
                    planStageList.map((stage, index) => {
                      return (
                        <div className={styles.stageBox} key={stage.STAGE_ID + stage.STAGE_IMAGE + stage.GREEN}>
                          <p className={styles.phaseNo}>{stage.STAGE_ID}</p>
                          <img width="35px" height="35px" src={`http://192.168.1.123:26001/atms/comm/images/anniu/${stage.STAGE_IMAGE}`} alt="" />
                          <input type="text" defaultValue={stage.GREEN} onChange={(e) => { this.handleStageTimeChange(e, index) }} />
                        </div>
                      )
                    })
                  }
                  <div className={styles.stageBox}>
                    <span className={styles.editStageBtn} onClick={this.handleAddStage}><Icon type="plus" /></span>
                    <span className={styles.editStageBtn} onClick={this.handleDeleteStage}><Icon type="minus" /></span>
                  </div>
                </div>
              </div>
              <div className={styles.editBtnBox}>
                <div className={styles.editBtn} style={{ backgroundColor: '#ccc' }} onClick={this.handleCloseEdit}>取消</div>
                <div className={styles.editBtn} onClick={this.handleSaveTimingPlan}>确定</div>
              </div>
              {
                editStageSelect &&
                <div className={styles.stageSelectMark}>
                  <div className={styles.stageSelectBox}>
                    <div className={styles.stageTilte}>选择阶段</div>
                    <div className={styles.stageContent}>
                      {
                        editPlanStageList &&
                        editPlanStageList.map((stages, index) => {
                          return (
                            <div className={styles.stageBox} key={stages.STAGE_ID + stages.GREEN}>
                              <p className={styles.phaseNo}>
                                <span className={styles.radioBtn} onClick={() => { this.handleRadioStageCheck(index, stages) }}><i className={styles.radioCheck} style={{ opacity: stageRadioIndex === index ? 1 : 0 }} /></span>
                                {stages.STAGE_ID}
                              </p>
                              <img width="35px" height="35px" src={`http://192.168.1.123:26001/atms/comm/images/anniu/${stages.STAGE_IMAGE}`} alt="" />
                              <input type="text" defaultValue={stages.GREEN} />
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className={styles.stageAction}>
                      <div className={styles.stageActionBtn} onClick={this.handleAddStageCheck}>确定</div>
                      <div className={styles.stageActionBtn} style={{ backgroundColor: '#ccc' }} onClick={this.handleCancelStage}>取消</div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>配时方案配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left} onClick={this.handleAddTimingPlan}>添加</div>
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
                return (
                  <div className={styles.mountingTr} key={item.ID}>
                    <div className={styles.mountingTd}>{item.PLANNO}</div>
                    <div className={styles.mountingTd}>{item.PLANNAME}</div>
                    <div className={styles.mountingTd}>{item.CYCLELEN}</div>
                    <div className={styles.mountingTd}>{item.COORD_PHASE}</div>
                    <div className={styles.mountingTd}>{item.OFFSET}</div>
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
                      <div className={styles.deviceMsg}><span planno={item.PLANNO} onClick={this.handleDelete}>删除</span></div>
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
    getTimePlanInfo: bindActionCreators(getTimePlanInfo, dispatch),
    getSaveTimingPlan: bindActionCreators(getSaveTimingPlan, dispatch),
    getAddTimingPlan: bindActionCreators(getAddTimingPlan, dispatch),
    getDeleteTimingPlan: bindActionCreators(getDeleteTimingPlan, dispatch),
    getPlanStageList: bindActionCreators(getPlanStageList, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(TimingPlan)
