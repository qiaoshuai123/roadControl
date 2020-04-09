import React from 'react'
import { Icon, Select } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './BaseAction.scss'

import { getBaseAction } from '../../../../actions/interCofig'

class BaseAction extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      baseActions: null,
      showEditBox: false,
    }
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.props.getBaseAction(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { baseActions } = this.props.data
    if (prevState.data.baseActions !== baseActions) {
      this.getBaseActions(baseActions)
    }
  }
  getBaseActions = (baseActions) => {
    this.setState({ baseActions })
  }
  handleEditAction = () => {
    this.setState({ showEditBox: true })
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const { Option } = Select
    const { baseActions, showEditBox } = this.state
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
                <div className={styles.editItemsName}>动作编号</div>
                <div className={styles.editItems}>
                  <Select defaultValue={1} onChange={this.handleChangeTimeNo}>
                    {
                      new Array(16).fill(true).map((item, index) => (
                        <Option key={item + index} value={index + 1}>{index + 1}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className={styles.editItemsName}>执行方案</div>
                <div className={styles.editItems} style={{ flex: 1.2 }}>
                  <Select defaultValue={1} onChange={this.handleChangeTimeNo}>
                    {
                      new Array(16).fill(true).map((item, index) => (
                        <Option key={item + index} value={index + 1}>{index + 1}</Option>
                      ))
                    }
                  </Select>
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
          <div className={styles.phaseConfigBoxTop_left}>时基动作配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left}>添加</div>
          <div className={styles.phaseConfigBoxCenter_left}>上载</div>
          <div className={styles.phaseConfigBoxCenter_left}>下发</div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>动作编号</div>
            <div className={styles.mountingTh}>关联方案</div>
            <div className={styles.mountingTh}> 操作</div>
          </div>
          <div className={styles.mountingTbody}>
            {
              baseActions &&
              baseActions.map((item) => {
                return (
                  <div className={styles.mountingTr} key={item.ID}>
                    <div className={styles.mountingTd}>{item.PLANNO}</div>
                    <div className={styles.mountingTd}>{item.ACTIONNO}</div>
                    <div className={styles.mountingTd}>
                      <div className={styles.deviceMsg}><span onClick={this.handleEditAction}>修改</span></div>
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
    getBaseAction: bindActionCreators(getBaseAction, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(BaseAction)
