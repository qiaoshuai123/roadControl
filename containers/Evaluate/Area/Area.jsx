import React from 'react'
import { Select, Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../Header/Header'
import InterMsg from '../InterMsg/InterMsg'
import CustomTree from '../../../components/CustomTree/CustomTree'
import CycleCharts from '../../../components/CycleCharts/CycleCharts'
import { getInterDataTree, getInterCircular, getAreaCongestionTime, getAreaDelayTime, getAreaAvgSpeed } from '../../../actions/evaluate'
import { resetParams } from '../../../utils/ResetParams'

import styles from './Area.scss'

class Area extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interTree: null,
      expendskey: [],
    }
    this.blockDelay = ['本周昨日平均拥堵延时', '本周昨日晚高峰拥堵延时', '本周昨日早高峰拥堵延时', '上周昨日平均拥堵延时', '上周昨日早高峰拥堵延时', '上周昨日晚高峰拥堵延时']
    this.areas = ['区域平均拥堵延时', '区域平均延误时间', '区域平均速度']
    this.chars_id = {
      evlregion_id: '460107',
    }
    this.chartsParams = {
      compare_end_date: '2020-05-21 18:00',
      compare_start_date: '2019-05-07 00:00',
      init_end_date: '2020-05-21 18:00',
      init_start_date: '2019-05-07 00:00',
      evlregion_id: 'LongKunNanLuNanduan_1',
      tp: '5mi',
    }
  }
  componentDidMount = () => {
    this.props.getInterDataTree().then((res) => {
      this.chartsId = resetParams(this.chars_id)
      const { code, data } = res.data
      if (code === '1') {
        const { firstAdcode, firstCtlregionId } = res.data
        const expendskey = [firstAdcode, firstCtlregionId]
        const chartsParams = resetParams(this.chartsParams)
        this.props.getInterCircular(this.chartsId).then(() => {})
        this.setState({ interTree: data, expendskey })
        this.props.getAreaCongestionTime(chartsParams)
        this.props.getAreaDelayTime(chartsParams)
        this.props.getAreaAvgSpeed(chartsParams)
      }
    })
  }
  componentDidUpdate = (prevProps) => {
  }
  resetEvlregionId = (evlregionId) => {
    if (Object.prototype.toString.call(evlregionId) !== '[object Object]') return false
    let newId = '?'
    Object.keys(evlregionId).forEach((item, index) => {
      const itemMsg = item + '=' + evlregionId[item]
      newId += itemMsg
    })
    return newId
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
            <h3 className={styles.interName}>当前区域 : 人民大道</h3>
            <div className={styles.gaugeBox}>
              {
                this.blockDelay.map((item) => {
                  return (
                    <CycleCharts title={item} />
                  )
                })
              }
            </div>
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

const mapStateToProps = (state) => {
  return {
    data: state.data,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getInterDataTree: bindActionCreators(getInterDataTree, dispatch),
    getInterCircular: bindActionCreators(getInterCircular, dispatch),
    getAreaCongestionTime: bindActionCreators(getAreaCongestionTime, dispatch),
    getAreaDelayTime: bindActionCreators(getAreaDelayTime, dispatch),
    getAreaAvgSpeed: bindActionCreators(getAreaAvgSpeed, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(Area)
