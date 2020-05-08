import React from 'react'
import { Select, Icon } from 'antd'

import Header from '../Header/Header'
import InterMsg from './InterMsg/InterMsg'
import CustomTree from '../../../components/CustomTree/CustomTree'

import styles from './Inter.scss'

class Inter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.indicators = ['路口流量', '路口延误时间', '路口停车次数', '路口排队', '路口的饱和度', '路口相位绿灯利用率', '路口一次通过率']
  }
  componentDidMount = () => {
  }
  componentDidUpdate = (prevProps) => {
  }
  render() {
    const { Option } = Select
    return (
      <div className={styles.InterWrapper}>
        <Header {...this.props} />
        <div className={styles.interContainer}>
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
          <div className={styles.interChartsMsg}>
            <h3 className={styles.interName}>当前路口 : 人民大道北京路</h3>
            {
              this.indicators.map((item) => {
                return (
                  <InterMsg msgName={item} key={item} />
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Inter
