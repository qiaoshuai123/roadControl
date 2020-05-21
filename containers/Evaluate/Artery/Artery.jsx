import React from 'react'
import { Select, Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../Header/Header'
import InterMsg from '../InterMsg/InterMsg'
import CustomTree from '../../../components/CustomTree/CustomTree'
import { getInterDataTree, getTrunklineDelayTime, getTrunklineSpeed, getTrunklineStopNum, getTrunkLineTravelRoute } from '../../../actions/evaluate'
import { resetParams } from '../../../utils/ResetParams'

import styles from './Artery.scss'

class Artery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interTree: null,
    }
    this.arteries = ['干线平均延误时间', '干线平均速度', '干线停车次数']
    this.chartsParams = {
      compare_end_date: '2020-05-21 18:00',
      compare_start_date: '2019-05-07 00:00',
      init_end_date: '2020-05-21 18:00',
      init_start_date: '2019-05-07 00:00',
      rdchl_id: 'LongKunNanLuNanduan_1',
      tp: '5mi',
    }
  }
  componentDidMount = () => {
    this.props.getInterDataTree().then((res) => {
      console.log(res)
      const { code, data } = res.data
      if (code === '1') {
        this.setState({ interTree: data })
        const chartsParams = resetParams(this.chartsParams)
        this.props.getTrunkLineTravelRoute(chartsParams)
        this.props.getTrunklineDelayTime(chartsParams)
        this.props.getTrunklineSpeed(chartsParams)
        this.props.getTrunklineStopNum(chartsParams)
      }
    })
  }
  componentDidUpdate = (prevProps) => {
    const { delayTime, avgspeed, stopnum, traveroute } = this.props.data
    if (prevProps.data.delayTime !== delayTime) {
      console.log(delayTime, '延误时间')
    }
    if (prevProps.data.avgspeed !== avgspeed) {
      console.log(avgspeed, '平均速度')
    }
    if (prevProps.data.stopnum !== stopnum) {
      console.log(stopnum, '停车次数')
    }
    if (prevProps.data.traveroute !== traveroute) {
      console.log(traveroute, '行程时间')
    }
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
                <CustomTree treeData={this.state.interTree} />
              }
            </div>
          </div>
          <div className={styles.interChartsMsg}>
            <h3 className={styles.interName}>当前干线 : </h3>
            {
              this.arteries.map((item) => {
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
    data: state.evaluate,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getInterDataTree: bindActionCreators(getInterDataTree, dispatch),
    getTrunklineDelayTime: bindActionCreators(getTrunklineDelayTime, dispatch),
    getTrunklineSpeed: bindActionCreators(getTrunklineSpeed, dispatch),
    getTrunklineStopNum: bindActionCreators(getTrunklineStopNum, dispatch),
    getTrunkLineTravelRoute: bindActionCreators(getTrunkLineTravelRoute, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(Artery)
