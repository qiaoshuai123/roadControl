import React, { Component } from 'react'
import { Icon, Input } from 'antd'
import styles from './SecretTask.scss'
import Header from '../Header/Header'
import CustomTree from './CustomTree/CustomTree'

class SecretTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interMonitorLeft: 15,
    }
  }
  componentDidMount() {
  }
  handleShowInterMonitor = () => {
    if (this.state.interMonitorLeft > 0) {
      this.setState({
        interMonitorLeft: -355,
      })
    } else {
      this.setState({
        interMonitorLeft: 15,
      })
    }
  }
  render() {
    const { interMonitorLeft } = this.state
    const { Search } = Input
    return (
      <div className={styles.secretTaskWrapper}>
        <Header {...this.props} />
        <div className={styles.secretTaskContainer}>
          <div className={styles.interMonitorBox} style={{ left: `${interMonitorLeft}px` }}>
            <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
              {interMonitorLeft > 0 ? <Icon type="backward" /> : <Icon type="forward" />}
            </span>
            <div className={styles.title}>勤务路线查询</div>
            <div className={styles.searchBox}>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: '100%' }}
              />
            </div>
            <div className={styles.OptimizingBtns}><span>优化控制管理</span></div>
            <div className={styles.addtask}>
              <span>快速特勤任务</span>
            </div>
            <div className={styles.treeBox}>
              <CustomTree />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SecretTask
