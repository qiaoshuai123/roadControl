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
      showPhaseEditBox: false,
      editItemData: null,
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
  getPhaseEditMsg = (itemMsg) => {
    const editItem = [
      { name: '相位编号', paramsName: 'phaseNo', value: itemMsg.PHASE_NO },
      { name: '相位名称', paramsName: 'phaseName', value: itemMsg.PHASE_NAME },
      { name: '所属环', paramsName: 'ringNo', value: itemMsg.RING_NO },
      { name: '红黄时间', paramsName: 'redYellowTime', value: itemMsg.RED_YELLOW_TIME },
      { name: '绿闪时间', paramsName: 'greenFlashTime', value: itemMsg.GREEN_FLASH_TIME },
      { name: '安全红灯', paramsName: 'safeRedTime', value: itemMsg.SAFE_RED_TIME },
      { name: '第一周期绿灯', paramsName: 'firstCycleGreenTime', value: itemMsg.FIRST_CYCLE_GREEN_TIME },
      { name: '跟随同断相位', paramsName: 'followOffPhaseNo', value: itemMsg.FOLLOW_OFF_PHASE_NO },
      { name: '最大初始值', paramsName: 'maxInitialValue', value: itemMsg.MAX_INITIAL_VALUE },
      { name: '递减前时间', paramsName: 'beforeDecrementTime', value: itemMsg.BEFORE_DECREMENT_TIME },
      { name: '递减前车辆', paramsName: 'beforeDecrementCarNumber', value: itemMsg.BEFORE_DECREMENT_CAR_NUMBER },
      { name: '递减时间', paramsName: 'decrementTime', value: itemMsg.DECREMENT_TIME },
      { name: '单位递减率', paramsName: 'unitDecrementValue', value: itemMsg.UNIT_DECREMENT_VALUE },
      { name: '最小间隔', paramsName: 'minInterval', value: itemMsg.MIN_INTERVAL },
      { name: '行人放行', paramsName: 'peopleGreenTime', value: itemMsg.PEOPLE_GREEN_TIME },
      { name: '行人清空', paramsName: 'peopleGreenFlashTime', value: itemMsg.PEOPLE_GREEN_FLASH_TIME },
      { name: '并发相位', paramsName: 'concurrentPhaseNos', value: itemMsg.CONCURRENT_PHASE_NO_LIST },
      { name: '初始状态', paramsName: 'initialState', value: itemMsg.INITIAL_STATE },
      { name: '非感应', paramsName: 'noninductive', value: itemMsg.NONINDUCTIVE },
      { name: '对应方向', paramsName: 'direction', value: itemMsg.DIRECTION },
      { name: '对应车道方向', paramsName: 'flowDirection', value: itemMsg.FLOW_DIRECTION },
      { name: '最小绿', paramsName: 'minGreenTime', value: itemMsg.MIN_GREEN_TIME },
      { name: '最大绿1', paramsName: 'maxGreenTimeOne', value: itemMsg.MAX_GREEN_TIME_ONE },
      { name: '最大绿2', paramsName: 'maxGreenTimeTwo', value: itemMsg.MAX_GREEN_TIME_TWO },
      { name: '单位延长绿', paramsName: 'UnitExtendGreenTime', value: itemMsg.UNIT_EXTEND_GREEN_TIME },
      { name: '最大限制值', paramsName: 'maxRunTime', value: itemMsg.MAX_RUN_TIME },
      { name: '动态步长', paramsName: 'runStepSize', value: itemMsg.RUN_STEP_SIZE },
      { name: '黄灯时间', paramsName: 'yellowTime', value: itemMsg.YELLOW_TIME },
      { name: '全红时间', paramsName: 'allRedTime', value: itemMsg.ALL_RED_TIME },
      { name: '红灯保护', paramsName: 'minRedTime', value: itemMsg.MIN_RED_TIME },
      { name: '增加初始值', paramsName: 'addInitialValue', value: itemMsg.ADD_INITIAL_VALUE },
      { name: '按位设置', paramsName: 'setByBit', value: itemMsg.SET_BY_BIT },
    ]
    this.setState({ editItemData: editItem })
  }
  handleEditPhaseMsg = (itemMsg) => {
    this.setState({ showPhaseEditBox: true })
    this.getPhaseEditMsg(itemMsg)
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const { phaseLists, showPhaseEditBox } = this.state
    return (
      <div className={styles.phaseConfigBox}>
        {
          showPhaseEditBox &&
          <div className={styles.phaseEditBox}>
            <div className={styles.phaseEditDetails}>
              <div className={styles.msgItems}>
                <div className={styles.itemText}>1234</div>
                <div className={styles.itemValue}><input type="text" /></div>
              </div>
              <div className={styles.msgItems}>
                <div className={styles.itemText}>1234</div>
                <div className={styles.itemValue}><input type="text" /></div>
              </div>
              <div className={styles.msgItems}>
                <div className={styles.itemText}>1234</div>
                <div className={styles.itemValue}><input type="text" /></div>
              </div>
              <div className={styles.msgItems}>
                <div className={styles.itemText}>1234</div>
                <div className={styles.itemValue}><input type="text" /></div>
              </div>
              <div className={styles.msgItems}>
                <div className={styles.itemText}>1234</div>
                <div className={styles.itemValue}><input type="text" /></div>
              </div>
              <div className={styles.msgItems}>
                <div className={styles.itemText}>1234</div>
                <div className={styles.itemValue}><input type="text" /></div>
              </div>
              <div className={styles.msgItems}>
                <div className={styles.itemText}>1234</div>
                <div className={styles.itemValue}><input type="text" /></div>
              </div>
              <div className={styles.msgItems}>
                <div className={styles.itemText}>1234</div>
                <div className={styles.itemValue}><input type="text" /></div>
              </div>
              <div className={styles.msgItems}>
                <div className={styles.itemText}>1234</div>
                <div className={styles.itemValue}><input type="text" /></div>
              </div>
            </div>
          </div>

        }
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>相位配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div className={styles.phaseConfigBoxCenter_left}>上载</div>
          <div className={styles.phaseConfigBoxCenter_left}>下发</div>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left}>添加</div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>相位编号</div>
            <div className={styles.mountingTh}>相位名称</div>
            <div className={styles.mountingTh}>相序环号</div>
            <div className={styles.mountingTh}>最小绿</div>
            <div className={styles.mountingTh}>最大绿1</div>
            <div className={styles.mountingTh}>最大绿2</div>
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
                    <div className={styles.mountingTd}>{item.RING_NO}</div>
                    <div className={styles.mountingTd}>{item.MIN_GREEN_TIME}</div>
                    <div className={styles.mountingTd}>{item.MAX_GREEN_TIME_ONE}</div>
                    <div className={styles.mountingTd}>{item.MAX_GREEN_TIME_TWO}</div>
                    <div className={styles.mountingTd}>
                      <div className={styles.deviceMsg}><span onClick={() => { this.handleEditPhaseMsg(item) }}>修改</span></div>
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
