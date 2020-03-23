import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select, Icon } from 'antd'

import Header from '../Header/Header'
import Form from './form/Form'
import EchartsPage from '../../../components/ecahrtsPage/EchartsPage'
import chartsData from './chartsOptions'
import styles from './Signahome.scss'

import InfoBg from './img/Infobg.png'

import { getInterList, getControlRoads, getControlCount } from '../../../actions/data'

class SignalHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interList: null,
      interListHeight: 0,
      controlRoads: null,
      controlCounts: null,
    }
    this.fromlist = chartsData.fromlist
    this.echarts = chartsData.echartss
    this.marker = null
    this.infowindow = 0
  }
  componentDidMount = () => {
    this.renderMineMap()
    this.props.getInterList()
    this.props.getControlRoads()
    this.props.getControlCount()
  }
  componentDidUpdate = (prevState) => {
    console.log(this.props)
    const { interList, controlRoads, controlCounts } = this.props.data
    if (prevState.data.interList !== interList) {
      this.getInterList(interList)
    }
    if (prevState.data.controlRoads !== controlRoads) {
      this.getControlRoads(controlRoads)
    }
    if (prevState.data.controlCounts !== controlCounts) {
      this.getControlRoads(controlRoads)
    }
  }
  // 路口列表
  getInterList = (interList) => {
    this.setState({ interList })
  }
  // 手控路口
  getControlRoads = (controlRoads) => {
    this.setState({ controlRoads })
  }
  // 手控次数
  getControlCount = (controlCounts) => {
    this.setState({ controlCounts })
  }
  // 添加坐标点
  addMarker = () => {
    if (this.map) {
      this.infowindow += 1
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
    const id = `monitor${this.infowindow}`
    // <span id=${id} style="position:absolute;top:25px;right:25px;width:20px;height:20px;text-align:center;line-height:20px;font-size:16px;cursor:pointer;color:#49C2D5;">X</span>
    const infoHtml = `
      <div style="width:480px;height:260px;background:url(${InfoBg}) center center no-repeat;background-size:100% 100%;">
        <div style="position:relative;height:50px;padding-top:13px;padding-left:20px;line-height:50px;font-size:15px;">
          路口名称 ：123456
          
        </div>
        <div style="height:200px;display:flex;padding-top:20px;font-size:14px;">
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:40px">所属城区 ：兴宁区</p>
            <p style="height:32px;line-height:32px;padding-left:40px">信号系统 ：海信</p>
            <p style="height:32px;line-height:32px;padding-left:40px">运行阶段 ：东西左转</p>
            <div id="${id}" style="width:80px;height:30px;margin:20px auto 0;background-color:#0F85FF;text-align:center;line-height:30px;border-radius:4px;">路口监控</div>
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
    this.popup = new window.minemap.Popup({ closeOnClick: true, closeButton: false, offset: [-15, -25] })
      .setLngLat([lnglat.lng, lnglat.lat])
      .setHTML(infoHtml)
      .addTo(this.map)
    if (document.getElementById(id)) {
      document.getElementById(id).addEventListener('click', () => {
        console.log('信息窗体的路口监控')
        // window.open('#/interdetails')
      })
    }
    return this.popup
  }
  handleSearchInterFocus = () => {
    this.setState({ interListHeight: 300 })
  }
  handleSearchInterBlur = () => {
    this.setState({ interListHeight: 0 })
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
    const { Option } = Select
    const { interListHeight, interList } = this.state
    return (
      <div className={styles.signalHomeBox} id="mapContainer">
        <Header {...this.props} />
        <div className={styles.interListBox}>
          <div className={styles.interSearch}>
            <Select defaultValue="1">
              <Option key="1">请选择</Option>
              {
                interList &&
                interList.map(item => (
                  <Option key={item.ID} value={item.UNIT_NAME} title={item.UNIT_NAME}>{item.UNIT_NAME}</Option>
                ))
              }
            </Select>
            <span className={styles.searchBox}>
              <input className={styles.searchInput} onFocus={this.handleSearchInterFocus} onBlur={this.handleSearchInterBlur} type="text" placeholder="请输入你要搜索的内容" />
              <Icon className={styles.searchIcon} type="search" />
            </span>
          </div>
          <div className={styles.interList} style={{ maxHeight: `${interListHeight}px` }}>
            <div>
              <div className={styles.interItem}>路口抿成</div>
              <div className={styles.interItem}>路口抿成</div>
              <div className={styles.interItem}>路口抿成</div>
            </div>
          </div>
        </div>
        <div className={styles.interSysBox}>
          <div style={{ color: '#08FBED' }}>系统点位分布类型：</div>
          <div className={styles.systemPoint}>
            <div><span className={styles.upIconBox}><i /><b /></span>海信系统</div>
            <div><span className={styles.squareBox} />ATC系统</div>
            <div><span className={styles.circleBox} />泰尔文特</div>
          </div>
        </div>
        <div className={styles.signaContainer_left}>
          <div className={styles.signaContainer_left_box}>
            {
              this.state.controlRoads &&
              <Form name="最新手控路口TOP15" headOne="区域" headTwo="路口名称" headTre="最新控制时间" datas={this.state.controlRoads} />
            }
          </div>
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

const mapStateToProps = (state) => {
  return {
    data: state.data,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getInterList: bindActionCreators(getInterList, dispatch),
    getControlRoads: bindActionCreators(getControlRoads, dispatch),
    getControlCount: bindActionCreators(getControlCount, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(SignalHome)
