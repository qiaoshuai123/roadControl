import React from 'react'
import classNames from 'classnames'

import styles from './Nav.scss'

class EvaNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.navItems = [
      { name: '全局监控' },
      { name: '特勤任务' },
      { name: '协调监控' },
    ]
    this.navItemsRight=[
      { name: '统计分析' },
      { name: '综合管理' },
      { name: '系统维护' },
    ]
  }
  componentDidMount = () => { }
  render() {
    return (
      <div className={styles.navWrapper}>
        <div className={styles.navLeft}>
          {
            this.navItems.map((item) => {
              return (
                <div className={styles.navItem} key={item.name}>
                  <p className={classNames({ [styles.navName]: true, [styles.navActive]: this.props.location.pathname === item.path })}>{item.name}</p>
                  <p className={styles.navBg} />
                </div>
              )
            })
          }
        </div>
        <div className={styles.navCenter}> </div>
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
