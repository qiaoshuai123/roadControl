import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './ChannelConfig.scss'

import { getChannelConfig } from '../../../../actions/interCofig'

class ChannelConfig extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      channelList: null,
    }
  }
  componentDidMount = () => {
    this.InterId = this.props.match.params.id
    this.props.getChannelConfig(this.InterId)
  }
  componentDidUpdate = (prevState) => {
    const { channelList } = this.props.data
    if (prevState.data.channelList !== channelList) {
      this.getChannelList(channelList)
    }
  }
  getChannelList = (channelList) => {
    this.setState({ channelList })
  }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    const { channelList } = this.state
    return (
      <div className={styles.phaseConfigBox}>
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>通道配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left}>添加</div>
          <div className={styles.phaseConfigBoxCenter_left}>上载</div>
          <div className={styles.phaseConfigBoxCenter_left}>下发</div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>通道号</div>
            <div className={styles.mountingTh}>控制源</div>
            <div className={styles.mountingTh}>控制源类型</div>
            <div className={styles.mountingTh}>通道方向</div>
            <div className={styles.mountingTh}> 灯组类型</div>
            <div className={styles.mountingTh}> 通道车流</div>
            <div className={styles.mountingTh}> 操作</div>
          </div>
          <div className={styles.mountingTbody}>
            {
              channelList &&
              channelList.map((item) => {
                return (
                  <div className={styles.mountingTr} key={item.CHANNEL_NO}>
                    <div className={styles.mountingTd}>{item.CHANNEL_NO}</div>
                    <div className={styles.mountingTd}>{item.CONTROL_SOURCE}</div>
                    <div className={styles.mountingTd}>{item.CONTROL_SOURCE_TYPE}</div>
                    <div className={styles.mountingTd}>{item.DIRECTION}</div>
                    <div className={styles.mountingTd}>{item.LAMP_TYPE}</div>
                    <div className={styles.mountingTd}>{item.FLOW_DIRECTION}</div>
                    <div className={styles.mountingTd}>
                      <div className={styles.deviceMsg}><span>修改</span></div>
                      <div className={styles.deviceMsg}><span>删除</span></div>
                    </div>
                  </div>
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
    data: state.interConfig,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getChannelConfig: bindActionCreators(getChannelConfig, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(ChannelConfig)
