import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon, Select, Checkbox } from 'antd'
import styles from './Schedule.scss'

import { getScheduleList } from '../../../../actions/interCofig'

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scheduleList: null,
      showEditBox: false,
    }
    this.monthPlan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    this.weekPlan = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    this.dayPlan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    this.coordPhases = []
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
  // 编辑
  handleEditSchedule = () => {
    this.setState({ showEditBox: true })
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const { Option } = Select
    const { scheduleList, showEditBox } = this.state
    return (
      <div className={styles.phaseConfigBox}>
        {
          showEditBox &&
          <div className={styles.editBox}>
            <div className={styles.editDetails}>
              <div className={styles.editTitle}>
                编辑阶段
                <span className={styles.cloeEditIcon} onClick={this.handleCloseEdit}><Icon type="close" /></span>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>调度计划号</div>
                <div className={styles.editItems}>
                  <Select defaultValue={251} onChange={this.handleChangeAction}>
                    <Option key={251} value={251} pname="planNo">关灯控制</Option>
                    <Option key={252} value={252} pname="planNo">全红控制</Option>
                    <Option key={254} value={254} pname="planNo">感应控制</Option>
                    <Option key={255} value={255} pname="planNo">闪光控制</Option>
                  </Select>
                </div>
                <div className={styles.editItemsName}>时段表号</div>
                <div className={styles.editItems}>
                  <Select defaultValue={251} onChange={this.handleChangeAction}>
                    <Option key={251} value={251} pname="planNo">关灯控制</Option>
                    <Option key={252} value={252} pname="planNo">全红控制</Option>
                    <Option key={254} value={254} pname="planNo">感应控制</Option>
                    <Option key={255} value={255} pname="planNo">闪光控制</Option>
                  </Select>
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>月计划</div>
                <div className={styles.editItems} style={{ maxHeight: '85px', overflowY: 'auto', overflowX: 'hidden' }}>
                  {
                    this.monthPlan.map((item) => {
                      return (
                        <span className={styles.phaseSelBox} key={item + '月'} style={{ width: '60px' }}>
                          <Checkbox id={item} onChange={this.handlePhaseChange} defaultChecked={this.coordPhases.indexOf(item) >= 0}>{item}</Checkbox>
                        </span>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>日计划</div>
                <div className={styles.editItems} style={{ maxHeight: '85px', overflowY: 'auto', overflowX: 'hidden' }}>
                  {
                    this.dayPlan.map((item) => {
                      return (
                        <span className={styles.phaseSelBox} key={'日' + item} style={{ width: '60px' }}>
                          <Checkbox id={item} onChange={this.handlePhaseChange} defaultChecked={this.coordPhases.indexOf(item) >= 0}>{item}</Checkbox>
                        </span>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>星期计划</div>
                <div className={styles.editItems}>
                  {
                    this.weekPlan.map((item) => {
                      return (
                        <span className={styles.phaseSelBox} key={item} style={{ width: '100px' }}>
                          <Checkbox id={item} onChange={this.handlePhaseChange} defaultChecked={this.coordPhases.indexOf(item) >= 0}>{item}</Checkbox>
                        </span>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.editBtnBox}>
                <div className={styles.editBtn} style={{ backgroundColor: '#ccc' }} onClick={this.handleCloseEdit}>取消</div>
                <div className={styles.editBtn} onClick={this.handleSaveActions}>确定</div>
              </div>
            </div>
          </div>
        }
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
                console.log(item.SCHEDULEDAY, item.SCHEDULEDAY.substr(-1))
                const day = item.SCHEDULEDAY.length > 0 && item.SCHEDULEDAY.split(',').length > 3 ? `${item.SCHEDULEDAY.split(',')[0]} - ${item.SCHEDULEDAY.split(',')[item.SCHEDULEDAY.split(',').length - 1]}` : item.SCHEDULEDAY
                const month = item.SCHEDULEMONTH.length > 0 && item.SCHEDULEMONTH.split(',').length > 3 ? `${item.SCHEDULEMONTH.split(',')[0]} - ${item.SCHEDULEMONTH.split(',')[item.SCHEDULEMONTH.split(',').length - 1]}` : item.SCHEDULEMONTH
                const week = item.SCHEDULEWEEK.length > 0 ? ((item.SCHEDULEWEEK.split(',')).map(item => item === '1' ? '日' : item - 1)).join(',') : item.SCHEDULEWEEK
                const weekDays = week.length > 0 && week.split(',').length > 3 ? `${week.substr(0, 1)} - ${week.substr(-1)}` : week
                return (
                  <div className={styles.mountingTr} key={item.ID}>
                    <div className={styles.mountingTd}>{item.SCHEDULENO}</div>
                    <div className={styles.mountingTd}>{`月份：${month}`}</div>
                    <div className={styles.mountingTd}>{`日期：${day}`}</div>
                    <div className={styles.mountingTd}>{`星期：${weekDays}`}</div>
                    <div className={styles.mountingTd}>{item.TIME_INTERVAL_NO}</div>
                    <div className={styles.mountingTd}>
                      <div className={styles.deviceMsg}><span onClick={this.handleEditSchedule}>修改</span></div>
                      <div className={styles.deviceMsg}><span onClick={this.handleDeleteSchedule}>删除</span></div>
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
