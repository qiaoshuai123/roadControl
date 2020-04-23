import React, { Component } from 'react'
import { Pagination, Button, Input, Icon, Select } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Timing.scss'
import Header from '../Header/Header'
import TimingMessage from './TimingMessage/TimingMessage'
import { getLoadPlanTree, getInterList } from '../../../actions/data'
import { gettimgetTimingInfo } from '../../../actions/management'

class Timing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MaintenanceUnitList: [], // 所属区域
      roadList: [], // 所属路口
      TimingList: [], // 配时列表信息
      numShow: 0, // 展示对应的修改列表
    }
  }
  componentDidMount() {
    this.props.getLoadPlanTree()
    this.props.getInterList()
    this.props.gettimgetTimingInfo('curPage=1&districtId=0&keyword=0&pageSize=15&signalType=0&unitId=0')
  }
  componentDidUpdate(prevState) {
    const { loadPlanTree, interList, getTimingInfo } = this.props.data
    if (prevState.data.loadPlanTree !== loadPlanTree) {
      this.getPlanTree(loadPlanTree)
    }
    if (prevState.data.interList !== interList) {
      this.getinterList(interList)
    }
    if (prevState.data.getTimingInfo !== getTimingInfo) {
      this.getTimingInfo(getTimingInfo)
    }
  }
  getPlanTree = (loadPlanTree) => {
    this.setState({
      MaintenanceUnitList: loadPlanTree,
    })
  }
  getinterList = (interList) => {
    this.setState({
      roadList: interList,
    })
  }
  getTimingInfo = (getTimingInfo) => {
    this.setState({
      TimingList: getTimingInfo.list,
    })
  }
  // 改变关键字内容
  changeFont = (e) => {
    console.log(e.target.value)
  }
  // 改变所属区域内容
  changeRegion = () => {

  }
  // 改变路口内容
  changeIntersection = () => {

  }
  // 改变信号机控制系统内容
  changeSignal = () => {

  }
  // 点击查询
  btnSearth = () => {

  }
  // 点击分页器
  pageChange = (page, pageSize) => {

  }
  selectListroad = (id) => { // 使对应的列表展示
    this.setState({
      numShow: id,
    })
  }
  render() {
    const { Option } = Select
    const { MaintenanceUnitList, roadList, TimingList, numShow } = this.state
    console.log(TimingList)
    return (
      <div className={styles.timingWrapper}>
        <Header {...this.props} />
        <div className={styles.timingcontainer}>
          <h3>配时管理</h3>
          <div className={styles.searchBox}>
            <div><span>关键字</span><Input onChange={this.changeFont} placeholder="" /></div>
            <div><span>所属区域</span>
              <Select
                onChange={this.IssInstallationLocation}
              >
                {
                  MaintenanceUnitList && MaintenanceUnitList.map(item =>
                    <Option key={item.ID}>{item.NAME}</Option>)}
              </Select>
              {/* <Input onChange={this.changeRegion} placeholder="" /> */}
            </div>
            <div>
              <span>所属路口</span>
              <Select
                onChange={this.IssInstallationLocation}
              >
                {
                  roadList && roadList.map(item =>
                    <Option key={item.ID}>{item.UNIT_NAME}</Option>)}
              </Select>
            </div>
            <div>
              <span>信号机控制系统</span>
              <Select
                onChange={this.IssInstallationLocation}
              >
                {/* {
                  MaintenanceUnitList && MaintenanceUnitList.map(item =>
                    <Option value={item.ID} key={item.ID}>{item.CODE_NAME}</Option>)} */}
              </Select>
            </div>
            <div><Button onClick={this.btnSearth} type="primary">查询</Button></div>
          </div>
          <div className={styles.goExcal}>
            <span>统计结果</span><Button type="primary">导出表格</Button>
          </div>
          <div className={styles.mountingManage}>
            <div className={styles.mountingTable}>
              <div className={styles.mountingThead}>
                <div className={styles.mountingTh} />
                <div className={styles.mountingTh}>路口名称</div>
                <div className={styles.mountingTh}>所属区域</div>
                <div className={styles.mountingTh}>信号控制系统</div>
                <div className={styles.mountingTh}>方案数</div>
                <div className={styles.mountingTh}>当前方案</div>
                <div className={styles.mountingTh}>路口类型</div>
                <div className={styles.mountingTh}>管理单位</div>
                <div className={styles.mountingTh}>操作</div>
              </div>
              <div className={styles.mountingTbody}>
                {
                  TimingList && TimingList.map(item => (
                    <div key={item.ID}>
                      <div className={styles.mountingTr}>
                        <div className={styles.mountingTd}><span><Icon type="plus" /></span></div>
                        <div className={styles.mountingTd}>{item.UNIT_NAME}</div>
                        <div className={styles.mountingTd}>{item.DISTRICT_NAME}</div>
                        <div className={styles.mountingTd}>{item.SIGNALSYSTEMCODE}</div>
                        <div className={styles.mountingTd}>{item.CFGPLANSIZE}</div>
                        <div className={styles.mountingTd}>{item.PLAN_ID}</div>
                        <div className={styles.mountingTd}>{item.UNITTYPE}</div>
                        <div className={styles.mountingTd}>{item.USER_GROUP_NAME}</div>
                        <div className={styles.mountingTd}>
                          <span className={styles.deviceMsg} onClick={() => this.selectListroad(item.ID)}>申请方案</span>
                          <span className={styles.deviceMsg}>路口监视</span>
                        </div>
                      </div>
                      {numShow === item.ID &&
                        <div className={styles.mountingTrbox}>
                          <TimingMessage />
                        </div>
                      }
                    </div>))
                }

              </div>
            </div>
          </div>
          <div className={styles.paginationBox}>
            <Pagination size="small" onChange={this.pageChange} total={50} showQuickJumper />
            <span>共50条</span>
            <span>15条/页</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: { ...state.data, ...state.managements },
})
const mapDisPatchToProps = dispatch => ({
  getLoadPlanTree: bindActionCreators(getLoadPlanTree, dispatch),
  getInterList: bindActionCreators(getInterList, dispatch),
  gettimgetTimingInfo: bindActionCreators(gettimgetTimingInfo, dispatch),
})
export default connect(mapStateToProps, mapDisPatchToProps)(Timing)
