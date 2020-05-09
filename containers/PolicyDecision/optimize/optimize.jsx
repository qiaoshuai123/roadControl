import React, { Component } from 'react'
import { Select, Input, Icon } from 'antd'
import styles from './optimize.scss'
import Header from '../Header/Header'
import OptimizeList from './optimizeList/optimizeList'
import EchartsPage from '../../../components/ecahrtsPage/EchartsPage'
import OptimizeListT from './optimizeListT/optimizeListT'
import { echartsprogramme, echarts } from './chartsOptions'
import OptimizeMsg from './optimizeMsg/optimizeMsg'

class Optimize extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
      nums: 0,
      showOpeMessage: 'none',
      swiperListLeft: 0,
    }
    this.moveCount = 0
    this.videoLength = 7
    this.echartsprogramme = echartsprogramme
    this.echarts = echarts
    this.dataList = [ // 模拟数据
      { id: 1, num: 1 },
      { id: 2, num: 2 },
      { id: 3, num: 3 },
      { id: 4, num: 4 },
      { id: 5, num: 5 },
      { id: 6, num: 6 },
    ]
    this.assessmentList = [
      {
        id: 1,
        name: '排队长度',
      },
      {
        id: 2,
        name: '停车次数',
      },
      {
        id: 3,
        name: '延迟时间',
      },
    ]
    this.flowList = [
      {
        id: 1,
        name: '流量',
      },
      {
        id: 2,
        name: '延续',
      },
      {
        id: 3,
        name: '停车',
      },
      {
        id: 4,
        name: '排队',
      },
    ]
  }
  componentDidMount() {
  }
  // 方案评估按钮切换
  AssessmentBtn(id) {
    this.setState({
      num: id,
    })
  }
  // 打开路口监控弹窗
  monitorMessage = (item) => {
    this.setState({
      showOpeMessage: 'block',
      nums: item.id,
    })
  }
  //
  // 关闭路口监控弹窗
  monitorMessageNone = () => {
    this.setState({
      showOpeMessage: 'none',
      nums: 0,
    })
  }
  // 头部城市选择
  cityChange = (value) => {

  }
  // 切换优化控制
  handleChange = (value) => {
    // console.log(`selected ${value}`)
  }
  handleSwiperMoveLeft = () => { }
  handleSwiperMoveRight = () => { }
  render() {
    const { Option } = Select
    const { Search } = Input
    const { num, showOpeMessage, swiperListLeft, nums } = this.state
    return (
      <div className={styles.speciaTaskBox}>
        <Header {...this.props} />
        <div className={styles.speciaContainer}>
          <div className={styles.speciaContainer_left}>
            <div className={styles.speciaContainer_left_top}>
              <Select defaultValue="贵阳" style={{ width: '120px', marginRight: '10px' }} onChange={this.cityChange}>
                <Option value="贵阳">贵阳</Option>
              </Select>
              <Search
                placeholder="搜索所属路口"
                onSearch={value => console.log(value)}
                style={{ width: '210px' }}
              />
            </div>
            <div className={styles.speciaContainer_left_bom}>
              {
                this.dataList.map(item => <div key={item.id}>{}</div>)
              }
            </div>
          </div>
          <div className={styles.speciaContainer_center}>
            <div className={styles.speciaContainer_center_top}>
              世纪大道与海甸五西路路口
            </div>
            <ul className={styles.speciaContainer_center_bom}>
              {/* <li>11LAU063T70-SS102098</li> */}
              <li>通讯状态 : <span>在线</span></li>
              <li>信号灯状态 : <span>开灯</span></li>
              <li>运行状态 : <span>信号系统自主控制</span></li>
            </ul>
          </div>
          <div className={styles.speciaContainer_right}>
            <div className={styles.speciaContainer_right_one}>
              <OptimizeList />
            </div>
            <div className={styles.speciaContainer_right_two}>
              <p>实时优化方案控制 <span>方案编号 : 2020202022202-1</span></p>
              <p>实时优化方案产出时间:2019年05月25日 08:35,超出30分钟失效</p>
              <div className={styles.speciaContainerLB_canvas}>
                <div className={styles.speciaContainerLB_left}> <EchartsPage {...this.echarts.echarts1} /><span>当前方案</span></div>
                <div className={styles.speciaContainerLB_right}> <EchartsPage {...this.echarts.echarts2} /><span>建议方案</span></div>
              </div>
              <div className={styles.speciaContainerLB_list}>
                <OptimizeListT />
              </div>
              <div className={styles.speciaContainerLB_bom}>
                <span className={styles.spanOne}>优化控制操作 :</span>
                <Select defaultValue="本地多时段" style={{ width: '36%' }} onChange={this.handleChange}>
                  <Option value="本地多时段">本地多时段</Option>
                </Select>
                <div><span className={styles.spans}>执行</span></div>
                <div><span className={styles.spans}>优化控制管理</span></div>
              </div>
            </div>
            <div className={styles.speciaContainer_right_tre}>
              <p>方案预评估</p>
              <ul>
                {
                  this.assessmentList.map(item => <li key={item.id} className={num === item.id ? styles.active : ''} onClick={() => this.AssessmentBtn(item.id)}>{item.name}</li>)
                }
              </ul>
              <div>
                <EchartsPage {...this.echartsprogramme} />
              </div>
            </div>
          </div>
          <div className={styles.swipers}>
            {
              this.flowList.map(item => <div key={item.id} className={`${styles.chartsType} ${nums === item.id ? styles.active : ''}`} onClick={() => this.monitorMessage(item)}>{item.name}</div>)
            }
          </div>
          <div className={styles.swiperRig}>
            <div className={styles.swiperRig_left} onClick={this.handleSwiperMoveLeft}>
              <span><Icon type="caret-left" /></span>
            </div>
            <div className={styles.swiperBox}>
              <div className={styles.swiperList} style={{ left: `${swiperListLeft}px` }}>
                {
                  new Array(6).fill(true).map((item, index) => {
                    return (
                      <div className={styles.swiperItems} key={index}>
                        <p>设备编号 : 1000227$1$041</p>
                        <p>位置 : 世纪大道与海淀五西路路口</p>
                        <div className={styles.videoBox}>{}</div>
                      </div>
                    )
                  })
                }
                <div className={styles.swiperItems}>
                  <p>设备编号 : 1000227$1$041</p>
                  <p>位置 : 世纪大道与海淀五西路路口</p>
                  <div className={styles.videoBox}>123</div>
                </div>
              </div>
            </div>
            <div className={styles.swiperRig_right} onClick={this.handleSwiperMoveRight}>
              <span><Icon type="caret-right" /></span>
            </div>
          </div>
          <div style={{ display: showOpeMessage }} className={styles.optimizeMessage}>
            <OptimizeMsg monitorMessageNone={this.monitorMessageNone} />
          </div>
        </div>
      </div>
    )
  }
}

export default Optimize
