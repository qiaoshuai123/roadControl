import React from 'react'
import { Select, DatePicker, Input, Button } from 'antd'
import moment from 'moment'
import OptimizeListT from './optimizeListT/optimizeListT'
import styles from './AreaConfigPage.scss'

class AreaConfigPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      SubordinateUnitLsit: [],
      sInstallationLocation: 1,
      installDate: this.formatDate(new Date() * 1), // 安装日期
    }
    this.dateFormat = 'YYYY-MM-DD'
  }
  componentDidMount = () => {

  }
  formatDate = (value) => { // 时间戳转换日期格式方法
    if (value == null) {
      return ''
    }
    const date = new Date(value)
    const y = date.getFullYear()// 年
    let MM = date.getMonth() + 1// 月
    MM = MM < 10 ? (`0${MM}`) : MM
    let d = date.getDate()// 日
    d = d < 10 ? (`0${d}`) : d
    let h = date.getHours()// 时
    h = h < 10 ? (`0${h}`) : h
    let m = date.getMinutes()// 分
    m = m < 10 ? (`0${m}`) : m
    let s = date.getSeconds()// 秒
    s = s < 10 ? (`0${s}`) : s
    return `${y}-${MM}-${d} ${h}:${m}:${s}`
  }
  render() {
    const { Option } = Select
    const { SubordinateUnitLsit, sInstallationLocation, installDate } = this.state
    return (
      <div className={styles.AreaConfigWrapper}>
        <div className={styles.AreaConfigWrapperTop}>
          <div className={styles.chartsSearch}>
            <div className={styles.divs}>干线：</div>
            <Select
              style={{ width: '90px', height: '30px' }}
              value={sInstallationLocation || ''}
              // optionFilterProp="children"
              onChange={this.sInstallationLocations}
            >
              {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
            </Select>
            <div className={styles.divs}>优化方案：</div>
            <Select
              style={{ width: '90px', height: '30px', marginRight: '10px' }}
              value={sInstallationLocation || ''}
              // optionFilterProp="children"
              onChange={this.sInstallationLocations}
            >
              {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
            </Select>
            <Select
              style={{ width: '90px', height: '30px' }}
              value={sInstallationLocation || ''}
              // optionFilterProp="children"
              onChange={this.sInstallationLocations}
            >
              {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
            </Select>
            <div className={styles.divs}>绿波时间：</div>
            <DatePicker value={moment(installDate, this.dateFormat)} format={this.dateFormat} onChange={this.onChangDateEnd} />
            <Select
              style={{ width: '90px', height: '30px', marginLeft: '10px' }}
              value={sInstallationLocation || ''}
              // optionFilterProp="children"
              onChange={this.sInstallationLocations}
            >
              {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
            </Select>
            <div className={styles.divs}>优化目标：</div>
            <Select
              style={{ width: '90px', height: '30px' }}
              value={sInstallationLocation || ''}
              // optionFilterProp="children"
              onChange={this.sInstallationLocations}
            >
              {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
            </Select>
          </div>
          <div className={styles.AreaConfigWrapperTop_right}>
            <div className={styles.butons}><Button onClick={this.btnSearth} type="primary">开启实时干线检测</Button></div>
            <div><Button onClick={this.btnSearth} type="primary">查询</Button></div>
          </div>
        </div >
        <div className={styles.AreaConfigWrapperBom}>
          <div className={styles.AreaConfigWrapperBomLeft}>
            1
          </div>
          <div className={styles.AreaConfigWrapperBomRight}>
            <div>
              <span className={styles.spans}>区域路口：</span>
              <Select
                style={{ flex: '1', height: '30px' }}
                value={sInstallationLocation || ''}
                // optionFilterProp="children"
                onChange={this.sInstallationLocations}
              >
                {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                  <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
              </Select>
            </div>
            <div><span className={styles.spans}>正向通行速度：</span><div className={styles.inps}><Input onChange={this.changeFont} placeholder="" /><span>千米/小时</span></div></div>
            <div><span className={styles.spans}>反向通行速度：</span><div className={styles.inps}><Input onChange={this.changeFont} placeholder="" /><span>千米/小时</span></div></div>
            <div className={styles.listName}>
              <OptimizeListT />
            </div>
            <div className={styles.chartsSearchs}>
              <div className={styles.divs}>正向主协调相位：</div>
              <Select
                style={{ width: '90px', height: '30px' }}
                value={sInstallationLocation || ''}
                // optionFilterProp="children"
                onChange={this.sInstallationLocations}
              >
                {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                  <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
              </Select>
              <div className={styles.divs}>相位差：</div>
              <div className={styles.chartsSearchsBox}><Input onChange={this.changeFont} placeholder="" /></div>
            </div>
            <div className={styles.mountingTable}>
              <div className={styles.mountingThead}>
                <div className={styles.mountingTh}>子区ID</div>
                <div className={styles.mountingTh}>方案时间段</div>
                <div className={styles.mountingTh}>执行日期</div>
              </div>
              <div className={styles.mountingTbody}>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}>*************</div>
                  <div className={styles.mountingTd}>*************</div>
                  <div className={styles.mountingTd}>*************</div>
                </div>
              </div>
            </div>
            <div className={styles.mountingTable}>
              <div className={styles.mountingThead}>
                <div className={styles.mountingTh}>执行开始时间</div>
                <div className={styles.mountingTh} />
                <div className={styles.mountingTh}>执行结束时间</div>
              </div>
              <div className={styles.mountingTbody}>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><DatePicker value={moment(installDate, this.dateFormat)} format={this.dateFormat} onChange={this.onChangDateEnd} /></div>
                  <div className={styles.mountingTd} />
                  <div className={styles.mountingTd}><DatePicker value={moment(installDate, this.dateFormat)} format={this.dateFormat} onChange={this.onChangDateEnd} /></div>
                </div>
              </div>
            </div>
            <div className={styles.divbom}>
              <span className={styles.divbomSpan}>下发方案管理</span>
              <span className={styles.divbomSpan}>子区方案下发</span>
              <span className={styles.divbomSpan}>保存</span>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default AreaConfigPage
