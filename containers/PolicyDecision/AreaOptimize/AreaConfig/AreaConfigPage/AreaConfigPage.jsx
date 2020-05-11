import React from 'react'
import { Select, DatePicker, Input, Button, Modal } from 'antd'
import moment from 'moment'
import OptimizeListT from './optimizeListT/optimizeListT'
import GreenWaveCharts from '_C/GreenWaveCharts/GreenWaveCharts'

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
    this.greenWaveData = {"msg":"操作成功","code":"1","data":[{"area_name":"美兰区","lenAll":0,"data_version":"20180630","reverseSpeed":"39.90","execute_end_date":"","reverse_phase_plan_id":"1","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":50.0,"reverse_offset":50.0,"is_key_inter":0,"len":0,"inter_name":"人民大道海岸路人行横道","forward_phase_plan_id":"1","geohash":"w7w6nu3wrv","reverse_phase_plan_name":"A","id":"11LGL063TR0","lev":"4","lat":20.06351027,"inter_id":"11LGL063TR0","lng":110.33809613,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LGL063TR0","offset":50.0,"data_version":"20180630","adcode":"460100","stat_date":"20200309020341","end_time":"07:00:00","task_id":"0","split_time":77.0,"phase_plan_id":"1","offset_type_no":1,"dt":"20200309","start_time":"00:00:00","ctlregion_id":"HaiDianWuXiLu","cyclesplit_source":2,"update_frequency":2,"cycle_time":127.0,"id":5653530,"phase_name":"A","doe_date_type":99},{"inter_id":"11LGL063TR0","offset":0.0,"data_version":"20180630","adcode":"460100","stat_date":"20200309020341","end_time":"07:00:00","task_id":"0","split_time":50.0,"phase_plan_id":"1","offset_type_no":1,"dt":"20200309","start_time":"00:00:00","ctlregion_id":"HaiDianWuXiLu","cyclesplit_source":2,"update_frequency":2,"cycle_time":127.0,"id":5653531,"phase_name":"B","doe_date_type":99}],"name":"人民大道海岸路人行横道","cycle_time":127.0,"forwordSpeed":"0.00"},{"area_name":"美兰区","lenAll":159,"data_version":"20180630","reverseSpeed":"35.46","execute_end_date":"","reverse_phase_plan_id":"2","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":-54.0,"reverse_offset":-54.0,"is_key_inter":0,"len":159,"inter_name":"人民大道-海甸五路口","forward_phase_plan_id":"2","geohash":"w7w6nu4jcb","reverse_phase_plan_name":"A","id":"11LGP063TC0","lev":"4","lat":20.06202472,"inter_id":"11LGP063TC0","lng":110.33851907,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LGP063TC0","offset":-54.0,"data_version":"20180630","adcode":"460100","stat_date":"20200309020341","end_time":"07:00:00","task_id":"0","split_time":28.0,"phase_plan_id":"2","offset_type_no":1,"dt":"20200309","start_time":"00:00:00","ctlregion_id":"HaiDianWuXiLu","cyclesplit_source":2,"update_frequency":2,"cycle_time":127.0,"id":5653532,"phase_name":"A","doe_date_type":99},{"inter_id":"11LGP063TC0","offset":-26.0,"data_version":"20180630","adcode":"460100","stat_date":"20200309020341","end_time":"07:00:00","task_id":"0","split_time":26.0,"phase_plan_id":"2","offset_type_no":1,"dt":"20200309","start_time":"00:00:00","ctlregion_id":"HaiDianWuXiLu","cyclesplit_source":2,"update_frequency":2,"cycle_time":127.0,"id":5653533,"phase_name":"B","doe_date_type":99},{"inter_id":"11LGP063TC0","offset":0.0,"data_version":"20180630","adcode":"460100","stat_date":"20200309020341","end_time":"07:00:00","task_id":"0","split_time":40.0,"phase_plan_id":"2","offset_type_no":1,"dt":"20200309","start_time":"00:00:00","ctlregion_id":"HaiDianWuXiLu","cyclesplit_source":2,"update_frequency":2,"cycle_time":127.0,"id":5653534,"phase_name":"E","doe_date_type":99},{"inter_id":"11LGP063TC0","offset":40.0,"data_version":"20180630","adcode":"460100","stat_date":"20200309020341","end_time":"07:00:00","task_id":"0","split_time":33.0,"phase_plan_id":"2","offset_type_no":1,"dt":"20200309","start_time":"00:00:00","ctlregion_id":"HaiDianWuXiLu","cyclesplit_source":2,"update_frequency":2,"cycle_time":127.0,"id":5653535,"phase_name":"C","doe_date_type":99}],"name":"人民大道-海甸五路口","cycle_time":127.0,"forwordSpeed":"36.73"},{"area_name":"美兰区","lenAll":434,"data_version":"20180630","reverseSpeed":"0.00","execute_end_date":"","reverse_phase_plan_id":"1","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":47.0,"reverse_offset":47.0,"is_key_inter":0,"len":275,"inter_name":"人民大道海南大学人行横道","forward_phase_plan_id":"1","geohash":"w7w6ngdx19","reverse_phase_plan_name":"A","id":"11LH0063SJ0","lev":"4","lat":20.05950037,"inter_id":"11LH0063SJ0","lng":110.33919987,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LH0063SJ0","offset":47.0,"data_version":"20180630","adcode":"460100","stat_date":"20200309020341","end_time":"07:00:00","task_id":"0","split_time":89.0,"phase_plan_id":"1","offset_type_no":1,"dt":"20200309","start_time":"00:00:00","ctlregion_id":"HaiDianWuXiLu","cyclesplit_source":2,"update_frequency":2,"cycle_time":127.0,"id":5653541,"phase_name":"A","doe_date_type":99},{"inter_id":"11LH0063SJ0","offset":9.0,"data_version":"20180630","adcode":"460100","stat_date":"20200309020341","end_time":"07:00:00","task_id":"0","split_time":38.0,"phase_plan_id":"1","offset_type_no":1,"dt":"20200309","start_time":"00:00:00","ctlregion_id":"HaiDianWuXiLu","cyclesplit_source":2,"update_frequency":2,"cycle_time":127.0,"id":5653542,"phase_name":"B","doe_date_type":99}],"name":"人民大道海南大学人行横道","cycle_time":127.0,"forwordSpeed":"36.60"}]}

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
  handlePlanSend = () => {
    const { confirm } = Modal
    // const selfThis = this
    confirm({
      title: '确定要下发吗？',
      className: styles.confirmBox,
      onOk() {
        console.log('ok')
      },
    })
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
            <div className={styles.chartsBox}>
              <GreenWaveCharts
                chartsData={this.greenWaveData.data}
                totleDistance={this.greenWaveData.data[this.greenWaveData.data.length - 1].lenAll}
                showForwordWave={true}
                showReverseWave={false}
              />
            </div>
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
                  <div className={styles.mountingTd}>123</div>
                  <div className={`${styles.mountingTd} ${styles.mountingTds}`}>07:00 - 08:00</div>
                  <div className={styles.mountingTd}>2020-05-09</div>
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
              <span className={styles.divbomSpan} onClick={this.handlePlanSend}>子区方案下发</span>
              <span className={styles.divbomSpan}>保存</span>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default AreaConfigPage
