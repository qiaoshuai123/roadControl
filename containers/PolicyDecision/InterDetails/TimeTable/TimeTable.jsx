import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon, Select, TimePicker, message, Modal } from 'antd'
import moment from 'moment'
import styles from './TimeTable.scss'

import { getTimeTable, getDeleteTimeTable, getTimetableActions } from '../../../../actions/interCofig'

class TimeTable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      timeTable: null,
      showEditBox: false,
      defaultOrderNo: null,
      defaultTime: '12:00',
      defaultAction: null,
      timeTableActions: null,
    }
    this.orderList = []
  }
  componentDidMount = () => {
    console.log(this.props)
    this.InterId = this.props.match.params.id
    this.props.getTimeTable(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { timeTable, deleteTimeTable, timeTableActions } = this.props.data
    if (prevState.data.timeTable !== timeTable) {
      this.getTimeTable(timeTable)
    }
    if (prevState.data.deleteTimeTable !== deleteTimeTable) {
      message.info(deleteTimeTable)
    }
    if (prevState.data.timeTableActions !== timeTableActions) {
      this.getTimetableActionList(timeTableActions)
    }
  }
  getTimeTable = (timeTable) => {
    this.setState({ timeTable })
  }
  getTimetableActionList = (timeTableActions) => {
    this.setState({ timeTableActions })
  }
  handleEdit = (items) => {
    this.orderList = []
    if (this.state.timeTable.length) {
      this.state.timeTable.forEach((item) => {
        if (item.ORDER_NO !== items.ORDER_NO) {
          this.orderList.push(item.ORDER_NO)
        }
      })
    }
    this.setState({
      showEditBox: true,
      defaultOrderNo: items.ORDER_NO,
      defaultTime: items.START_TIME,
      defaultAction: items.ACTION,
    })
    this.props.getTimetableActions(this.InterId)
  }
  handleCloseEdit = () => {
    this.setState({ showEditBox: false })
  }
  handleDelete = (e) => {
    const id = e.target.getAttribute('id')
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除吗？',
      className: styles.confirmBox,
      onOk() {
        selfThis.props.getDeleteTimeTable(id).then((res) => {
          const { code } = res.data
          if (code === 200) {
            selfThis.props.getTimeTable(selfThis.InterId)
          }
          message.info(res.data.message)
        })
      },
    })
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const {
      timeTable, showEditBox, defaultOrderNo, defaultTime, defaultAction, timeTableActions,
    } = this.state
    const { Option } = Select
    const format = 'HH:mm'
    return (
      <div className={styles.phaseConfigBox}>
        {
          showEditBox &&
          <div className={styles.editBox}>
            <div className={styles.editDetails}>
              <div className={styles.editTitle}>
                编辑时段表信息
                <span className={styles.cloeEditIcon} onClick={this.handleCloseEdit}><Icon type="close" /></span>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItems}>时段表号</div>
                <div className={styles.editItems}>
                  <Select defaultValue={1}>
                    {
                      new Array(16).fill(true).map((item, index) => (
                        <Option key={item + index} value={index + 1}>{index + 1}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className={styles.editItems}>时段号</div>
                <div className={styles.editItems} style={{ flex: 1.2 }}>
                  <Select defaultValue={defaultOrderNo}>
                    {
                      timeTable && timeTable.length > 0 &&
                      new Array(48).fill(true).map((item, index) => {
                        if (this.orderList.indexOf(index + 1) === -1) {
                          return (
                            <Option key={item + index} value={index + 1}>{index + 1}</Option>
                          )
                        }
                      })
                    }
                  </Select>
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItems}>开始时间</div>
                <div className={styles.editItems}>
                  <TimePicker key={defaultTime} defaultValue={moment(defaultTime, format)} format={format} minuteStep={15} allowClear={false} />
                </div>
                <div className={styles.editItems}>关联动作</div>
                <div className={styles.editItems} style={{ flex: 1.2 }}>
                  <Select defaultValue={`动作${defaultAction}`}>
                    {
                      timeTableActions &&
                      timeTableActions.map((item) => {
                        return (
                          <Option key={item} value={`动作${item}`}>动作{item}</Option>
                        )
                      })
                    }
                  </Select>
                </div>
              </div>
            </div>
          </div>
        }
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>时段表配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div className={styles.phaseConfigBoxCenter_left}>上载</div>
          <div className={styles.phaseConfigBoxCenter_left}>下发</div>
          <div className={styles.phaseConfigBoxCenter_left}>添加</div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>时段表号</div>
            <div className={styles.mountingTh}>时段号</div>
            <div className={styles.mountingTh}>开始时间</div>
            <div className={styles.mountingTh}>关联动作</div>
            <div className={styles.mountingTh}> 操作</div>
          </div>
          <div className={styles.mountingTbody}>
            {
              timeTable && timeTable.length > 0 &&
              timeTable.map((item) => {
                return (
                  <div className={styles.mountingTr} key={item.ID}>
                    <div className={styles.mountingTd}>{item.TIME_INTERVAL_NO}</div>
                    <div className={styles.mountingTd}>{item.ORDER_NO}</div>
                    <div className={styles.mountingTd}>{item.START_TIME}</div>
                    <div className={styles.mountingTd}>动作{item.ACTION}</div>
                    <div className={styles.mountingTd}>
                      <div className={styles.deviceMsg}><span onClick={() => { this.handleEdit(item) }}>修改</span></div>
                      <div className={styles.deviceMsg}><span id={item.ID} onClick={this.handleDelete}>删除</span></div>
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
    getTimeTable: bindActionCreators(getTimeTable, dispatch),
    getDeleteTimeTable: bindActionCreators(getDeleteTimeTable, dispatch),
    getTimetableActions: bindActionCreators(getTimetableActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(TimeTable)
