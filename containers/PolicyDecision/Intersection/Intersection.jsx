import React, { Component } from 'react'
import { ForwardOutlined } from '@ant-design/icons'
import styles from './Intersection.scss'
import Header from '../Header/Header'

class Intersection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.monitorWrapper}>
        <div className={styles.monitorLeft}>
          <div className={styles.monitorLeftTop}>
            <span><ForwardOutlined /></span>
          </div>
        </div>
        <div className={styles.monitorBomLeft}>

        </div>
        <div className={styles.monitorBomRight}>

        </div>
        <div className={styles.Messagecontrol}>

        </div>
        <div className={styles.MessagePhase}>

        </div>
      </div>
    )
  }
}

export default Intersection
