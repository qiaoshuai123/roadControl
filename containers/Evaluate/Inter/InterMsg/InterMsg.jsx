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
    const { msgName } = this.props
    return (
      <div className={styles.interMsgWrapper}>
        <div className={styles.chartsTitle}>{this.props.msgName}</div>
        <div className={styles.chartsSearch}>
          <span>初始条件：</span>
          <DatePicker indicatorname={msgName} /> - <DatePicker indicatorname={msgName} suffixIcon={null} />
          <span style={{ marginLeft: '10px' }}>对比时间：</span>
          <DatePicker indicatorname={msgName} /> - <DatePicker indicatorname={msgName} />
          <Select defaultValue="5mi" style={{ width: '90px', height: '30px', marginLeft: '5px' }}>
            <Option key="5mi" value="5mi" indicatorname={msgName}>5分钟</Option>
            <Option key="5mi" value="10mi" indicatorname={msgName}>10分钟</Option>
            <Option key="5mi" value="15mi" indicatorname={msgName}>15分钟</Option>
          </Select>
          <Select
            defaultValue={[1, 2]}
            mode="multiple"
            style={{ width: '160px', height: '30px', marginLeft: '5px' }}
          >
            <Option key={1} value={1} indicatorname={msgName}>北</Option>
            <Option key={2} value={2} indicatorname={msgName}>东</Option>
            <Option key={3} value={3} indicatorname={msgName}>南</Option>
            <Option key={4} value={4} indicatorname={msgName}>西</Option>
            <Option key={5} value={5} indicatorname={msgName}>东北</Option>
            <Option key={6} value={6} indicatorname={msgName}>东南</Option>
            <Option key={7} value={7} indicatorname={msgName}>西南</Option>
            <Option key={8} value={8} indicatorname={msgName}>西北</Option>
          </Select>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'search' })}
            searchname="search"
            onClick={this.handleSearchCharts}
            indicatorname={msgName}
          >查询
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'week' })}
            searchname="week"
            onClick={this.handleSearchCharts}
            indicatorname={msgName}
          >上周同比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'month' })}
            searchname="month"
            onClick={this.handleSearchCharts}
            indicatorname={msgName}
          >上月环比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'year' })}
            searchname="year"
            indicatorname={msgName}
            onClick={this.handleSearchCharts}
          >去年同比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'export' })}
            searchname="export"
            indicatorname={msgName}
            onClick={this.handleSearchCharts}
          >导出
          </div>
        </div>
        <LineCharts {...this.props} />
      </div>
    )
  }
}

export default InterMsg
