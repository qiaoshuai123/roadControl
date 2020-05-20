import React from 'react'
import { Select, Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'

import Header from '../Header/Header'
import InterMsg from './InterMsg/InterMsg'
import CustomTree from '../../../components/CustomTree/CustomTree'
import { getInterDataTree, getInterFlow, getInterQueue, getInterSaturation, getInterStopNum, getInterRatio, getInterPhaseOdd } from '../../../actions/evaluate'

import styles from './Inter.scss'

class Inter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interTree: null,
      expendskey: [],
      currentInterName: null,
    }
    this.chartsParams = {
      compare_end_date: '2019-07-07 18:00',
      compare_start_date: '2020-05-18 00:00',
      ft_dir_8_no: '1,2,3,4,5,6,7,8',
      group_type: 'inter',
      init_end_date: '2020-05-19 18:00',
      init_start_date: '2020-05-19 00:00',
      inter_id: '',
      tp: '5mi',
      turn_dir_no: '1,2,3,4',
    }
    this.indicators = ['路口流量', '路口延误时间', '路口停车次数', '路口排队', '路口饱和度', '路口相位绿灯利用率', '路口一次通过率']
  }
  componentDidMount = () => {
    this.props.getInterDataTree().then((res) => {
      console.log(res)
      const {
        code, data, firstAdcode, firstCtlregionId, firstInterId, firstInterName,
      } = res.data
      if (code === '1') {
        this.chartsParams.inter_id = firstInterId
        const chartsParams = this.resetParams(this.chartsParams)
        const expendskey = [firstAdcode, firstCtlregionId]
        this.setState({ interTree: data, expendskey, currentInterName: firstInterName })
        this.props.getInterFlow(chartsParams)
        this.props.getInterQueue(chartsParams)
        this.props.getInterSaturation(chartsParams)
        this.props.getInterStopNum(chartsParams)
        this.props.getInterRatio(chartsParams)
        this.props.getInterPhaseOdd(chartsParams)
      }
    })
  }
  getNowDate = (timeStep) => {
    const today = timeStep ? new Date(timeStep) : new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2)
    const day = ('0' + (today.getDate())).slice(-2)
    // const hour = ('0' + (today.getHours())).slice(-2)
    // const minutes = ('0' + (today.getMinutes())).slice(-2)
    // const seconds = ('0' + (today.getSeconds())).slice(-2)
    const nowTime = year + '-' + month + '-' + day
    return nowTime
  }
  resetParams = (params) => {
    if (Object.prototype.toString.call(params) !== '[object Object]') return false
    let newParams = '?'
    Object.keys(params).forEach((item, index) => {
      const itemMsg = item + '=' + params[item] + '&'
      newParams += itemMsg
    })
    console.log(newParams)
    return newParams
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
              </Select>
              <span className={styles.searchBox}>
                <input className={styles.searchInput} type="text" placeholder="请输入你要搜索的内容" />
                <Icon className={styles.searchIcon} type="search" />
              </span>
            </div>
            <div className={styles.interTree}>
              {
                this.state.interTree &&
                <CustomTree treeData={this.state.interTree} keys={this.state.expendskey} />
              }
            </div>
          </div>
          <div className={styles.interChartsMsg}>
            <h3 className={styles.interName}>当前路口 : {this.state.currentInterName}</h3>
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

const mapStateToProps = (state) => {
  return {
    data: state.data,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getInterDataTree: bindActionCreators(getInterDataTree, dispatch),
    getInterFlow: bindActionCreators(getInterFlow, dispatch),
    getInterQueue: bindActionCreators(getInterQueue, dispatch),
    getInterSaturation: bindActionCreators(getInterSaturation, dispatch),
    getInterStopNum: bindActionCreators(getInterStopNum, dispatch),
    getInterRatio: bindActionCreators(getInterRatio, dispatch),
    getInterPhaseOdd: bindActionCreators(getInterPhaseOdd, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(Inter)
