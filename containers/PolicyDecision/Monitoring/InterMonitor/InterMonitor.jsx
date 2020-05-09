import React from 'react'
import classNames from 'classnames'
import { Select, Icon, Checkbox, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './InterMonitor.scss'
import CustomInterTree from '_C/CustomInterTree/CustomInterTree'
import PieCharts from './PieCharts/PieCharts'

import { getLoadPlanTree, getLoadChildTree, getMonitorType, getGlobalMonitor } from '../../../../actions/data'

function DropDownList(props) {
  const { handleClick, title, list, statusName, isShow } = props
  return (
    <div className={styles.statusBox}>
      <p className={styles.statusTitle} statusname={statusName} onClick={handleClick} style={{ backgroundColor: isShow ? '#00A9C0' : 'transparent' }}>
        {title}
        <span className={styles.downIcon} style={{ transform: isShow ? 'rotate(180deg)' : 'rotate(0)' }}><Icon type="down" /></span>
      </p>
      <div className={styles.statusList} style={{ maxHeight: isShow ? '500px' : 0 }}>
        {
          list &&
          list.map((item) => {
            return (
              <div className={styles.statusItems} key={item.CODE_NAME}>
                <span>{item.CODE_NAME}</span>
                <span className={styles.statusCheck}><Checkbox code={item.C_CODE} defaultChecked /></span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

class InterMonitor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statusName: 'controlState',
      popName: null,
      interMonitorLeft: 15,
      interListLeft: 360,
      distuibutionLeft: 360,
      pointTypeRight: 10,
      interListHeight: 0,
      searchInterList: null,
      interModal: 'district',
      monitorTypes: null,
      stateMonitors: null,
      stateAnalysis: null,
    }
    this.statusList = [
      { name: '单点离线' },
      { name: '关灯控制' },
    ]
    this.singalTypes = [1, 3, 4]
    this.colorList = ['red', '#8E2801', '#B51A09', '#E59000', '#3DDC1E', '#24AFF5', '#1B7BDD', '#069A18', '#FE942A', '#091D83', '#9515F0', '#230EF1', '#fff']
  }
  componentDidMount = () => {
    this.props.getMonitorType()
    this.props.getGlobalMonitor()
    document.addEventListener('click', (e) => {
      if (e.target !== this.searchInputBox) {
        this.setState({ interListHeight: 0 })
      }
    })
  }
  componentDidUpdate = (prevState) => {
    const { globalUnitInfos, monitorTypes, stateAnalysis } = this.props.data
    if (prevState.data.globalUnitInfos !== globalUnitInfos) {
      this.getInterLists(globalUnitInfos)
    }
    if (prevState.data.monitorTypes !== monitorTypes) {
      this.getMonitorTypes(monitorTypes)
    }
    if (prevState.data.stateAnalysis !== stateAnalysis) {
      this.getSignalStateAnalys(stateAnalysis)
    }
    console.log(this.props)
  }
  getSignalStateAnalys = (stateAnalysis) => {
    console.log('stateAnalysis:::::::::', stateAnalysis)
    this.setState({ stateAnalysis })
  }
  // 监视状态
  getMonitorTypes = (monitorTypes) => {
    monitorTypes.controlType.forEach((item, index) => {
    item.bagColor = this.colorList[index]
 }) 
    this.setState({
      monitorTypes,
      stateMonitors: monitorTypes.controlType,
  })
  }
  // 路口列表
  getInterLists = (interList) => {
    this.searchInterList = interList
    this.setState({ searchInterList: interList })
  }
  // 从子集获取区域id和index 请求路口
  getSelectTreeId = (id) => {
    this.props.getLoadChildTree(id, '', this.interModal )
  }
  // 获取子id, 路口id
  getSelectChildId = (chidlId, lng, lat) => {
    const marker = document.getElementById('marker' + chidlId)
    if (marker) {
      marker.click()
      this.props.resetMapCenter(lng, lat)
    }
  }
  handleStatusDropDown = (e) => {
    const { monitorTypes } = this.state
    const statusName = e.currentTarget.getAttribute('statusname')
    const stateMonitors = statusName === 'controlState' ? monitorTypes.controlType :
      statusName === 'trafficState' ? monitorTypes.trafficType : monitorTypes.deviceType
    if (this.state.statusName && this.state.statusName === statusName) {
      this.setState({ statusName: null })
    } else {
      this.props.getGlobalMonitor(this.singalTypes.join(','), statusName)
      this.setState({ statusName, stateMonitors })
    }
  }
  handleShowInterOrPie = (e) => {
    const popName = e.currentTarget.getAttribute('popname')
    this.setState({ popName })
    this.props.getLoadPlanTree()
  }
  handleClosePop = () => {
    this.setState({ popName: null })
  }
  handleShowInterMonitor = () => {
    if (this.state.interMonitorLeft > 0) {
      this.setState({
        interMonitorLeft: -315,
        interListLeft: 30,
        distuibutionLeft: 30,
      })
    } else {
      this.setState({
        interMonitorLeft: 15,
        interListLeft: 360,
        distuibutionLeft: 360,
      })
    }
  }
  handleShowPointType = () => {
    if (this.state.pointTypeRight > 0) {
      this.setState({ pointTypeRight: -315 })
    } else {
      this.setState({ pointTypeRight: 10 })
    }
  }
  handleSearchInterFocus = () => {
    this.setState({ interListHeight: 300 })
  }
  hanleSelectInter = (e) => {
    const interId = e.target.getAttribute('interid')
    const marker = document.getElementById('marker' + interId)
    const lng = e.target.getAttribute('lng')
    const lat = e.target.getAttribute('lat')
    const interName = e.target.innerText
    if (marker) {
      this.props.resetMapCenter(lng, lat)
      marker.click()
      this.searchInputBox.value = interName
      this.setState({ interListHeight: 0 })
    } else {
      message.info('该路口尚未接入')
    }
  }
  handleSearchInputChange = (e) => {
    const { value } = e.target
    const searchInters = []
    if (this.searchTimer) {
      clearTimeout(this.searchTimer)
      this.searchTimer = null
    }
    this.searchTimer = setTimeout(() => {
      this.searchInterList.forEach((item) => {
        if (item.UNIT_NAME.indexOf(value) >= 0) {
          searchInters.push(item)
        }
      })
      this.setState({ searchInterList: searchInters })
    }, 200)
  }
  handleShowInterList = (interModal) => {
    this.interModal = interModal
    this.setState({ interModal })
    this.props.getLoadPlanTree('', '', interModal)
  }
  render() {
    const {
      statusName, popName, interMonitorLeft, interListLeft, pointTypeRight, distuibutionLeft, interListHeight, searchInterList, interModal,
      monitorTypes, stateMonitors, stateAnalysis,
    } = this.state
    const { Option } = Select
    return (
      <React.Fragment>
        <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
            { interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
          </span>
          <div className={styles.title}>路口监视功能</div>
          <div className={styles.interMsg}>
            <div className={styles.msgShow} popname="inter" onClick={this.handleShowInterOrPie}>
              <div className={styles.listIcon} />
              <p>系统路口列表</p>
            </div>
            <div className={styles.msgShow}>
              <div className={styles.analysisIcon} popname="pie" onClick={this.handleShowInterOrPie} />
              <p>整体运行分析</p>
            </div>
          </div>
          <div className={styles.title}>状态监视</div>
          <div className={styles.statusMsg}>
            {
              monitorTypes &&
              <React.Fragment>
                <DropDownList
                  title="控制状态监视"
                  list={monitorTypes.controlType}
                  handleClick={this.handleStatusDropDown}
                  statusName="controlState"
                  isShow={statusName === 'controlState'}
                />
                <DropDownList
                  title="交通状态监视"
                  list={monitorTypes.trafficType}
                  handleClick={this.handleStatusDropDown}
                  statusName="trafficState"
                  isShow={statusName === 'trafficState'}
                />
                <DropDownList
                  title="设备状态监视"
                  list={monitorTypes.deviceType}
                  handleClick={this.handleStatusDropDown}
                  statusName="alarmState"
                  isShow={statusName === 'alarmState'}
                />
              </React.Fragment>
            }
          </div>
        </div>
        <div className={styles.pointTypeBox} style={{ right: `${pointTypeRight}px` }}>
          <span className={styles.hideIcon} onClick={this.handleShowPointType}>
            { pointTypeRight > 0 ? <Icon type="forward" /> : <Icon type="backward" />}
          </span>
          <div className={styles.title}>系统点位分布类型</div>
          <div className={styles.systemPoint}>
            <div><span className={styles.upIconBox}><i /><b /></span>海信系统<span className={styles.checkeBox}><Checkbox defaultChecked /></span></div>
            <div><span className={styles.squareBox} />ATC系统<span className={styles.checkeBox}><Checkbox defaultChecked /></span></div>
            <div><span className={styles.circleBox} />泰尔文特<span className={styles.checkeBox}><Checkbox defaultChecked /></span></div>
          </div>
          <div className={styles.statusDetails}>
            {
              (stateMonitors && stateAnalysis) &&
              stateMonitors.map((item) => {
                const states = stateAnalysis.find(state => state.CONTROL_STATE === item.C_CODE)
                return (
                  <div className={styles.pointList} key={item.CODE_NAME + item.C_CODE}>
                    <span className={styles.circleColor} style={{ backgroundColor: `${item.bagColor}` }} />
                    <span className={styles.pointText}>{item.CODE_NAME}</span>
                    <span className={styles.pointNum}>{states ? states.CSIZE : 0}处</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        {
          popName === 'inter' &&
          <div className={styles.interListPop} style={{ left: `${interListLeft}px` }}>
            <div className={styles.title}>
              路口列表
              <span className={styles.popCloseBox} onClick={this.handleClosePop}><Icon type="close" /></span>
            </div>
            <div className={styles.interListBox}>
              <div className={styles.interSearch}>
                <span className={styles.searchBox}>
                  <input
                    className={styles.searchInput}
                    onClick={this.handleSearchInterFocus}
                    onChange={this.handleSearchInputChange}
                    type="text"
                    placeholder="请输入你要搜索的路口"
                    ref={(input) => { this.searchInputBox = input }}
                  />
                  <Icon className={styles.searchIcon} type="search" />
                </span>
              </div>
              <div className={styles.interList} style={{ maxHeight: `${interListHeight}px`, overflowY: 'auto' }}>
                <div>
                  {
                    searchInterList &&
                    searchInterList.map(item => (
                      <div
                        className={styles.interItem}
                        key={item.ID}
                        interid={item.ID}
                        lng={item.LONGITUDE}
                        lat={item.LATITUDE}
                        onClick={this.hanleSelectInter}
                      >{item.UNIT_NAME}
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className={styles.interAreaLineBox}>
              <div className={classNames({ [styles.areaLineBtn]: true, [styles.activeBtn]: interModal === 'district' })} onClick={() => { this.handleShowInterList('district') }}>行政区域</div>
              {
                interModal === 'district' &&
                <div className={styles.interTree}>
                  <CustomInterTree
                    {...this.props}
                    rightDownNone="true"
                    getSelectTreeId={this.getSelectTreeId}
                    getSelectChildId={this.getSelectChildId}
                  />
                </div>
              }
              <div className={classNames({ [styles.areaLineBtn]: true, [styles.activeBtn]: interModal === 'subDistrict' })} onClick={() => { this.handleShowInterList('subDistrict') }}>子区</div>
              {
                interModal === 'subDistrict' &&
                <div className={styles.interTree}>
                  <CustomInterTree
                    {...this.props}
                    rightDownNone="true"
                    getSelectTreeId={this.getSelectTreeId}
                    getSelectChildId={this.getSelectChildId}
                  />
                </div>
              }
              <div className={classNames({ [styles.areaLineBtn]: true, [styles.activeBtn]: interModal === 'route' })} onClick={() => { this.handleShowInterList('route') }}>线路</div>
              {
                interModal === 'route' &&
                <div className={styles.interTree}>
                  <CustomInterTree
                    {...this.props}
                    rightDownNone="true"
                    getSelectTreeId={this.getSelectTreeId}
                    getSelectChildId={this.getSelectChildId}
                  />
                </div>
              }
            </div>
          </div>
        }
        {
          popName === 'pie' &&
          <div className={styles.pieWrapper} style={{ left: `${distuibutionLeft}px` }}>
            <div className={styles.title}>
              路口列表
              <span className={styles.popCloseBox} onClick={this.handleClosePop}><Icon type="close" /></span>
            </div>
            <div className={styles.pieChartsBox}>
              <PieCharts />
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getLoadPlanTree: bindActionCreators(getLoadPlanTree, dispatch),
    getLoadChildTree: bindActionCreators(getLoadChildTree, dispatch),
    getMonitorType: bindActionCreators(getMonitorType, dispatch),
    getGlobalMonitor: bindActionCreators(getGlobalMonitor, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(InterMonitor)
