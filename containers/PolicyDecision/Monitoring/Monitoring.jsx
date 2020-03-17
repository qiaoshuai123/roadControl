import React, { Component } from 'react'

import styles from './Monitoring.scss'
import Header from '../Header/Header'
import InterMonitor from './InterMonitor/InterMonitor'


class Monitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.monitorWrapper}>
        <Header {...this.props} />
        <div className={styles.container}>
          <InterMonitor />
        </div>
      </div>
    )
  }
}

export default Monitoring
