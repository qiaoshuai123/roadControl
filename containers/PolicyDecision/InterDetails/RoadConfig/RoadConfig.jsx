import React from 'react'
import { Icon, Select, Input, Modal, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './RoadConfig.scss'

import { getRoadLists, getDirectionList, getDirectionForLane, getRoadTypeList, getDeleteRoad } from '../../../../actions/interCofig'

class RoadConfig extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      roadList: null,
      showEditRoadMsg: false,
      directions: null,
      dirForLane: null,
      roadTypeLists: null,
      roadMsg: null,
    }
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.props.getRoadLists(this.InterId)
    this.props.getDirectionList()
    this.props.getDirectionForLane()
    this.props.getRoadTypeList()
  }
  componentDidUpdate = (prevState) => {
    const { roadList, directionList, directionForLane, roadTypeList } = this.props.data
    if (prevState.data.roadList !== roadList) {
      this.getTimingPlanList(roadList)
    }
    if (prevState.data.directionList !== directionList) {
      this.getDirection(directionList)
    }
    if (prevState.data.directionForLane !== directionForLane) {
      this.getDirForLane(directionForLane)
    }
    if (prevState.data.roadTypeList !== roadTypeList) {
      this.getRoadTypes(roadTypeList)
    }
  }
  getTimingPlanList = (roadList) => {
    this.setState({ roadList })
  }
  getDirection = (directions) => {
    this.setState({ directions })
    const result = directions.forEach(item => ({ id: item.C_CODE, name: item.CODE_NAME }))
    console.log(result, 'new array')
  }
  getDirForLane = (dirForLane) => {
    this.setState({ dirForLane })
  }
  getRoadTypes = (roadTypeLists) => {
    this.setState({ roadTypeLists })
  }
  // 编辑
  handleEditRoad = (roadMsg) => {
    console.log(roadMsg)
    this.setState({ showEditRoadMsg: true, roadMsg })
  }
  handleCloseEdit = () => {
    this.setState({ showEditRoadMsg: false })
  }
  handleAddRoad = () => {
    const roadMsg = {
      CHANNEL_NO: 1,
      DIRECTION: 1,
      FLOW_DIRECTION: 1,
      IN_OR_OUT: 1,
      LANE_ORDER: 1,
      LANE_TYPE: 1,
      LEFT_RATIO: 0,
      RIGHT_RATIO: 0,
      STRAIGHT_RATIO: 0,
    }
    this.setState({ showEditRoadMsg: true, roadMsg })
  }
  handleDeleteRoad = (roadMsg) => {
    const params = `?direction=${roadMsg.DIRECTION}&inOrOut=${roadMsg.IN_OR_OUT}&laneOrder=${roadMsg.LANE_ORDER}&unitId=${roadMsg.UNIT_ID}`
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除吗？',
      className: styles.confirmBox,
      onOk() {
        selfThis.props.getDeleteRoad(params).then((res) => {
          if (res.data.code === 200) {
            selfThis.props.getRoadLists(selfThis.InterId)
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
    const { roadList, showEditRoadMsg, directions, dirForLane, roadTypeLists, roadMsg } = this.state
    const { Option } = Select
    return (
      <div className={styles.phaseConfigBox}>
        {
          showEditRoadMsg &&
          <div className={styles.editBox}>
            <div className={styles.editDetails}>
              <div className={styles.editTitle}>
                编辑车道表信息
                <span className={styles.cloeEditIcon} onClick={this.handleCloseEdit}><Icon type="close" /></span>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>车道方向</div>
                <div className={styles.editItems}>
                  <Select defaultValue={roadMsg && roadMsg.DIRECTION} onChange={this.handleSaveParamsChange}>
                    {
                      directions &&
                      directions.map(item => (<Option key={'方向' + item.C_CODE} value={item.C_CODE} paramsname="lampType">{item.CODE_NAME}</Option>))
                    }
                  </Select>
                </div>
                <div className={styles.editItemsName}>进出口</div>
                <div className={styles.editItems}>
                  <Select defaultValue={roadMsg && roadMsg.IN_OR_OUT} onChange={this.handleSaveParamsChange}>
                    <Option key="1" value={1} paramsname="lampType">进口</Option>
                    <Option key="2" value={2} paramsname="lampType">出口</Option>
                    <Option key="99" value={99} paramsname="lampType">其他</Option>
                  </Select>
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>车道序号</div>
                <div className={styles.editItems}>
                  <Input defaultValue={roadMsg && roadMsg.CHANNEL_NO} paramsname="channelNo" onChange={this.handleChannelNoChange} />
                </div>
                <div className={styles.editItemsName}>关联通道号</div>
                <div className={styles.editItems}>
                  <Input defaultValue={roadMsg && roadMsg.FLOW_DIRECTION} paramsname="channelNo" onChange={this.handleChannelNoChange} />
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>车道类型</div>
                <div className={styles.editItems}>
                  
                  <Select defaultValue={roadMsg && roadMsg.LANE_TYPE} onChange={this.handleSaveParamsChange}>
                    {
                      roadTypeLists &&
                      roadTypeLists.map(item => (<Option key={'类型' + item.C_CODE} value={item.C_CODE} paramsname="lampType">{item.CODE_NAME}</Option>))
                    }
                  </Select>
                </div>
                <div className={styles.editItemsName}>车道车流方向</div>
                <div className={styles.editItems}>
                  <Select defaultValue={roadMsg && roadMsg.LANE_TYPE} onChange={this.handleSaveParamsChange}>
                    {
                      dirForLane &&
                      dirForLane.map(item => (<Option key={'车流' + item.C_CODE} value={item.C_CODE} paramsname="lampType">{item.CODE_NAME}</Option>))
                    }
                  </Select>
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>左转比例</div>
                <div className={styles.editItems}>
                  <Input defaultValue={roadMsg && roadMsg.LEFT_RATIO} paramsname="channelNo" onChange={this.handleChannelNoChange} />
                </div>
                <div className={styles.editItemsName}>直行比例</div>
                <div className={styles.editItems}>
                  <Input defaultValue={roadMsg && roadMsg.STRAIGHT_RATIO} paramsname="channelNo" onChange={this.handleChannelNoChange} />
                </div>
              </div>
              <div className={styles.editContent}>
                <div className={styles.editItemsName}>右转比例</div>
                <div className={styles.editItems}>
                  <Input defaultValue={roadMsg && roadMsg.RIGHT_RATIO} paramsname="channelNo" onChange={this.handleChannelNoChange} />
                </div>
              </div>
              <div className={styles.editBtnBox}>
                <div className={styles.editBtn} style={{ backgroundColor: '#ccc' }} onClick={this.handleCloseEdit}>取消</div>
                <div className={styles.editBtn} onClick={this.handleSaveRoadInfo}>确定</div>
              </div>
            </div>
          </div>
        }
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>车道配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left} onClick={this.handleAddRoad}>添加</div>
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
                  <div className={styles.mountingTr} key={item.DIRECTION_NAME + index}>
                    <div className={styles.mountingTd}>{item.DIRECTION_NAME}</div>
                    <div className={styles.mountingTd}>{item.IN_OR_OUT_NAME}</div>
                    <div className={styles.mountingTd}>{item.LANE_ORDER}</div>
                    <div className={styles.mountingTd}>{item.LANE_TYPE_NAME}</div>
                    <div className={styles.mountingTd}>{item.CHANNEL_NO}</div>
                    <div className={styles.mountingTd}>{item.LEFT_RATIO}</div>
                    <div className={styles.mountingTd}>{item.STRAIGHT_RATIO}</div>
                    <div className={styles.mountingTd}>{item.RIGHT_RATIO}</div>
                    <div className={styles.mountingTd}>{item.FLOW_DIRECTION_NAME}</div>
                    <div className={styles.mountingTd}>
                      <div className={styles.deviceMsg}><span onClick={() => { this.handleEditRoad(item) }}>修改</span></div>
                      <div className={styles.deviceMsg}><span onClick={() => { this.handleDeleteRoad(item) }}>删除</span></div>
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
    getDirectionList: bindActionCreators(getDirectionList, dispatch),
    getDirectionForLane: bindActionCreators(getDirectionForLane, dispatch),
    getRoadTypeList: bindActionCreators(getRoadTypeList, dispatch),
    getDeleteRoad: bindActionCreators(getDeleteRoad, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(RoadConfig)
