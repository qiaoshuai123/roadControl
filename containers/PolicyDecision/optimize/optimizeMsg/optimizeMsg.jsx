import React from 'react'
import classNames from 'classnames'
import { DatePicker, Select } from 'antd'

import LineCharts from './LineCharts/LineCharts'

import styles from './optimizeMsg.scss'

class OptimizeMsg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchName: 'search',
    }
  }
  componentDidMount = () => {

  }
  handleSearchCharts = (e) => {
    const searchName = e.target.getAttribute('searchname')
    this.setState({ searchName })
  }
  render() {
    const { Option } = Select
    const { searchName } = this.state
    return (
      <div className={styles.interMsgWrapper}>
        <div className={styles.chartsTitle}>{this.props.msgName}</div>
        <div className={styles.chartsSearch}>
          <span>初始条件：</span>
          <DatePicker /> - <DatePicker suffixIcon={null} />
          <Select defaultValue="1" style={{ width: '90px', height: '30px', marginLeft: '5px' }}>
            <Option key="1">sim</Option>
          </Select>
          <Select defaultValue="1" style={{ width: '90px', height: '30px', marginLeft: '5px' }}>
            <Option key="1">sim</Option>
          </Select>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'search' })}
            searchname="search"
            onClick={this.handleSearchCharts}
          >查询
          </div>
        </div>
        <div className={styles.lineChartsBox}>
          <LineCharts />
        </div>

      </div>
    )
  }
}

export default OptimizeMsg
