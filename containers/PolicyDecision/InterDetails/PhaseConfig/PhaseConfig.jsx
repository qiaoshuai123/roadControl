import React from 'react'
import { Icon } from 'antd'
import styles from './PhaseConfig.scss'

class PhaseConfig extends React.PureComponent {
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
          <div className={styles.phaseConfigBoxTop_left}>相位配置</div>
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
            <div className={styles.mountingTh}>相位编号</div>
            <div className={styles.mountingTh}>相位名称</div>
            <div className={styles.mountingTh}>相位特征</div>
            <div className={`${styles.mountingTh} ${styles.mountingcar}`}>所属车道</div>
            <div className={styles.mountingTh} >相位放行人道方向</div>
            <div className={`${styles.mountingTh} ${styles.mountingTwo}`}>相位关键渠化</div>
            <div className={styles.mountingTh}>操作</div>
          </div>
          <div className={styles.mountingTbody}>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>1</div>
              <div className={styles.mountingTd}>相位1</div>
              <div className={styles.mountingTd}>无关联</div>
              <div className={`${styles.mountingTd} ${styles.mountingcar}`}>
                <div className={styles.roadMsg}>车道序号</div>
                <div className={styles.roadMsg}>方向</div>
                <div className={styles.roadMsg}>属性</div>
                <div className={styles.roadMsg}>流向</div>
                <div className={styles.roadMsg}>特征</div>
              </div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
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

export default PhaseConfig
