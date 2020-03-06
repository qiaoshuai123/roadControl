import React from 'react'

import styles from './Entrance.scss'

class Entrance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickCount: 0,
      transFormBoxY: 0,
    }
    this.front = 'translateZ(250px)'
    this.back = 'translateZ(-250px)'
    this.left = 'rotateY(90deg) translateZ(400px)'
    this.right = 'rotateY(90deg) translateZ(-400px)'
  }
  componentDidMount = () => {}
  handleMoveLeft = () => {
    this.setState({
      clickCount: this.state.clickCount += 1,
      transFormBoxY: this.state.transFormBoxY -= 90,
    }, () => {
      console.log(this.state.transFormBoxY)
    })
  }
  render() {
    const { clickCount } = this.state
    return (
      <div className={styles.entranceWrapper}>
        <div className={styles.boolLight}>
          <div className={styles.bool} />
          <span className={styles.moveLeft} onClick={this.handleMoveLeft} />
          <span className={styles.moveRight} />
          <div className={styles.transformBox} style={{ transform: `rotateX(-45deg) rotateY(${this.state.transFormBoxY}deg)` }}>
            <div className={styles.front} style={{ transform: this.front }}>
              <div className={styles.sysPic} />
            </div>
            <div className={styles.back} style={{ transform: this.back }}>
              <div className={styles.sysPic} />
            </div>
            <div className={styles.left} style={{ transform: this.left }}>
              <div className={styles.sysPic} />
            </div>
            <div className={styles.right} style={{ transform: this.right }}>
              <div className={styles.sysPic} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Entrance
