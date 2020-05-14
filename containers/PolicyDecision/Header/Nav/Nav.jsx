import React from 'react'
import classNames from 'classnames'

import styles from './Nav.scss'

class EvaNav extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.navItems = [
      { name: '首页', path: '/signalhome' },
      { name: '全局监控', path: '/monitoring' },
      // { name: '特勤任务', path: '/secretTask' },
      { name: '绿波监视', path: '/surveillance' },
    ]
    this.navItemsRight = [
      {
        name: '信号优化',
        path: '/optimize',
        children: [
          { name: '路口优化', path: '/optimize' },
          { name: '区域优化', path: '/areaOptimize' },
        ],
      },
      {
        name: '综合管理',
        path: '/InterManagement',
        children: [
          { name: '路口管理', path: '/InterManagement' },
          { name: '子区管理', path: '/RegiolManagementChild' },
          { name: '区域管理', path: '/RegiolManagement' },
          { name: '配时管理', path: '/timanagement' },
        ],
      },
    ]
    this.childItems = [
      { name: '首页', path: '/signalhome' },
      { name: '全局监控', path: '/globalmonitor' },
      { name: '路口优化', path: '/optimize' },
      { name: '配时管理', path: '/timanagement' },
    ]
  }
  componentDidMount = () => { }
  handGosystem = (e) => {
    const paths = e.target.getAttribute('path')
    this.props.history.push(paths)
  }
  handleShowDefaultNav = (item) => {
    if (item.children) {
      const child = item.children.filter(items => items.path === this.props.location.pathname)
      if (child.length > 0) {
        return child[0]
      }
      return null
    }
    return null
  }
  handleNavMouseEnter = (e, item) => {
    if (item.children) {
      const innerBox = e.currentTarget.lastElementChild
      innerBox.style.height = item.children.length * 28 + 'px'
    }
  }
  handleNavMouseLeave = (e) => {
    const innerBox = e.currentTarget.lastElementChild
    innerBox.style.height = 0
  }
  render() {
    const { pathname } = this.props.location
    return (
      <div className={styles.navWrapper}>
        <div className={styles.navLeft}>
          {
            this.navItems.map((item) => {
              const child = this.handleShowDefaultNav(item)
              return (
                <div
                  className={styles.navItem}
                  key={item.name}
                  onMouseEnter={(e) => { this.handleNavMouseEnter(e, item) }}
                  onMouseLeave={this.handleNavMouseLeave}
                >
                  <p className={styles.navBg} />
                  <p
                    className={classNames({ [styles.navName]: true, [styles.navActive]: child ? pathname === child.path : pathname === item.path })}
                    path={child ? child.path : item.path}
                    onClick={this.handGosystem}
                  >
                    {child ? child.name : item.name}
                  </p>
                  <div className={styles.innerItemBox}>
                    {
                      item.children &&
                      item.children.map(items => <div className={styles.innerItem} onClick={this.handGosystem} key={items.name + items.path} path={items.path}>{items.name}</div>)
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={styles.navCenter} />
        <div className={styles.navRight}>
          {
            this.navItemsRight.map((item) => {
              const child = this.handleShowDefaultNav(item)
              return (
                <div
                  className={styles.navItem}
                  key={item.name}
                  onMouseEnter={(e) => { this.handleNavMouseEnter(e, item) }}
                  onMouseLeave={this.handleNavMouseLeave}
                >
                  <p className={styles.navBg} />
                  {/* <p className={classNames({ [styles.navName]: true, [styles.navActive]: this.props.location.pathname === item.path })}>{item.name}</p> */}
                  <p
                    className={classNames({ [styles.navName]: true, [styles.navActive]: child ? pathname === child.path : pathname === item.path })}
                    path={child ? child.path : item.path}
                    onClick={this.handGosystem}
                  >
                    {child ? child.name : item.name}
                  </p>
                  <div className={styles.innerItemBox}>
                    {
                      item.children &&
                      item.children.map(items => <div className={styles.innerItem} onClick={this.handGosystem} key={items.name + items.path} path={items.path}>{items.name}</div>)
                    }
                  </div>
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
