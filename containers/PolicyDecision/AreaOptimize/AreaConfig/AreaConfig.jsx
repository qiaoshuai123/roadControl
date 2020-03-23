import React from 'react'

import styles from './AreaConfig.scss'

class AreaConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {}
  render() {
    return (
      <div className={styles.configWrapper}>
        <div className={styles.title}>
          
        </div>
        <div className={styles.greenWrapper}>
          <div className={styles.condition}></div>
          <div className={styles.btnBox}>
            <div className={styles.btn}>查询</div>
            <div className={styles.btn}>开启实时干线检测</div>
          </div>
          <div className={styles.greenWaveBox}>
            <div className={styles.greenWave}>

            </div>
            <div className={styles.config}>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AreaConfig
