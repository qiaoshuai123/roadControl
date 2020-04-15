import React from 'react'
import { Input, Select, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getloadManageMent, getvalidate, getloadUnitName, getsaveOrUpdateForm } from '../../../../actions/management'
import styles from './ModalPage.scss'

class ModalPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      EquipmentModel: '', // 路口编号
      CorrelationNumber: '', // 区域名称
      IntersectionList: [], // 添加路口列表
      dateListValues: [], // 路口列表
      Correlationdetail: '', // 描述
      ManagementUnit: '', // 管理单位f
      SubordinateUnitLsit: [], // 管理单位列表
      OptionList: [], // 选择路口列表
    }
    this.isShow = []
    this.num = 1
  }
  componentDidMount = () => {
    // eslint-disable-next-line no-undef
    this.props.getloadManageMent()
    this.props.getloadUnitName(-1)
  }
  componentDidUpdate = (prevState) => {
    const { loadManageMent, validate, loadUnitName, saveOrUpdateForm } = this.props.data
    if (prevState.data.loadManageMent !== loadManageMent) {
      this.getloadManageMent(loadManageMent)
    }
    if (prevState.data.validate !== validate) {
      this.getvalidate(validate)
    }
    if (prevState.data.loadUnitName !== loadUnitName) {
      this.getloadUnitName(loadUnitName)
    }
    if (prevState.data.saveOrUpdateForm !== saveOrUpdateForm) {
      this.getsaveOrUpdateForm(saveOrUpdateForm)
    }
  }
  getloadManageMent = (loadManageMent) => {
    this.setState({
      SubordinateUnitLsit: loadManageMent,
      ManagementUnit: loadManageMent[0].USER_GROUP_NAME,
    })
  }
  getvalidate = (validate) => {
    if (validate) {
      message.error('该区域编号已经存在')
      this.isvalidate = false
    } else {
      this.isvalidate = true
    }
  }
  getloadUnitName = (loadUnitName) => {
    console.log(loadUnitName)
    this.setState({
      OptionList: loadUnitName,
    })
  }
  changValue = (e) => { // 页面所有input框改变触发
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }
  blurchange = () => { // 首个input框失去焦点事件
    const { EquipmentModel } = this.state
    this.props.getvalidate(EquipmentModel)
  }
  inpvalue = (e) => {
    console.log(e, 'sss')
  }
  handleCancel = () => {
    this.props.isShowModalPage()
  }
  handleChange = (value) => {
    console.log(value)
    this.setState({
      dateListValues: value,
    })
  }
  addList = () => { // 渲染添加路口名称
    const { dateListValues } = this.state
    this.setState({
      IntersectionList: dateListValues,
      dateListValues: [],
    })
  }
  delectIntersectionList = (id) => {
    const { IntersectionList } = this.state
    const arr = IntersectionList.filter(item => item.ID !== id)
    this.setState({
      IntersectionList: arr,
    })
  }
  render() {
    const {
      EquipmentModel, CorrelationNumber, IntersectionList, Correlationdetail,
      dateListValues, ManagementUnit, SubordinateUnitLsit, OptionList,
    } = this.state
    const { Option } = Select
    return (
      <div className={styles.ModalPageWrapper}>
        <div className={styles.mountingTable}>
          <div className={styles.mountingTbody}>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div><span>*</span>区域编号</div><div><Input name="EquipmentModel" onBlur={this.blurchange} onChange={this.changValue} value={EquipmentModel} /></div></div>
              <div className={styles.mountingTd}><div><span>*</span>区域名称</div><div><Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} /></div></div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div><span>*</span>管理单位</div>
                <div>
                  <Select
                    style={{ width: '100%' }}
                    // optionFilterProp="children"
                    value={ManagementUnit}
                    onChange={this.sInstallationLocations}
                  >
                    {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                      <Option value={item.USER_GROUP_NAME} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
                  </Select>
                </div>
              </div>
              <div className={styles.mountingTd}><div><span>*</span>描述</div><div><Input name="Correlationdetail" onChange={this.changValue} value={Correlationdetail} /></div></div>
            </div>
            <div className={`${styles.mountingTr} ${styles.mountingTrx}`}>
              <div className={styles.mountingTd}>
                <div><span>*</span>选择路口</div>
                <div className={styles.boxtd}>
                  <Select
                    mode="multiple"
                    showSearch
                    optionFilterProp="children"
                    style={{ width: '100%' }}
                    value={dateListValues}
                    placeholder="请选择路口"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >{
                      OptionList && OptionList.map(item => <Option key={item.ID}>{item.UNIT_NAME}</Option>)
                    }
                  </Select>
                </div>
              </div>
              <div className={styles.mountingTd}>
                <div className={styles.fontstyle}>
                  <li> <b onClick={this.addList}>添加方向</b></li>
                </div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTdx}>路口名称</div>
              <div className={styles.mountingTdx}>操作</div>
            </div>
            <div className={styles.boxers} >
              {
                IntersectionList && IntersectionList.map(item => (
                  <div key={item.ID} className={styles.mountingTr}>
                    <div className={styles.mountingTdx}>{item.UNIT_NAME}</div>
                    <div className={styles.mountingTdx}><span onClick={() => this.delectIntersectionList(item.ID)}>移除</span></div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className={styles.mountingTableBottom}>
            <span onClick={this.handleCancel} className={styles.mountingTableBottom_right}>取消</span>
            <span className={styles.mountingTableBottom_left}>
              <b onClick={this.handleOk}>确定</b>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.managements,
  }
}
const mapDisPatchToProps = dispatch => ({
  getloadManageMent: bindActionCreators(getloadManageMent, dispatch),
  getvalidate: bindActionCreators(getvalidate, dispatch),
  getloadUnitName: bindActionCreators(getloadUnitName, dispatch),
  getsaveOrUpdateForm: bindActionCreators(getsaveOrUpdateForm, dispatch),
})
export default connect(mapStateToProps, mapDisPatchToProps)(ModalPage)
