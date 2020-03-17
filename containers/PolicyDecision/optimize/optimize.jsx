import React, { Component } from 'react'
import Header from '../Header/Header'
import { Select, Input } from 'antd'
import OptimizeList from './optimizeList/optimizeList'
import EchartsPage from '../../../components/ecahrtsPage/EchartsPage'
import OptimizeListT from './optimizeListT/optimizeListT'
import { echartsprogramme, echarts } from './chartsOptions'
import OptimizeMsg from './optimizeMsg/optimizeMsg'
import styles from './optimize.scss'


class Optimize extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
      showOpeMessage: false,
    }
    this.echartsprogramme = echartsprogramme
    this.echarts = echarts
    this.dataList = [ // 模拟数据
      1, 2, 3, 4, 5, 6,
    ]
    this.num = 4
    this.nums = 0
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
  }
  componentDidMount() {
    // eslint-disable-next-line react/no-string-refs
    this.uls = this.refs.uls
    // eslint-disable-next-line prefer-destructuring
    const length = this.dataList.length
    this.uls.style.width = `${length * 317} px`
  }
  handleChange = (value) => {
    // console.log(`selected ${value}`)
  }
  next = () => {
    if (this.num >= this.dataList.length) {
      return
    }
    this.nums++
    this.num++
    this.uls.style.left = `${-317 * this.nums}px`
  }
  prev = () => {
    if (this.num <= 4) {
      return
    }
    this.nums--
    this.num--
    this.uls.style.left = `${-317 * this.nums}px`
  }
  btnclick(id) {
    this.setState({
      num: id,
    })
  }
  swipersBtn = () => {
    const { showOpeMessage } = this.state
    this.setState({
      showOpeMessage: !showOpeMessage,
    })
  }
  onChange = (a, b, c) => {
    console.log(a, b, c)
  }

  render() {
    const { Option } = Select
    const { Search } = Input
    const { num, showOpeMessage } = this.state
    return (
      <div className={styles.speciaTaskBox}>
        <Header {...this.props} />
        <div className={styles.speciaContainer}>
          <div className={styles.speciaContainer_left}>
            <div className={styles.speciaContainer_left_top}>
              <Select defaultValue="lucy" style={{ width: '30%', marginRight: '5px' }} onChange={this.handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled">Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: '60%' }}
              />
            </div>
            <div className={styles.speciaContainer_left_bom}>
              {
                this.dataList.map((item, index) => <div key={index}>{item}</div>)
              }
            </div>
          </div>
          <div className={styles.speciaContainer_center}>
            <div className={styles.speciaContainer_center_top}>
              世纪大道与海甸五西路路口
            </div>
            <ul className={styles.speciaContainer_center_bom}>
              <li>11LAU063T70-SS102098</li>
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
              <p>实时优化方案控制 <span>方案编号:2020202022202-1</span></p>
              <p>实时优化方案产出时间:2019年05月25日 08:35,超出30分钟失效</p>
              <div className={styles.speciaContainerLB_canvas}>
                <div> <EchartsPage {...this.echarts.echarts1} /></div>
                <div> <EchartsPage {...this.echarts.echarts2} /></div>
              </div>
              <div className={styles.speciaContainerLB_list}>
                <OptimizeListT />
              </div>
              <div className={styles.speciaContainerLB_bom}>
                <span>优化控制操作:</span>
                <Select defaultValue="lucy" style={{ width: '30%' }} onChange={this.handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled">Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <div><span className={styles.spans}>执行</span></div>
                <div><span className={styles.spans}>优化控制管理</span></div>
              </div>
            </div>
            <div className={styles.speciaContainer_right_tre}>
              <p>方案预评估</p>
              <ul>
                {
                  this.assessmentList.map(item => <li key={item.id} onClick={() => this.btnclick(item.id)}>{item.name}<span className={num === item.id ? styles.active : ''}> </span></li>)
                }
              </ul>
              <div>
                <EchartsPage {...this.echartsprogramme} />
              </div>

            </div>
          </div>
          <div className={styles.swipers}>
            <ul className={styles.uls}>
              <li onClick={this.swipersBtn}>流量</li>
              <li>延误</li>
              <li>停车</li>
              <li>排队</li>
            </ul>
            <div className={styles.swiperRig}>
              <div className={styles.swiperRig_left}>
                <div onClick={this.prev}>
                  <span></span>
                </div>
              </div>
              <div className={styles.swiperRig_center}>
                <ul className={styles.ulList} ref="uls">
                  {
                    this.dataList.map((item, ind) =>
                      // eslint-disable-next-line react/no-array-index-key
                      (<li key={ind}>
                        <p>设备编号:1000227$1$041</p>
                        <p>位置:世纪大道-********</p>
                        <div>
                          {item}
                        </div>
                      </li>)
                    )
                  }
                </ul>
              </div>
              <div className={styles.swiperRig_right}>
                <div onClick={this.next}>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          {
            showOpeMessage ?
              <div className={styles.optimizeMessage}>
                <div className={styles.optimizeMessage_top}>
                  <ul className={styles.optimizeMessage_top_left}>
                    <span>方向:</span>
                    <li>北x</li>
                    <li>北x</li>
                    <li>北x</li>
                  </ul>
                  <div className={styles.optimizeMessage_top_center}>
                    <span>方向:</span>
                    <li>左转x</li>
                    <li>直行x</li>
                    <li>掉头x</li>
                  </div>
                  <div className={styles.optimizeMessage_top_right}>
                    <span>x</span>
                  </div>
                </div>
                <OptimizeMsg />
              </div> : ''
          }

        </div>
      </div>
    )
  }
}

export default Optimize
