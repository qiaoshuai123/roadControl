import React from 'react'
import classNames from 'classnames'
import styles from './EntrancePlus.scss'

class EntrancePlus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleGoSystem = (e) => {
    const path = e.currentTarget.getAttribute('modalname')
    if (path) {
      window.open(path)
    } else {
      window.open('http://10.11.57.101:20206/simWeb/#/entrances')
    }
  }
  render() {
    return (
      <div className={styles.entranceBox}>
        <div className={styles.logoBox}>
          <div className={styles.logo} />
        </div>
        <div className={styles.modalWrapper}>
          <div className={styles.modalBg}>
            <div modalname="#/signalhome" className={classNames(styles.modalItem, styles.decision)} onClick={this.handleGoSystem} />
            <div className={classNames(styles.modalItem, styles.optimize)} onClick={this.handleGoSystem} />
            <div modalname="#/inter" className={classNames(styles.modalItem, styles.simulate)} onClick={this.handleGoSystem} />
            <div modalname="#/TrafficSystem" className={classNames(styles.modalItem, styles.system)} onClick={this.handleGoSystem} />
          </div>
        </div>
      </div>
    )
  }
}

export default EntrancePlus
