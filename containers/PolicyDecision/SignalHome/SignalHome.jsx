import React, { Component } from 'react'

import Header from '../Header/Header'
import Form from './form/Form'
import EchartsPage from '../../../components/ecahrtsPage/EchartsPage'
import chartsData from './chartsOptions'
import styles from './Signahome.scss'

import InfoBg from './img/Infobg.png'

class SignalHome extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.fromlist = chartsData.fromlist
    this.echarts = chartsData.echartss
    this.marker = null
  }
  componentDidMount = () => {
    this.renderMineMap()
  }
  // 添加坐标点
  addMarker = () => {
    if (this.map) {
      const el = document.createElement('div')
      el.id = 'marker'
      // el.style['background-image'] = 'url(/api/static/demo/js-api/zh/images/park.png)'
      el.style['background-color'] = '#ff0000'
      el.style['background-size'] = 'cover'
      el.style.width = '20px'
      el.style.height = '20px'
      el.style['border-radius'] = '50%'
      this.lnglat = this.map.getCenter()
      this.marker = new window.minemap.Marker(el, { offset: [-25, -25] })
        .setLngLat(this.lnglat)
        .setPopup(this.showInterInfo())
        .addTo(this.map)
      // el.addEventListener('click', this.showInterInfo)
    }
  }
  // 删除坐标点
  delMarker = () => {
    if (this.map && this.marker) {
      this.marker.remove()
      this.marker = null
    }
  }
  // 更新坐标点
  updateMarkerPosition = () => {
    if (this.map && this.marker) {
      const lnglat = this.map.getCenter()
      this.marker.setLngLat([lnglat.lng + 0.01, lnglat.lat + 0.01])
    }
  }
  // 关闭自定义信息窗体
  removeInterInfo = () => {
    if (this.popup) {
      this.popup.remove()
      this.popup = null
    }
  }
  // 自定义信息窗体
  showInterInfo = () => {
    this.removeInterInfo()
    const lnglat = this.map.getCenter()
    const infoHtml = `
      <div style="width:480px;height:260px;background:url(${InfoBg}) center center no-repeat;background-size:100% 100%;">
        <div style="position:relative;height:50px;padding-top:13px;padding-left:20px;line-height:50px;font-size:15px;">
          路口名称 ：123456
          <span id="removeInterInfo" style="position:absolute;top:25px;right:25px;width:20px;height:20px;text-align:center;line-height:20px;font-size:16px;cursor:pointer;color:#49C2D5;">X</span>
        </div>
        <div style="height:200px;display:flex;padding-top:20px;font-size:14px;">
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:40px">所属城区 ：兴宁区</p>
            <p style="height:32px;line-height:32px;padding-left:40px">信号系统 ：海信</p>
            <p style="height:32px;line-height:32px;padding-left:40px">运行阶段 ：东西左转</p>
            <div style="width:80px;height:30px;margin:20px auto 0;background-color:#0F85FF;text-align:center;line-height:30px;border-radius:4px;">路口监控</div>
          </div>
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:20px">控制状态 ：本地多时段</p>
            <p style="height:32px;line-height:32px;padding-left:20px">信号机IP ：192.168.1.204</p>
            <p style="height:32px;line-height:32px;padding-left:20px">设备状态 ：正常</p>
            <div style="width:80px;height:30px;margin:20px auto 0;background-color:#0F85FF;text-align:center;line-height:30px;border-radius:4px;">路口优化</div>
          </div>
        </div>
      </div>
    `
    this.popup = new window.minemap.Popup({ closeOnClick: false, closeButton: false, offset: [-15, -25] })
      .setLngLat([lnglat.lng, lnglat.lat])
      .setHTML(infoHtml)
      .addTo(this.map)
    document.getElementById('removeInterInfo').addEventListener('click', this.removeInterInfo)
    return this.popup
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
    this.addMarker()
  }
  render() {
    return (
      <div className={styles.signalHomeBox} id="mapContainer">
        <Header {...this.props} />
        {/* <div className={styles.interInfo}>
          <div className={styles.titles}>
            路口名称：123456
            <span className={styles.close}><Icon type="close" /></span>
          </div>
        </div> */}
        <div className={styles.signaContainer_left}>
          <div className={styles.signaContainer_left_box}><Form {...this.fromlist.form1} /></div>
          <div className={styles.signaContainer_left_box}>
            <div className={styles.title}>实时信号控制状态</div>
            <div style={{ height: 'calc(100% - 40px)' }}>
              <EchartsPage {...this.echarts.echarts1} />
            </div>
          </div>
          <div className={styles.title}>信号机实时状态统计</div>
          <div className={`${styles.signaContainer_left_box} ${styles.signaContainer_left_boxer}`}>
            <div className={styles.signaContainerLB_left}>
              <div style={{ height: '245px' }}>
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
