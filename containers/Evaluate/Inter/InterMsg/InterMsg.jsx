import React from 'react'
import classNames from 'classnames'
import { DatePicker, Select } from 'antd'

import LineCharts from './LineCharts/LineCharts'

import styles from './InterMsg.scss'

class InterMsg extends React.Component {
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
          <span style={{ marginLeft: '10px' }}>对比时间：</span>
          <DatePicker /> - <DatePicker />
          <Select defaultValue="5mi" style={{ width: '90px', height: '30px', marginLeft: '5px' }}>
            <Option key="5mi" value="5mi">5分钟</Option>
            <Option key="5mi" value="10mi">10分钟</Option>
            <Option key="5mi" value="15mi">15分钟</Option>
          </Select>
          <Select
            defaultValue={[1, 2]}
            mode="multiple"
            style={{ width: '160px', height: '30px', marginLeft: '5px' }}
          >
            <Option key={1} value={1}>北</Option>
            <Option key={2} value={2}>东</Option>
            <Option key={3} value={3}>南</Option>
            <Option key={1} value={4}>西</Option>
            <Option key={2} value={5}>东北</Option>
            <Option key={3} value={6}>东南</Option>
            <Option key={2} value={7}>西南</Option>
            <Option key={3} value={8}>西北</Option>
          </Select>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'search' })}
            searchname="search"
            onClick={this.handleSearchCharts}
          >查询
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'week' })}
            searchname="week"
            onClick={this.handleSearchCharts}
          >上周同比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'month' })}
            searchname="month"
            onClick={this.handleSearchCharts}
          >上月环比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'year' })}
            searchname="year"
            onClick={this.handleSearchCharts}
          >去年同比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'export' })}
            searchname="export"
            onClick={this.handleSearchCharts}
          >导出
          </div>
        </div>
        <LineCharts />
      </div>
    )
  }
}

export default InterMsg
