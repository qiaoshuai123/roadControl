import React from 'react'
import { Icon } from 'antd'

import styles from './Login.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {

  }
  render() {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginBox}>
          <h1 className={styles.loginTitle}>道路运行管控系统</h1>
          <div className={styles.usermsgBox}>
            <div className={styles.welcome} />
            <div className={styles.userInput}>
              <div className={styles.userMsg}>
                <span><Icon type="user" /></span>
                <input type="text"/>
              </div>
              <div className={styles.userMsg}>
                <span><Icon type="lock" theme="filled" /></span>
                <input type="text"/>
              </div>
              <div className={styles.loginBtn}>登录</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
