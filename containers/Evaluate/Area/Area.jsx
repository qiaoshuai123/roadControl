import React from 'react'
import { Select, Icon } from 'antd'

import Header from '../Header/Header'
import InterMsg from '../InterMsg/InterMsg'
import CustomTree from '../../../components/CustomTree/CustomTree'

import styles from './Area.scss'

class Area extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.areas = ['区域平均拥堵延时', '区域平均延误时间', '区域平均速度']
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
            <h3 className={styles.interName}>当前区域 : 人民大道</h3>
            {
              this.areas.map((item) => {
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

export default Area
