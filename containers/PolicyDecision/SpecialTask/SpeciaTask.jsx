import React, { Component } from 'react'
import Header from '../Header/Header'
import { Select, Input, Button, Carousel } from 'antd'
import SpeciaList from './speciaList/speciaList'
import EchartsPage from '../../../components/ecahrtsPage/EchartsPage'
import SpeciaListT from './speciaListT/speciaListT'
import styles from './SpeciaTask.scss'


class SpeciaTask extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.echartsprogramme = {
      option: {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016'],
            ['Matcha Latte', 43.3, 85.8],
            ['Milk Tea', 83.1, 73.4],
            ['Cheese Cocoa', 86.4, 65.2],
            ['Walnut Brownie', 72.4, 53.9],
          ],
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#FFFFFF', // 轴的颜色1E385D
            },
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#FFFFFF', // 轴的颜色1E385D
            },
          },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar' },
          { type: 'bar' },
        ],
      },
    }
    this.echarts = {
      echarts1: {
        option: {
          color: ['#0189FF', '#FF8C3C', '#F10282'],
          graphic: {
            type: 'text',
            left: 'center',
            bottom: '40%',
            style: {
              text: `10`,
              textAlign: 'center',
              fontSize: 16,
              // font: 'italic bolder 30px cursive',
              fill: '#fff',
              width: 30,
              height: 30,
            },
          },
          tooltip: {
            trigger: 'item',
            showDelay: 20,
            hideDelay: 20,
            backgroundColor: 'rgba(255,0,0,0.7)',
            textStyle: {
              fontSize: '16px',
              color: '#000',
            },
            formatter: '{b} : {c}个 ({d}%)',
          },
          series: [
            {
              name: '未完成',
              type: 'pie',
              selectedMode: 'single',
              radius: [20, '30%'],

              label: {
                normal: {
                  position: 'inner',
                },
              },
              // labelLine: {
              //   normal: {
              //     show: false,
              //   },
              // },
            },
            {
              name: '已完成',
              type: 'pie',
              radius: ['40%', '55%'],
              data: [
                { value: 332, name: '离线设备' },
                { value: 55, name: '异常设备' },
                { value: 88, name: '在线设备' },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        },
      },
      echarts2: {
        option: {
          color: ['#0189FF', '#FF8C3C', '#F10282'],
          graphic: {
            type: 'text',
            left: 'center',
            bottom: '40%',
            style: {
              text: `20`,
              textAlign: 'center',
              fontSize: 16,
              // font: 'italic bolder 30px cursive',
              fill: '#fff',
              width: 30,
              height: 30,
            },
          },
          tooltip: {
            trigger: 'item',
            showDelay: 20,
            hideDelay: 20,
            backgroundColor: 'rgba(255,0,0,0.7)',
            textStyle: {
              fontSize: '16px',
              color: '#000',
            },
            formatter: '{b} : {c}个 ({d}%)',
          },
          series: [
            {
              name: '未完成',
              type: 'pie',
              selectedMode: 'single',
              radius: [20, '30%'],

              label: {
                normal: {
                  position: 'inner',
                },
              },
              // labelLine: {
              //   normal: {
              //     show: false,
              //   },
              // },
            },
            {
              name: '已完成',
              type: 'pie',
              radius: ['40%', '55%'],
              data: [
                { value: 332, name: '离线设备' },
                { value: 55, name: '异常设备' },
                { value: 88, name: '在线设备' },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        },
      },
    }
  }
  componentDidMount() {
  }
  handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  onChange = (a, b, c) => {
    console.log(a, b, c)
  }
  render() {
    const { Option } = Select
    const { Search } = Input
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
              11
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
              <SpeciaList />
            </div>
            <div className={styles.speciaContainer_right_two}>
              <p>实时优化方案控制 <span>方案编号:2020202022202-1</span></p>
              <p>实时优化方案产出时间:2019年05月25日 08:35,超出30分钟失效</p>
              <div className={styles.speciaContainerLB_canvas}>
                <div> <EchartsPage {...this.echarts.echarts1} /></div>
                <div> <EchartsPage {...this.echarts.echarts2} /></div>
              </div>
              <div className={styles.speciaContainerLB_list}>
                <SpeciaListT />
              </div>
              <div className={styles.speciaContainerLB_bom}>
                <span>优化控制操作:</span>
                <Select defaultValue="lucy" style={{ width: '30%' }} onChange={this.handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled">Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Button type="primary">Primary</Button>
                <Button type="primary">Primary</Button>
              </div>
            </div>
            <div className={styles.speciaContainer_right_tre}>
              <EchartsPage {...this.echartsprogramme} />
            </div>
          </div>
          <div className={styles.swipers}>
            <ul>
              <li>流量</li>
              <li>延误</li>
              <li>停车</li>
              <li>排队</li>
            </ul>
            <div>
              {/* <Carousel afterChange={this.onChange}>
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
              </Carousel> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SpeciaTask
