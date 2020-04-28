import React from 'react'
import { Icon, Input, Checkbox, message, Modal, Select } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './TimingPlan.scss'

// import { getTimingPlan, getTimePlanInfo, getSaveTimingPlan, getAddTimingPlan, getDeleteTimingPlan, getPlanStageList } from '../../../../actions/interCofig'

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

  }
  componentDidUpdate = (prevState) => {
    // const { timingPlan, timePlanInfo, addTimingPlan, planStageList } = this.props.da
    console.log(prevState, 'qiaoshai')
    if (prevState.shows !== this.state.showEditTiming) {
      console.log(12346548789)
      this.getupdateShows(prevState)
    }
    // if (prevState.data.timingPlan !== timingPlan) {
    //   this.getTimingPlanList(timingPlan)
    // }
    // if (prevState.data.timePlanInfo !== timePlanInfo) {
    //   this.getTimePlanDetails(timePlanInfo)
    // }
    // if (prevState.data.addTimingPlan !== addTimingPlan) {
    //   this.getAdd(addTimingPlan)
    // }
    // if (prevState.data.planStageList !== planStageList) {
    //   this.getEditStageList(planStageList)
    // }
  }
  getupdateShows = (prevState) => {
    this.setState({
      showEditTiming: prevState.shows,
    })
  }
  // getEditStageList = (planStageList) => {
  //   this.setState({ editPlanStageList: planStageList.planStageList })
  // }
  // getAdd = (addTimingPlan) => {
  //   const planInfo = {
  //     COORD_PHASE: null,
  //     LOSE_PHASE: null,
  //     CYCLELEN: 0,
  //     PLANNAME: '添加方案',
  //     PHASE_SEQUENCE_NO: 1,
  //     OFFSET: 0,
  //     PLANNO: 1,
  //   }
  //   this.setState({
  //     planDetails: planInfo,
  //     planStageList: addTimingPlan.planStageList,
  //     phaseNoList: addTimingPlan.phaseNoList,
  //   })
  //   addTimingPlan.planStageList.forEach((item) => {
  //     this.stageTimes.push(item.GREEN)
  //   })
  // }
  // getTimingPlanList = (timingPlans) => {
  //   this.setState({ timingPlans })
  // }
  // getTimePlanDetails = (timePlanInfo) => {
  //   this.planStageList = timePlanInfo.planStageList
  //   this.setState({
  //     planDetails: timePlanInfo.planInfo,
  //     planStageList: timePlanInfo.planStageList,
  //     phaseNoList: timePlanInfo.phaseNoList,
  //   })
  //   timePlanInfo.planStageList.forEach((item) => {
  //     this.stageTimes.push(item.GREEN)
  //     this.stageNos.push(item.STAGE_ID)
  //   })
  // }
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
  // 改变所属区域内容
  changeRegion = (ID) => {
    this.changeRegionValue = ID
  }
  // 改变路口内容
  changeIntersection = (ID) => {
    this.changeIntctionValue = ID
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
    console.log(index)
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
    const { Option } = Select
    const {
      timingPlans, showEditTiming, planDetails, phaseNoList, planStageList, editPlanStageList, editStageSelect, stageRadioIndex,
    } = this.state
    return (
     
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
    // getTimingPlan: bindActionCreators(getTimingPlan, dispatch),
    // getTimePlanInfo: bindActionCreators(getTimePlanInfo, dispatch),
    // getSaveTimingPlan: bindActionCreators(getSaveTimingPlan, dispatch),
    // getAddTimingPlan: bindActionCreators(getAddTimingPlan, dispatch),
    // getDeleteTimingPlan: bindActionCreators(getDeleteTimingPlan, dispatch),
    // getPlanStageList: bindActionCreators(getPlanStageList, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(TimingPlan)
