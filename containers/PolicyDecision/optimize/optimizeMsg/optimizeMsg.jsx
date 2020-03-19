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
    const { monitorMessageNone } = this.props
    return (
      <React.Fragment>
        <div className={styles.optimizeMessage_top}>
          <ul className={styles.optimizeMessage_top_left}>
            <span>方向:</span>
            <Select
              defaultValue={[1, 2]}
              mode="multiple"
              style={{ width: '260px', height: '30px', marginLeft: '5px' }}
            >
              <Option key={1}>1</Option>
              <Option key={2}>2</Option>
              <Option key={3}>3</Option>
            </Select>
          </ul>
          <div className={styles.optimizeMessage_top_center}>
            <span>方向:</span>
            <Select
              defaultValue={[1, 2]}
              mode="multiple"
              style={{ width: '260px', height: '30px', marginLeft: '5px' }}
            >
              <Option key={1}>1</Option>
              <Option key={2}>2</Option>
              <Option key={3}>3</Option>
            </Select>
          </div>
          <div className={styles.optimizeMessage_top_right}>
            <span onClick={() => monitorMessageNone()}>x</span>
          </div>
        </div>
        <div className={styles.chartsSearch}>
          <div className={styles.divs}>时间间隔：</div>
          <DatePicker /> - <DatePicker suffixIcon={null} />
          <div className={styles.divs}>统计类型：</div>
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
      </React.Fragment>
    )
  }
}

export default OptimizeMsg
