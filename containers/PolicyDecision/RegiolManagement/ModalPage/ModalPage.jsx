import React from 'react'
import { Input, Select } from 'antd'
import styles from './ModalPage.scss'

class ModalPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      EquipmentModel: '', // 路口编号
      CorrelationNumber: 1, // 路口名称
      IntersectionList: [], // 添加路口列表
      dateListValues: [], // 路口列表
    }
    this.isShow = []
    this.num = 1
  }
  componentDidMount = () => {
    // eslint-disable-next-line no-undef
  }
  inpvalue = (e) => {
    console.log(e, 'sss')
  }
  handleCancel = () => {
    this.props.isShowModalPage()
  }
  handleChange = (value) => {
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
  delectIntersectionList = (num) => {
    const { IntersectionList } = this.state
    IntersectionList.splice(num, 1)
    console.log(num, IntersectionList, 'ss')
    this.setState({
      IntersectionList,
    })
  }
  render() {
    const {
      EquipmentModel, CorrelationNumber, IntersectionList, dateListValues,
    } = this.state
    const { Option } = Select
    return (
      <div className={styles.ModalPageWrapper}>
        <div className={styles.mountingTable}>
          <div className={styles.mountingTbody}>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div><span>*</span>区域编号</div><div><Input name="EquipmentModel" onChange={this.changValue} value={EquipmentModel} /></div></div>
              <div className={styles.mountingTd}><div><span>*</span>区域名称</div><div><Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} /></div></div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div><span>*</span>管理单位</div><div><Input name="EquipmentModel" onChange={this.changValue} value={EquipmentModel} /></div></div>
              <div className={styles.mountingTd}><div><span>*</span>描述</div><div><Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} /></div></div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>
                <div>指北针偏转角度</div>
                <div className={styles.angle}>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    value={dateListValues}
                    placeholder="Please select"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                  >
                    <Option key="选择1">选择1</Option>
                    <Option key="选择2">选择2</Option>
                    <Option key="选择3">选择3</Option>
                  </Select>
                </div>
              </div>
              <div className={styles.fontstyle}>
                <span onClick={this.addList}>添加方向</span>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTdx}>路口名称</div>
              <div className={styles.mountingTdx}>操作</div>
            </div>
            <div className={styles.boxers} >
              {
                IntersectionList && IntersectionList.map((item, index) => (
                  <div key={index} className={styles.mountingTr}>
                    <div className={styles.mountingTdx}>{item}</div>
                    <div className={styles.mountingTdx}><span onClick={() => this.delectIntersectionList(index)}>移除</span></div>
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

export default ModalPage
