import React from 'react'
import { Select, Icon, Switch } from 'antd'
import styles from './AreaOptimize.scss'
import Header from '../Header/Header'
import CustomTree from './CustomTree/CustomTree'
import EchartsPage from '../../../components/ecahrtsPage/EchartsPage'
import echartss from './chartsOptions'
import Intersection from './IntersectionList/Intersection'

class AreaOptimize extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
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
  }

  componentDidMount = () => { }

  onChange = () => { // 协调方向切换

  }
  btnRegion = (id) => { // 切点击区域
    this.setState({
      num: id,
    })
  }
  render() {
    const { Option } = Select
    const { num } = this.state
    console.log(num)
    return (
      <div className={styles.areaOptWrapper}>
        <Header {...this.props} />
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
              <CustomTree />
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
                <dt><span /></dt>
                <dd>关键路口</dd>
              </dl>
              <dl>
                <dt><span /></dt>
                <dd>常规路口</dd>
              </dl>
            </li>
          </ul>
          <div className={styles.signaContainer_right}>
            <div className={styles.title}><div>知春路</div><div><span>区域优化配置</span></div></div>
            <div className={styles.signaContainer_right_top}>
              {
                new Array(6).fill(true).map(item => <Intersection key={item} />)
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

export default AreaOptimize
