import React, { Component } from 'react'
import styles from './optimizeList.scss'


class OptimizeList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.mountingTable}>
        <div className={styles.mountingThead}>
          <div className={styles.mountingTh}>交叉口饱和度</div>
          <div className={styles.mountingTh}>交叉口服务水平</div>
          <div className={styles.mountingTh}>交叉口通行流量</div>
          <div className={styles.mountingTh}>实际通行能力</div>
        </div>
        <div className={styles.mountingTbody}>
          <div className={styles.mountingTr}>
            <div className={styles.mountingTd}>0.2</div>
            <div className={styles.mountingTd}>C</div>
            <div className={styles.mountingTd}>686</div>
            <div className={styles.mountingTd}>4207</div>
          </div>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>交叉口饱和度</div>
            <div className={styles.mountingTh}>交叉口服务水平</div>
            <div className={styles.mountingTh}>交叉口通行流量</div>
          </div>
          <div className={styles.mountingTr}>
            <div className={styles.mountingTd}>0.6</div>
            <div className={styles.mountingTd}>0.44</div>
            <div className={styles.mountingTd}>0.16</div>
          </div>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>交叉口饱和度</div>
            <div className={styles.mountingTh}>交叉口服务水平</div>
            <div className={styles.mountingTh}>交叉口通行流量</div>
          </div>
          <div className={styles.mountingTr}>
            <div className={styles.mountingTd}>7093</div>
            <div className={styles.mountingTd}>18000</div>
            <div className={styles.mountingTd}>0.3</div>
          </div>
        </div>
      </div>
    )
  }
}

export default OptimizeList
