import React from 'react'
import { Input, Select, Radio } from 'antd'
import styles from './ModalPage.scss'

class ModalPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      SubordinateUnitLsit: [], // 所属单位列表
      MaintenanceUnitList: [], // 维护单位列表
      EquipmentModel: '', // 路口编号
      CorrelationNumber: 1, // 路口名称
      Manufacturer: '北京博研智通有限公司', // 控制路口数
      sInstallationLocation: '', // 所属单位
      MaintenanceUnit: '', // 信号控制系统对应路口编号
      MaintenancePhine: 110, // 维护电话
      datelist: [], // 点击添加列表
    }
    this.ShowName = []
    this.num = 1
  }
  componentDidMount = () => {
    // eslint-disable-next-line no-undef
  }
  inpvalue = () => {
    console.log(123456)
  }
  addList = () => { // 添加列表
    const { datelist } = this.state
    datelist.push(this.addLi(this.num))
    this.ShowName.push(this.addListName())
    this.setState({
      datelist,
    })
    this.num += 1
  }
  inpvalue = (e) => {
    console.log(e, 'sss')
  }
  handleCancel = () => {
    this.props.isShowModalPage()
  }
  addListName = () => {
    return {
      IntersectionDirection: '', // 路口方向
      FlowIntersection: '', // 流行路口
      FlowIntersectionDirection: '', // 流向路口方向
      RoadNameDescription: '', // 道路名称描述
    }
  }
  addLi = (num) => {
    return {
      id: num,
      InterDirection: [
        {
          id: 1,
          name: '北',
        },
        {
          id: 2,
          name: '东北',
        },
      ],
      FlowInter: [
        {
          id: 1,
          name: '北大华西',
        },
        {
          id: 2,
          name: '人民解放',
        },
      ],
      DirDirection: [
        {
          id: 1,
          name: '北大华西',
        },
        {
          id: 2,
          name: '人民解放',
        },
      ],
    }
  }
  delectList = (id) => { // 删除新建列表
    const { datelist } = this.state
    const filterList = datelist.filter(item => item.id !== id)
    this.setState({
      datelist: filterList,
    })
  }
  IntersectionDirections = (e, index) => { // 路口方向
    console.log(e, index, this.ShowName)
    this.ShowName[index].IntersectionDirection = e
  }
  FlowIntersections = (e, index) => { // 流行路口
    console.log(e, index, this.ShowName)
    this.ShowName[index].FlowIntersection = e
  }
  FlowIntersectionDirections = (e, index) => { // 流向路口方向
    console.log(e, index, this.ShowName)
    this.ShowName[index].FlowIntersectionDirection = e
  }
  RoadNameDescriptions = (e, index) => { // 道路名称描述
    console.log(e, index, this.ShowName)
    this.ShowName[index].RoadNameDescription = e
  }
  render() {
    const {
      SubordinateUnitLsit, MaintenanceUnitList, EquipmentModel,
      CorrelationNumber, Manufacturer,
      sInstallationLocation,
      MaintenanceUnit, MaintenancePhine, isshowSubmission, datelist,
    } = this.state
    const { Option } = Select
    return (
      <div className={styles.ModalPageWrapper}>
        <div className={styles.mountingTable}>
          <div className={styles.mountingTbody}>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div><span>*</span>路口编号</div><div><Input name="EquipmentModel" onChange={this.changValue} value={EquipmentModel} /></div></div>
              <div className={styles.mountingTd}><div><span>*</span>路口名称</div><div><Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} /></div></div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div><span>*</span>路口类型</div>
                <div>
                  <Select
                    style={{ width: '100%' }}
                    value={MaintenanceUnit || ''}
                    // optionFilterProp="children"
                    onChange={this.IssInstallationLocation}
                  >
                    {
                      MaintenanceUnitList && MaintenanceUnitList.map(item =>
                        <Option value={item.ID} key={item.ID}>{item.CODE_NAME}</Option>)}
                  </Select>
                </div>
              </div>
              <div className={styles.mountingTd}><div><span>*</span>所属区域</div>
                <div>
                  <Select
                    style={{ width: '100%' }}
                    value={MaintenanceUnit || ''}
                    // optionFilterProp="children"
                    onChange={this.IssInstallationLocation}
                  >
                    {
                      MaintenanceUnitList && MaintenanceUnitList.map(item =>
                        <Option value={item.ID} key={item.ID}>{item.CODE_NAME}</Option>)}
                  </Select>
                </div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div><span>*</span>是否多路口</div>
                <div>
                  <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
                    <Radio value={1}>否</Radio>
                    <Radio value={2}>是</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className={styles.mountingTd}><div><span>*</span>控制路口数</div><div><Input name="Manufacturer" onChange={this.changValue} value={Manufacturer} /></div></div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div>信号控制系统<br />对应路口编号</div>
                <div>
                  <Select
                    style={{ width: '100%' }}
                    value={MaintenanceUnit || ''}
                    // optionFilterProp="children"
                    onChange={this.IssInstallationLocation}
                  >
                    {
                      MaintenanceUnitList && MaintenanceUnitList.map(item =>
                        <Option value={item.ID} key={item.ID}>{item.CODE_NAME}</Option>)}
                  </Select>
                </div>
              </div>
              <div className={styles.mountingTd}><div>管理单位</div>
                <div>
                  <Select
                    style={{ width: '100%' }}
                    value={MaintenanceUnit || ''}
                    // optionFilterProp="children"
                    onChange={this.IssInstallationLocation}
                  >
                    {
                      MaintenanceUnitList && MaintenanceUnitList.map(item =>
                        <Option value={item.ID} key={item.ID}>{item.CODE_NAME}</Option>)}
                  </Select>
                </div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div><span>*</span>经度</div>
                <div>
                  <Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} />
                </div>
              </div>
              <div className={styles.mountingTd}><div><span>*</span>维度</div>
                <div>
                  <Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} />
                </div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div>信号控制系统</div>
                <div>
                  <Select
                    style={{ width: '100%' }}
                    value={sInstallationLocation || ''}
                    // optionFilterProp="children"
                    onChange={this.sInstallationLocations}
                  >
                    {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                      <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
                  </Select>
                </div>
              </div>
              <div className={styles.mountingTd}><div><span>*</span>信号机IP</div>
                <div>
                  <Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} />
                </div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div>信号机网关</div>
                <div>
                  <Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} />
                </div>
              </div>
              <div className={styles.mountingTd}><div>信号机子网掩码</div><div><Input name="MaintenancePhine" onChange={this.changValue} value={MaintenancePhine} /></div></div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div>信号机端口</div><div><Input name="MaintenancePhine" onChange={this.changValue} value={MaintenancePhine} /></div></div>
              <div className={styles.mountingTd}><div>信号机厂商</div><div><Input name="MaintenancePhine" onChange={this.changValue} value={MaintenancePhine} /></div></div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}><div>信号机型号</div>
                <div>
                  <Select
                    style={{ width: '100%' }}
                    value={sInstallationLocation || ''}
                    // optionFilterProp="children"
                    onChange={this.sInstallationLocations}
                  >
                    {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                      <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
                  </Select>
                </div>
              </div>
              <div className={styles.mountingTd}><div><span>*</span>信号机编号</div>
                <div>
                  <Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} />
                </div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>
                <div>指北针偏转角度</div>
                <div className={styles.angle}>
                  <Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} />
                </div>
              </div>
              <div className={styles.fontstyle}>
                (顺时针为正,逆时针为负)
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTdx}>路口方向</div>
              <div className={styles.mountingTdx}>流向路口</div>
              <div className={styles.mountingTdx}>流向路口方向</div>
              <div className={styles.mountingTdx}>道路名称描述</div>
              <div className={styles.mountingTdx}>操作</div>
            </div>
            <div className={styles.boxers}>
              {
                datelist && datelist.map((item, index) => {
                  return (
                    <div className={styles.boxerBox}>
                      <div>
                        <Select
                          style={{ width: '100%' }}
                          // optionFilterProp="children"
                          onChange={e => this.IntersectionDirections(e, index)}
                        >
                          {item.InterDirection.map(items =>
                            <Option value={items.name} key={items.id}>{items.name}</Option>)}
                        </Select>
                      </div>
                      <div>
                        <Select
                          showSearch
                          style={{ width: '100%' }}
                          onSearch={this.SearchList}
                          optionFilterProp="children"
                          // optionFilterProp="children"
                          onChange={e => this.FlowIntersections(e, index)}
                        >
                          {item.FlowInter.map(items =>
                            <Option value={items.name} key={items.id}>{items.name}</Option>)}
                        </Select>
                      </div>
                      <div>
                        <Select
                          style={{ width: '100%' }}
                          // optionFilterProp="children"
                          onChange={e => this.FlowIntersectionDirections(e, index)}
                        >
                          {item.DirDirection.map(items =>
                            <Option value={items.name} key={items.id}>{items.name}</Option>)}
                        </Select>
                      </div>
                      <div>
                        <Input name="CorrelationNumber" placeholder="道路名称" onChange={e => this.RoadNameDescriptions(e, index)} />
                      </div>
                      <div>
                        <span onClick={() => this.delectList(item.id)}>删除</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={styles.mountingTr}>
              <span onClick={this.addList}>添加方向</span>
            </div>
          </div>
          <div className={styles.mountingTableBottom}>
            <span onClick={this.handleCancel} className={styles.mountingTableBottom_right}>取消</span>
            <span onClick={this.handDelect} className={styles.mountingTableBottom_center}>删除</span>
            <span className={styles.mountingTableBottom_left}>
              {
                isshowSubmission ? <b onClick={this.handleOk}>提交</b> : <b onClick={this.changeOk}>修改</b>
              }
            </span>
          </div>
        </div>
      </div >
    )
  }
}

export default ModalPage
