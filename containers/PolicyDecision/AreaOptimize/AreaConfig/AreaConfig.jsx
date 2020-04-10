import React from 'react'
import { Icon } from 'antd'
import EchartsPage from '../../../../components/ecahrtsPage/EchartsPage'
import AreaConfigPage from './AreaConfigPage/AreaConfigPage'
import AreaConfigEcharts from './AreaConfigEcharts'
import styles from './AreaConfig.scss'

class AreaConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(AreaConfigEcharts, 'ssssss')
    this.echarts = AreaConfigEcharts
  }
  componentDidMount = () => { }
  closePage = () => { // 关闭当前弹窗页面
    this.props.closepage()
  }
  render() {
    console.log(this.echarts.echarts1, 'sss')
    return (
      <div className={styles.configWrapper}>
        <div className={styles.title}>
          <span>区域优化配置</span>
          <span onClick={this.closePage}><Icon type="close" /></span>
        </div>
        <div className={styles.greenWrapper}>
          <div className={styles.greenWave}>
            <AreaConfigPage />
          </div>
          <ul className={styles.config}>
            <li className={styles.liadd}>
              <p>干线平均速度曲线图</p>
              <div>
                <EchartsPage {...this.echarts.echarts1} />
              </div>
            </li>
            <li>
              <p>干线平均延误曲线图</p>
              <div>
                <EchartsPage {...this.echarts.echarts2} />
              </div>
            </li>
            <li className={styles.liadd}>
              <p>干线平均停车次数曲线图</p>
              <div>
                <EchartsPage {...this.echarts.echarts3} />
              </div>
            </li>
            <li>
              <p>干线行程时间曲线图</p>
              <div>
                <EchartsPage {...this.echarts.echarts4} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default AreaConfig
