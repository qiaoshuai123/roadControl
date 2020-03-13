import React from 'react'
import classNames from 'classnames'

import styles from './Nav.scss'

class EvaNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.navItems = [
      { name: '全局监控', path: '/signalhome' },
      { name: '特勤任务', path: '/specialTask' },
      { name: '协调监控', path: '/monitoring' },
    ]
    this.navItemsRight = [
      { name: '统计分析' },
      { name: '综合管理' },
      { name: '系统维护' },
    ]
  }
  componentDidMount = () => { }
  handClick = (paths) => {
    this.props.history.push(paths)
  }
  render() {
    return (
      <div className={styles.navWrapper}>
        <div className={styles.navLeft}>
          {
            this.navItems.map((item) => {
              return (
                <div onClick={() => this.handClick(item.path)} className={styles.navItem} key={item.name}>
                  <p className={classNames({ [styles.navName]: true, [styles.navActive]: this.props.location.pathname === item.path })}>{item.name}</p>
                  <p className={styles.navBg} />
                </div>
              )
            })
          }
        </div>
        <div className={styles.navCenter} />
        <div className={styles.navRight}>
          {
            this.navItemsRight.map((item) => {
              return (
                <div className={styles.navItem} key={item.name}>
                  <p className={classNames({ [styles.navName]: true, [styles.navActive]: this.props.location.pathname === item.path })}>{item.name}</p>
                  <p className={styles.navBg} />
                </div>
              )
            })
          }
        </div>

      </div>
    )
  }
}

export default EvaNav
