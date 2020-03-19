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
    this.renderMineMap()
  }
  // 初始化地图
  renderMineMap = () => {
    const map = new window.minemap.Map({
      container: 'mapContainer',
      style: '//minedata.cn/service/solu/style/id/2301',
      center: [106.709075, 26.586574],
      zoom: 14,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
    })
    this.map = map
  }
  render() {
    return (
      <div className={styles.monitorWrapper} id="mapContainer">
        <Header {...this.props} />
        <InterMonitor />
      </div>
    )
  }
}

export default Monitoring
