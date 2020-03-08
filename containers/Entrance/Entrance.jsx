import React from 'react'
import classNames from 'classnames'
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
    const clickCount = this.state.clickCount === 4 ? 1 : this.state.clickCount += 1
    const transFormBoxY = this.state.transFormBoxY === -360 ? -90 : this.state.transFormBoxY -= 90
    this.setState({
      clickCount: clickCount,
      transFormBoxY: transFormBoxY,
    }, () => {
      console.log(this.state.transFormBoxY)
    })
  }
  handleMoveRight = () => {
    const clickCount = this.state.clickCount === 0 ? 3 : this.state.clickCount -= 1
    const transFormBoxY = this.state.transFormBoxY === 0 ? -270 : this.state.transFormBoxY += 90
    this.setState({
      clickCount: clickCount,
      transFormBoxY: transFormBoxY,
    }, () => {
      console.log(this.state.transFormBoxY)
    })
  }
  render() {
    const { clickCount, transFormBoxY } = this.state
    return (
      <div className={styles.entranceWrapper}>
        <div className={styles.boolLight}>
          <div className={styles.bool} />
          <span className={styles.moveLeft} onClick={this.handleMoveLeft} />
          <span className={styles.moveRight} onClick={this.handleMoveRight} />
          <div className={styles.transformBox} style={{ transform: `rotateX(-45deg) rotateY(${this.state.transFormBoxY}deg)` }}>
            <div
              className={styles.front}
              style={{ transform: clickCount === 1 ? 'translateZ(400px)' :
                                  clickCount === 2 ? `${this.front} rotateY(-180deg)`:
                                  clickCount === 3 ? 'translateZ(400px) rotateY(-90deg)' :
                                  this.front
              }}
            >
              <div
                className={styles.frontSysPic}
                style={{ transform: clickCount === 1 ? 'rotateY(90deg)' : clickCount === 0 ? 'rotateY(0)' : 'rotateY(0)' }}
              />
            </div>
            <div
              className={styles.right}
              style={{ transform: clickCount === 1 ? 'rotateY(90deg) translateY(-250px)' :
                                  clickCount === 2 ? `${this.right} rotateY(-180deg)`:
                                  clickCount === 3 ? 'translateY(250px) rotateY(0)' :
                                  this.right
              }}
            >
              <div
                className={styles.rightSysPic}
                style={{ transform: clickCount === 0 ? 'rotateY(-90deg)' :
                                    clickCount === 1 ? 'rotateY(0)' :
                                    clickCount === 2 ? 'rotateY(-90deg)':
                                    null
                }}
              />
            </div>
            <div
              className={styles.back}
              style={{ transform: clickCount === 1 ? 'translateZ(-400px)' :
                                  clickCount === 2 ? `${this.back} rotateY(-180deg)`:
                                  clickCount === 3 ? 'translateZ(-400px) rotateY(-90deg)':
                                  this.back
              }}
            >
              <div
                className={styles.backSysPic}
                style={{ transform: clickCount === 1 ? 'rotateY(90deg)' : clickCount === 0 ? 'rotateY(0)' : 'rotateY(0)' }}
              />
            </div>
            
            <div
              className={styles.left}
              style={{ transform: clickCount === 1 ? 'rotateY(90deg) translateY(250px)' :
                                  clickCount === 2 ? `${this.left} rotateY(-180deg)`:
                                  clickCount === 3 ? 'translateY(-250px) rotateY(0)':
                                  this.left
              }}
            >
              <div
                className={styles.leftSysPic}
                style={{ transform: clickCount === 0 ? 'rotateY(-90deg)' : clickCount === 1 ? 'rotateY(0)' : 'rotateY(-90deg)' }}
              />
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Entrance
