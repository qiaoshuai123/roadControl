import React from 'react'
import styles from './EntrancePlus.scss'

class EntrancePlus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className={styles.entranceBox}>
        <div className={styles.logoBox}>
          <div className={styles.logo} />
        </div>
        <div className={styles.modalWrapper}>
          <div className={styles.modalBg}>
            <div className={styles.modalItem} />
            <div className={styles.modalItem} />
            <div className={styles.modalItem} />
            <div className={styles.modalItem} />
          </div>
        </div>
      </div>
    )
  }
}

export default EntrancePlus
