import React from 'react'
import { Select, Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
      flowChartsData: null,
    }
    this.chartsParams = {
      compare_end_date: '2019-07-12 18:00',
      compare_start_date: '2019-07-12 00:00',
      ft_dir_8_no: '1,2,3,4,5,6,7,8',
      group_type: 'inter',
      init_end_date: '2019-08-26 18:00',
      init_start_date: '2019-07-07 00:00',
      inter_id: '11LAU063T70',
      tp: '5mi',
      turn_dir_no: '1,2,3,4',
    }
    this.chars_id = {
      evlregion_id: '460107',
    }
    // this.indicators = ['路口流量', '路口延误时间', '路口停车次数', '路口排队', '路口饱和度']
    this.indicators = [
      { names: '路口流量', params: this.chartsParams, fn: this.props.getInterFlow },
      { names: '路口延误时间', params: this.chartsParams, fn: this.props.getInterSaturation },
      { names: '路口停车次数', params: this.chartsParams, fn: this.props.getInterStopNum },
      { names: '路口排队', params: this.chartsParams, fn: this.props.getInterQueue },
      { names: '路口饱和度', params: this.chartsParams, fn: this.props.getInterRatio },
    ]
  }
  componentDidMount = () => {
    this.props.getInterDataTree().then((res) => {
      const {
        code, data, firstAdcode, firstCtlregionId, firstInterId, firstInterName,
      } = res.data
      if (code === '1') {
        // this.chartsParams.inter_id = firstInterId // 后期放开注释，首次获取的interid
        const chartsParams = this.resetParams(this.chartsParams) || ''
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
  componentDidUpdate = (prevState) => {
    const {
      interflow, interqueue, intersatuation, interstopnum, interratio, interphaseodd,
    } = this.props.data
    if (prevState.data.interflow !== interflow) {
      console.log(interflow, '路口流量')
      const { init, compare, x } = interflow
      const flowChartsData = this.resetChartsDatas(init, compare, x)
      this.setState({ flowChartsData })
    }
    if (prevState.data.interqueue !== interqueue) {
      console.log(interqueue, '路口排队')
    }
    if (prevState.data.intersatuation !== intersatuation) {
      console.log(intersatuation, '路口饱和度')
    }
    if (prevState.data.interstopnum !== interstopnum) {
      console.log(interstopnum, '路口停车次数')
    }
    if (prevState.data.interratio !== interratio) {
      console.log(interratio, '路口通过率')
    }
    if (prevState.data.interphaseodd !== interphaseodd) {
      console.log(interphaseodd, '路口相位')
    }
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
  resetChartsDatas = (...args) => {
    const [init, compare, x] = args
    console.log(init, compare, x)
    if (x.length > 0) {
      const initarr = []
      const comparearr = []
      const initLegend = []
      const compareLegend = []
      Object.keys(init).forEach((item) => {
        initLegend.push(item)
        const data = new Array(x.length).fill('')
        const obj = {}
        init[item].forEach((items) => {
          const timeIndex = x.indexOf(items.time)
          if (timeIndex !== -1) {
            data.splice(timeIndex, 1, items.data)
          }
        })
        obj.name = item
        obj.type = 'line'
        obj.data = data
        // obj.itemStyle = {
        //   normal: {
        //     color: _this.colors[index],
        //   }
        // }
        initarr.push(obj)
      })
      Object.keys(compare).forEach((item, index) => {
        if (compare[item] === '') return
        compareLegend.push(item + '-对比')
        const data = new Array(x.length).fill('')
        const obj = {}
        compare[item].forEach((items) => {
          const timeIndex = (x).indexOf(items.time)
          if (timeIndex !== -1) {
            data.splice(timeIndex, 1, items.data)
          }
        })
        obj.name = item + '-对比'
        obj.type = 'line'
        obj.data = data
        // obj.itemStyle = {
        //   normal: {
        //     color: _this.colorAry[index],
        //   }
        // }
        comparearr.push(obj)
      })
      const legend = Array.from(new Set([...initLegend, ...compareLegend])) // 图表显示legend
      const series = [...initarr, ...comparearr] // 图表显示series数据
      const chartsData = {}
      chartsData.legend = legend
      chartsData.time = x
      chartsData.series = series
      console.log(chartsData)
      return chartsData
    }
    return {}
  }
  resetParams = (params) => {
    if (Object.prototype.toString.call(params) !== '[object Object]') return false
    let newParams = '?'
    Object.keys(params).forEach((item) => {
      const itemMsg = item + '=' + params[item] + '&'
      newParams += itemMsg
    })
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
              this.state.flowChartsData &&
              <InterMsg {...this.props} chartsDatas={this.state.flowChartsData} msgName="测试数据" />
            }
            {
              this.indicators.map((item) => {
                return (
                  <InterMsg {...this.props} msgName={item.names} key={item.name} />
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
    data: state.evaluate,
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
