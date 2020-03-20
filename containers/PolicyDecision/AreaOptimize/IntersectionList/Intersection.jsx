import React from 'react'
import styles from './Intersection.scss'
import { Select } from 'antd'
import Echart from '../Echart/Echart'

class Intersection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    const { Option } = Select
    return (
      <div className={styles.IntersectionItem}>
        <dl className={styles.IntersectionItem_top}>
          <dt><span /></dt>
          <dd>知春路与罗庄东路</dd>
        </dl>
        <div className={styles.IntersectionItem_bom}>
          <div className={styles.IntersectionItem_bomLeft}>
            <dl>
              <dt>实时相位差</dt>
              <dd><span>38<b>秒</b></span></dd>
            </dl>
            <dl>
              <dt>建议相位差</dt>
              <dd><span>38<b>秒</b></span></dd>
            </dl>
            <dl>
              <dt>偏移</dt>
              <dd><span>38<b>秒</b></span></dd>
            </dl>
            <dl>
              <dt>协调相位</dt>
              <dd>
                <Select style={{ width: '98%' }} defaultValue="1">
                  <Option key="1">贵阳市</Option>
                  <Option key="2">南阳市</Option>
                </Select>
              </dd>
            </dl>
          </div>
          <div className={styles.IntersectionItem_bomRight}>
            <Echart />
          </div>
        </div>
      </div>
    )
  }
}

export default Intersection
