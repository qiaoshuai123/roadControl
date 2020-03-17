import React from 'react'
import { Icon, Checkbox } from 'antd'

import styles from './InterMonitor.scss'

function DropDownList(props) {
  const { handleClick, title, list, statusName, isShow } = props
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
    if (this.state.statusName) {
      this.setState({ statusName: null })
    } else {
      const statusName = e.currentTarget.getAttribute('statusname')
      this.setState({ statusName })
    }
  }
  render() {
    const { statusName } = this.state
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
            <div><span className={styles.upIconBox}><Icon type="up" /></span>海信系统<span><Checkbox defaultChecked /></span></div>
            <div><span className={styles.squareBox} />ATC系统<span><Checkbox defaultChecked /></span></div>
            <div><span className={styles.circleBox} />泰尔文特<span><Checkbox defaultChecked /></span></div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default InterMonitor
