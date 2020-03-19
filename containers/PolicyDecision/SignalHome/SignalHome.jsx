import React, { Component } from 'react'
import Header from '../Header/Header'

import Form from './form/Form'
import EchartsPage from '../../../components/ecahrtsPage/EchartsPage'
import chartsData from './chartsOptions'
import styles from './Signahome.scss'

class SignalHome extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.fromlist = chartsData.fromlist
    this.echarts = chartsData.echartss
  }
  componentDidMount = () => {
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
      <div className={styles.signalHomeBox} id="mapContainer">
        <Header {...this.props} />
        <div className={styles.signaContainer_left}>
          <div className={styles.signaContainer_left_box}><Form {...this.fromlist.form1} /></div>
          <div className={styles.signaContainer_left_box}>
            <div className={styles.title}>实时信号控制状态</div>
            <div style={{ height: 'calc(100% - 40px)' }}>
              <EchartsPage {...this.echarts.echarts1} />
            </div>
          </div>
          <div className={`${styles.signaContainer_left_box} ${styles.signaContainer_left_boxer}`}>
            <div className={styles.signaContainerLB_left}>
              <div className={styles.title}>信号机实时状态统计</div>
              <div style={{ height: 'calc(100% - 40px)' }}>
                <EchartsPage {...this.echarts.echarts2} />
              </div>
            </div>
            <div className={styles.signaContainerLB_right}>
              <dl>
                <dt><b className={styles.bone} /><li>ATC</li><li className={styles.lione}>在线2处</li></dt>
                <dd><b /><li className={styles.nums}>25%</li><li className={styles.lione}>离线0处</li></dd>
              </dl>
              <dl>
                <dt><b className={styles.btwo} /><li>ATC</li><li className={styles.litwo}>在线2处</li></dt>
                <dd><b /><li className={styles.nums}>25%</li><li className={styles.litwo}>离线0处</li></dd>
              </dl>
              <dl>
                <dt><b className={styles.bthr} /><li>ATC</li><li className={styles.lithr}>在线2处</li></dt>
                <dd><b /><li className={styles.nums}>25%</li><li className={styles.lithr}>离线0处</li></dd>
              </dl>
            </div>
          </div>
        </div>
        <div className={styles.signaContainer_center}>
          <div className={`${styles.road_show_item} ${styles.buling}`}>
            <div><span>全市</span><span>信号点位</span></div>
            <div>
              <span>2</span>
              <span>3</span>
              <span>0</span>
            </div><div>处</div>
          </div>
          <div className={`${styles.road_show_item} ${styles.buling}`}>
            <div><span>全市</span><span>信号点位</span></div>
            <div>
              <span>2</span>
              <span>3</span>
              <span>0</span>
            </div><div>处</div>
          </div>
          <div className={`${styles.road_show_item} ${styles.buling}`}>
            <div><span>海信</span><span>接入</span></div>
            <div>
              <span>2</span>
              <span>9</span>
              <span>0</span>
            </div><div>处</div>
          </div>
          <div className={`${styles.road_show_item} ${styles.buling}`}>
            <div><span>ATC</span><span>接入</span></div>
            <div>
              <span>2</span>
              <span>9</span>
              <span>0</span>
            </div><div>处</div>
          </div>
        </div>
        <div className={styles.signaContainer_right}>
          <div className={styles.signaContainer_left_box}><Form {...this.fromlist.form2} /></div>
          <div className={styles.signaContainer_left_box}><Form {...this.fromlist.form3} /></div>
          <div className={styles.signaContainer_left_box}>
            <div className={styles.title}>故障统计曲线图</div>
            <div style={{ height: 'calc(100% - 40px)' }}>
              <EchartsPage {...this.echarts.echarts3} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignalHome
