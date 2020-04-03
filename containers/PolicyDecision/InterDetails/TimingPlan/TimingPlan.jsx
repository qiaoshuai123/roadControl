import React from 'react'
import { Icon } from 'antd'
import styles from './TimingPlan.scss'

class TimingPlan extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidmount = () => { }
  closeConfigPop = () => {
    this.props.closeConfigPop()
  }
  render() {
    return (
      <div className={styles.phaseConfigBox}>
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>配时方案配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closeConfigPop}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left}>
            添加
          </div>
          <div className={styles.phaseConfigBoxCenter_left}>
            上载
          </div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>方案号</div>
            <div className={styles.mountingTh}>方案名称</div>
            <div className={styles.mountingTh}>周期长</div>
            <div className={styles.mountingTh}>协调相位</div>
            <div className={styles.mountingTh}> 协调相位差(秒)</div>
            <div className={`${styles.mountingTh} ${styles.mountingcar}`}> 关联阶段</div>
            <div className={styles.mountingTh}> 操作</div>
          </div>
          <div className={styles.mountingTbody}>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingcar}`}>*****</div>
              <div className={styles.mountingTd}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TimingPlan
