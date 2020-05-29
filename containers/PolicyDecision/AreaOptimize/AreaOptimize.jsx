import React from 'react'
import { Select, Icon, Switch } from 'antd'
import styles from './AreaOptimize.scss'
import Header from '../Header/Header'
import { getInterDataTree, getInterListRefresh, getAreaAvgDelayTime, getAreaAvgSpeed, getRdchlList, } from '../../../actions/management'
import CustomTree from '../../../components/CustomTree/CustomTree'
import EchartsPage from '../../../components/ecahrtsPage/EchartsPage'
import echartss from './chartsOptions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Intersection from './IntersectionList/Intersection'
import AreaConfig from './AreaConfig/AreaConfig'
import InfoBg from './img/Infobg.png'
import RegularCrossing from './img/01.png'
import KeyIntersection from './img/02.png'

class AreaOptimize extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
      showConfig: false,
      interTree: null,
      expendskey: [],
      Listofintersections: [],
      isBtnShow: true,
    }
    this.echarts = echartss
    this.btnList = [
      {
        id: 1,
        name: '区域平均延误',
      },
      {
        id: 2,
        name: '区域平均车速',
      },
    ]
    this.marker = null
    this.infowindow = 0
    this.dir = 1
  }

  componentDidMount = () => {
    this.renderMineMap()
    this.props.getInterDataTree()
  }
  componentDidUpdate = (prevState) => {
    const { InterListRefresh, InterDataTree, AreaAvgDelayTime, AreaAvgSpeed, RdchlList } = this.props.data
    if (prevState.data.InterListRefresh !== InterListRefresh) {
      this.getsInterListRefresh(InterListRefresh)
    }
    if (prevState.data.InterDataTree !== InterDataTree) {
      this.getsInterDataTree(InterDataTree)
    }
    if (prevState.data.AreaAvgDelayTime !== AreaAvgDelayTime) {
      this.getsAreaAvgDelayTime(AreaAvgDelayTime)
    }
    if (prevState.data.AreaAvgSpeed !== AreaAvgSpeed) {
      this.getsAreaAvgSpeed(AreaAvgSpeed)
    }
    if (prevState.data.RdchlList !== RdchlList) {
      this.getsRdchlList(RdchlList)
    }
  }
  onChange = (e) => { // 协调方向切换
    this.setState({
      isBtnShow: e,
    })
  }
  getsRdchlList = (RdchlList) => {
  }
  getsAreaAvgSpeed = (AreaAvgSpeed) => {
  }
  getsAreaAvgDelayTime = (AreaAvgDelayTime) => {
  }
  getsInterDataTree = (InterDataTree) => {
    const { code, data, firstAdcode, firstCtlregionId, firstRdchlId } = InterDataTree
    const expendskey = [firstAdcode, firstCtlregionId]
    this.firstAdcode = firstAdcode
    this.firstCtlregionId = firstCtlregionId
    if (code === '1') {
      this.setState({ interTree: data, expendskey })
      const obj = `dir=${this.dir}&evlregion_id=${firstAdcode}&rdchl_id=${firstRdchlId}`
      this.props.getInterListRefresh(obj)
      this.props.getAreaAvgDelayTime(firstAdcode)
      this.props.getRdchlList(firstAdcode)
    }
  }
  getsInterListRefresh = (InterListRefresh) => { // 数据展示
    console.log(InterListRefresh, 'ssff')
    this.setState({
      Listofintersections: InterListRefresh,
    })
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
    const id = `removeInterInfo${this.infowindow}`
    const infoHtml = `
      <div style="width:480px;height:260px;background:url(${InfoBg}) center center no-repeat;background-size:100% 100%;">
        <div style="position:relative;height:50px;padding-top:13px;padding-left:20px;line-height:50px;font-size:15px;">
          路口名称 ：123456
          <span id=${id} style="position:absolute;top:25px;right:25px;width:20px;height:20px;text-align:center;line-height:20px;font-size:16px;cursor:pointer;color:#49C2D5;">X</span>
        </div>
        <div style="height:200px;display:flex;padding-top:20px;font-size:14px;">
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:40px">所属城区 ：兴宁区</p>
            <p style="height:32px;line-height:32px;padding-left:40px">信号系统 ：海信</p>
            <p style="height:32px;line-height:32px;padding-left:40px">运行阶段 ：东西左转</p>
            <div style="width:80px;height:30px;margin:20px auto 0;background-color:#0F85FF;text-align:center;line-height:30px;border-radius:4px; cursor: pointer;">路口监控</div>
          </div>
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:20px">控制状态 ：本地多时段</p>
            <p style="height:32px;line-height:32px;padding-left:20px">信号机IP ：192.168.1.204</p>
            <p style="height:32px;line-height:32px;padding-left:20px">设备状态 ：正常</p>
            <div style="width:80px;height:30px;margin:20px auto 0;background-color:#0F85FF;text-align:center;line-height:30px;border-radius:4px; cursor: pointer;">路口优化</div>
          </div>
        </div>
      </div>
    `
    this.popup = new window.minemap.Popup({ closeOnClick: true, closeButton: false, offset: [-15, -25] })
      .setLngLat([lnglat.lng, lnglat.lat])
      .setHTML(infoHtml)
      .addTo(this.map)
    document.getElementById(id).addEventListener('click', this.removeInterInfo)
    return this.popup
  }
  btnRegion = (id) => { // 切点击区域
    this.setState({
      num: id,
    })
    if (id === 1) {
      this.props.getAreaAvgDelayTime(this.firstAdcode)
    } else {
      this.props.getAreaAvgSpeed(this.firstAdcode)
    }
  }
  closepage = () => { // 关闭当前页面
    this.setState({
      showConfig: false,
    })
  }
  handleShowConfig = () => {
    this.setState({ showConfig: true })
  }
  // 初始化地图
  renderMineMap = () => {
    const map = new window.minemap.Map({
      container: 'mapContainer',
      // style: '//10.11.57.105:60050/service/solu/style/id/4636',
      style: '//221.13.10.30:22191/service/solu/style/id/2301',
      center: [106.713906, 26.59579],
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
    const { num, showConfig, Listofintersections, isBtnShow } = this.state
    return (
      <div className={styles.areaOptWrapper} id="mapContainer">
        <Header {...this.props} />
        {
          showConfig &&
          <AreaConfig closepage={this.closepage} />
        }
        <div className={styles.areaOptContainer}>
          <div className={styles.interTreeBox}>
            <div className={styles.interSearch}>
              <Select defaultValue="1">
                <Option key="1">贵阳市</Option>
                <Option key="2">南阳市</Option>
              </Select>
              <span className={styles.searchBox}>
                <input className={styles.searchInput} type="text" placeholder="请输入你要搜索的内容" />
                <Icon className={styles.searchIcon} type="search" />
              </span>
            </div>
            <div className={styles.interTree}>
              {
                this.state.interTree &&
                <CustomTree treeData={this.state.interTree} keys={this.state.expendskey} />
              }
            </div>
          </div>
          <ul className={styles.signaContainer_center}>
            <li>
              <span>协调路线：</span>
              <Select style={{ width: '58%' }} defaultValue="1">
                <Option key="1">贵阳市</Option>
                <Option key="2">南阳市</Option>
              </Select>
            </li>
            <li>
              <span>协调方向切换：</span>
              <Switch defaultChecked onChange={this.onChange} />
            </li>
            <li>
              <span>干线长度：</span>
              <span>567</span>
            </li>
            <li className={styles.lis}>
              <dl>
                <dt><span><img src={KeyIntersection} alt="" /></span></dt>
                <dd>关键路口</dd>
              </dl>
              <dl>
                <dt><span><img src={RegularCrossing} alt="" /></span></dt>
                <dd>常规路口</dd>
              </dl>
            </li>
          </ul>
          <div className={styles.signaContainer_right}>
            <div className={styles.title}><div>知春路</div><div><span onClick={this.handleShowConfig}>区域优化配置</span></div></div>
            <div className={styles.signaContainer_right_top}>
              {
                isBtnShow && Listofintersections && Listofintersections.map(item => <Intersection isBtnShow={isBtnShow} itemList={item} key={item.id} />)
              }
              {
                !isBtnShow && Listofintersections && Listofintersections.map(item => <Intersection isBtnShow={isBtnShow} itemList={item} key={item.id} />)
              }
            </div>
            <div className={styles.signaContainer_right_bom}>
              <div className={styles.signaRB_top}>
                {
                  this.btnList.map(item => <div onClick={() => this.btnRegion(item.id)} className={item.id === num ? styles.active : ''} key={item.id}>{item.name}</div>)
                }
              </div>
              <div className={styles.signaRB_bom}>
                <EchartsPage {...this.echarts.echarts1} />
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state,'ssFD')
  return {
    data: { ...state.data, ...state.managements },
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getInterDataTree: bindActionCreators(getInterDataTree, dispatch),
    getInterListRefresh: bindActionCreators(getInterListRefresh, dispatch),
    getAreaAvgDelayTime: bindActionCreators(getAreaAvgDelayTime, dispatch),
    getAreaAvgSpeed: bindActionCreators(getAreaAvgSpeed, dispatch),
    getRdchlList: bindActionCreators(getRdchlList, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(AreaOptimize) 
