import React from 'react'
import { Select, Icon, Checkbox } from 'antd'

import styles from './InterMonitor.scss'
import CustomTree from '../../../../components/CustomTree/CustomTree'

function DropDownList(props) {
  const { handleClick, title, list, statusName, isShow } = props
  console.log(statusName, isShow)
  return (
    <div className={styles.statusBox}>
      <p className={styles.statusTitle} statusname={statusName} onClick={handleClick} style={{ backgroundColor: isShow ? '#00A9C0' : 'transparent' }}>
        {title}
        <span className={styles.downIcon} style={{ transform: isShow ? 'rotate(180deg)' : 'rotate(0)' }}><Icon type="down" /></span>
      </p>
      <div className={styles.statusList} style={{ maxHeight: isShow ? '300px' : 0 }}>
        {
          list &&
          list.map((item) => {
            return (
              <div className={styles.statusItems} key={item.name}>
                <span>{item.name}</span>
                <span className={styles.statusCheck}><Checkbox defaultChecked /></span>
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
      statusName: null,
    }
    this.statusList = [
      { name: '单点离线' },
      { name: '关灯控制' },
    ]
  }
  componentDidMount = () => {}
  handleStatusDropDown = (e) => {
    const statusName = e.currentTarget.getAttribute('statusname')
    console.log('当前的判断：：：：')
    console.log(this.state.statusName && this.state.statusName === statusName)
    if (this.state.statusName && this.state.statusMsg === statusName) {
      this.setState({ statusName: null })
      console.log('应该收起来')
    } else {
      this.setState({ statusName })
    }
  }
  render() {
    const { statusName } = this.state
    const { Option } = Select
    return (
      <React.Fragment>
        <div className={styles.interMonitorBox}>
          <span className={styles.hideIcon}><Icon type="backward" /></span>
          <div className={styles.title}>路口监视功能</div>
          <div className={styles.interMsg}>
            <div className={styles.msgShow}>
              <div className={styles.listIcon} />
              <p>系统路口列表</p>
            </div>
            <div className={styles.msgShow}>
              <div className={styles.analysisIcon} />
              <p>整体运行分析</p>
            </div>
          </div>
          <div className={styles.title}>状态监视</div>
          <div className={styles.statusMsg}>
            <DropDownList
              title="控制状态监视"
              list={this.statusList}
              handleClick={this.handleStatusDropDown}
              statusName="control"
              isShow={statusName === 'control'}
            />
            <DropDownList
              title="交通状态监视"
              handleClick={this.handleStatusDropDown}
              statusName="traffic"
              isShow={statusName === 'traffic'}
            />
            <DropDownList
              title="设备状态监视"
              handleClick={this.handleStatusDropDown}
              statusName="device"
              isShow={statusName === 'device'}
            />
          </div>
        </div>
        <div className={styles.pointTypeBox}>
          <div className={styles.title}>系统点位分布类型</div>
          <div className={styles.systemPoint}>
            <div><span className={styles.upIconBox}><i /><b /></span>海信系统<span className={styles.checkeBox}><Checkbox defaultChecked /></span></div>
            <div><span className={styles.squareBox} />ATC系统<span className={styles.checkeBox}><Checkbox defaultChecked /></span></div>
            <div><span className={styles.circleBox} />泰尔文特<span className={styles.checkeBox}><Checkbox defaultChecked /></span></div>
          </div>
          <div className={styles.statusDetails}>
            <div className={styles.pointList}>
              <span className={styles.circleColor} />
              <span className={styles.pointText}>单点离线</span>
              <span className={styles.pointNum}>104处</span>
            </div>
            <div className={styles.pointList}>
              <span className={styles.circleColor} />
              <span className={styles.pointText}>单点离线</span>
              <span className={styles.pointNum}>104处</span>
            </div>
          </div>
        </div>
        <div className={styles.interListPop}>
          <div className={styles.title}>
            路口列表
            <span className={styles.popCloseBox}><Icon type="close" /></span>
          </div>
          <div className={styles.interTreeBox}>
            <div className={styles.interSearch}>
              <Select defaultValue="1">
                <Option key="1">贵阳市</Option>
                <Option key="2">南阳市</Option>
              </Select>
              <span className={styles.searchBox}>
                <input className={styles.searchInput} type="text" placeholder="请输入你要搜索的内容" />
                <Icon className={styles.searchIcon} type="search" />
              </span>
            </div>
            <div className={styles.interTree}>
              <CustomTree />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default InterMonitor
