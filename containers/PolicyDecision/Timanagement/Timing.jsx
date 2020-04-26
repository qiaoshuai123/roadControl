import React, { Component } from 'react'
import { Pagination, Button, Input, Icon, Select } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Timing.scss'
import Header from '../Header/Header'
import { getLoadPlanTree, getInterList } from '../../../actions/data'
import { gettimgetTimingInfo, gettimcode } from '../../../actions/management'

class Timing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MaintenanceUnitList: [], // 所属区域
      roadList: [], // 所属路口
      TimingList: [], // 配时列表信息
      IsnumShow: false, // 展示对应的修改列表
      pageNumber: {}, // 展示应有的数据
      codeList: [], // 信号机品牌列表
      nums: '',
    }
    this.changeFontValue = 0 // 改变关键字
    this.changeRegionValue = 0 // 改变所属区域
    this.changeIntctionValue = 0 // 改变路口口内容
    this.changeSignalValue = 0 // 改变信号控制系统
  }
  componentDidMount() {
    this.props.getLoadPlanTree()
    this.props.getInterList()
    this.props.gettimcode()
    this.props.gettimgetTimingInfo('curPage=1&districtId=0&keyword=0&pageSize=15&signalType=0&unitId=0')
  }
  componentDidUpdate(prevState) {
    const { loadPlanTree, interList, getTimingInfo, code } = this.props.data
    if (prevState.data.loadPlanTree !== loadPlanTree) {
      this.getPlanTree(loadPlanTree)
    }
    if (prevState.data.interList !== interList) {
      this.getinterList(interList)
    }
    if (prevState.data.getTimingInfo !== getTimingInfo) {
      this.getTimingInfo(getTimingInfo)
    }
    if (prevState.data.code !== code) {
      this.getcode(code)
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
      pageNumber: getTimingInfo.page,
    }, () => {
      this.setState({
        nums: 1,
      })
    })
  }
  getcode = (code) => {
    this.setState({
      codeList: code,
    })
  }
  // 改变关键字内容
  changeFont = (e) => {
    const values = e.target.value
    if (values === '') {
      this.changeFontValue = 0
    } else {
      this.changeFontValue = values
    }

  }
  // 改变所属区域内容
  changeRegion = (ID) => {
    this.changeRegionValue = ID
  }
  // 改变路口内容
  changeIntersection = (ID) => {
    this.changeIntctionValue = ID
  }
  // 改变信号机控制系统内容
  changeSignal = (ID) => {
    this.changeSignalValue = ID
  }
  // 点击查询
  btnSearth = () => {
    const { pageNumber } = this.state
    this.props.gettimgetTimingInfo(`curPage=${pageNumber.fromPage}&districtId=${this.changeRegionValue}&keyword=${this.changeFontValue}&pageSize=${pageNumber.pageSize}&signalType=${this.changeSignalValue}&unitId=${this.changeIntctionValue}`)
  }
  // 点击分页器
  pageChange = (page, pageSize) => {
    this.props.gettimgetTimingInfo(`curPage=${page}&districtId=0&keyword=0&pageSize=${pageSize}&signalType=0&unitId=0`)
  }
  pageSize = (page, pageSize) => {
    this.props.gettimgetTimingInfo(`curPage=${page}&districtId=0&keyword=0&pageSize=${pageSize}&signalType=0&unitId=0`)
  }
  selectListroad = (id) => { // 申请方案弹窗

  }
  crossingSee = (id) => { // 页面跳转到页面监视页面
    window.open(`#/interdetails/${id}`)
  }

  render() {
    const { Option } = Select
    const { MaintenanceUnitList, roadList, TimingList, IsnumShow, pageNumber, codeList, nums } = this.state
    console.log(pageNumber && pageNumber.fromPage, '显示内容')
    return (
      <div className={styles.timingWrapper}>
        <Header {...this.props} />
        <div className={styles.timingcontainer}>
          <h3>配时管理</h3>
          <div className={styles.searchBox}>
            <div><span>关键字</span><Input onChange={this.changeFont} placeholder="" /></div>
            <div><span>所属区域</span>
              <Select
                onChange={this.changeRegion}
              >
                <Option value={0} key="124ssswwwa">全部</Option>
                {
                  MaintenanceUnitList && MaintenanceUnitList.map(item =>
                    <Option value={item.ID} key={item.ID}>{item.NAME}</Option>)}
              </Select>
              {/* <Input onChange={this.changeRegion} placeholder="" /> */}
            </div>
            <div>
              <span>所属路口</span>
              <Select
                onChange={this.changeIntersection}
              >
                <Option value={0} key="124ssswwwas">全部</Option>
                {
                  roadList && roadList.map(item =>
                    <Option value={item.ID} key={item.ID}>{item.UNIT_NAME}</Option>)}
              </Select>
            </div>
            <div>
              <span>信号机控制系统</span>
              <Select
                onChange={this.changeSignal}
              >
                <Option value={0} key="124ssswwwad">全部</Option>
                {
                  codeList && codeList.map(item =>
                    <Option value={item.C_CODE} key={item.C_CODE}>{item.CODE_NAME}</Option>)}
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
                    <div key={item.ID} className={styles.mountingTr}>
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
                        <span className={styles.deviceMsg} onClick={() => this.crossingSee(item.ID)}>路口监视</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className={styles.paginationBox}>
            {
              pageNumber && <Pagination
                showSizeChanger
                showQuickJumper
                pageSizeOptions={['1', '10', '15']}
                onChange={this.pageChange}
                onShowSizeChange={this.pageSize}
                defaultCurrent={pageNumber && pageNumber.fromPage}
                defaultPageSize={15}
                size="small"
                total={(pageNumber && pageNumber.totalSize) || 1}
              />
            }
            <span>共{pageNumber && pageNumber.totalSize}条</span>
          </div>
        </div>
        {/* <ModalPage /> */}
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
  gettimcode: bindActionCreators(gettimcode, dispatch),
})
export default connect(mapStateToProps, mapDisPatchToProps)(Timing)
