import React from 'react'
import { message } from 'antd'
import styles from './Entrance.scss'

import getResponseData from '../../utils/getResponseData'

class Entrance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickCount: 0,
      animateEntrance: false, // 切换入口主页样式
    }
    this.F = { top: '350px', left: '430px', transform: 'scale(1.4)' }
    this.L = { top: '100px', left: '-60px', transform: 'scale(1)' }
    this.B = { top: '-70px', left: '430px', transform: 'scale(1)' }
    this.R = { top: '100px', left: '905px', transform: 'scale(1)' }
    this.modalItems = [
      { name: '交通管控优化决策', path: '#/signalhome', clsname: 'signalHome' },
      { name: '交通管控优化评价', path: '#/inter', clsname: 'inter' },
      { name: '交通信号仿真平台', path: '', clsname: 'TrafficSystem' },
      { name: '系统运行管理', path: '#/TrafficSystem', clsname: 'sysManage' },
    ]
    this.logoutUrl = '/simulation/sys/user/logout'
  }
  componentDidMount = () => { }
  handleMoveLeft = () => {
    const clickCount = this.state.clickCount === 4 ? 1 : this.state.clickCount += 1
    this.setState({ clickCount })
  }
  handleMoveRight = () => {
    const clickCount = this.state.clickCount === 0 ? 3 : this.state.clickCount -= 1
    this.setState({ clickCount })
  }
  handleGoSystem = (e) => {
    const path = e.currentTarget.getAttribute('sysname')
    if (path) {
      window.open(path)
    } else {
      window.open('http://10.11.57.101:20206/simWeb/#/entrances')
    }
  }
  handleLogout = () => {
    getResponseData('post', this.logoutUrl).then((res) => {
      const { code, msg } = res.data
      if (code === 0) {
        localStorage.clear()
        this.props.history.push('/login')
      } else {
        message.warning(msg)
      }
    })
  }
  render() {
    const { clickCount, animateEntrance } = this.state
    return (
      <React.Fragment>
        {
          animateEntrance ?
            <div className={styles.entranceWrapper}>
              <div className={styles.logout} onClick={this.handleLogout}>退出登录</div>
              <div className={styles.boolLight}>
                <div
                  className={styles.F}
                  style={clickCount === 1 ? this.L : clickCount === 2 ? this.B : clickCount === 3 ? this.R : this.F}
                  sysname="#/signalhome"
                  onClick={this.handleGoSystem}
                />
                <div
                  className={styles.L}
                  style={clickCount === 1 ? this.B : clickCount === 2 ? this.R : clickCount === 3 ? this.F : this.L}
                  sysname="#/TrafficSystem"
                  onClick={this.handleGoSystem}
                />
                <div
                  className={styles.B}
                  style={clickCount === 1 ? this.R : clickCount === 2 ? this.F : clickCount === 3 ? this.L : this.B}
                  onClick={this.handleGoSystem}
                />
                <div
                  className={styles.R}
                  style={clickCount === 1 ? this.F : clickCount === 2 ? this.L : clickCount === 3 ? this.B : this.R}
                  sysname="#/inter"
                  onClick={this.handleGoSystem}
                />
                <span className={styles.moveLeft} onClick={this.handleMoveLeft} />
                <span className={styles.moveRight} onClick={this.handleMoveRight} />
              </div>
            </div> :
            <div className={styles.staticEntrance}>
              <div className={styles.logout} onClick={this.handleLogout}>退出登录</div>
              {
                this.modalItems.map(item => (
                  <div className={styles.modalItemBox} sysname={item.path} onClick={this.handleGoSystem}>
                    <div className={styles[item.clsname]} />
                    <p>{item.name}</p>
                  </div>
                ))
              }
            </div>
        }
      </React.Fragment>
    )
  }
}

export default Entrance
