import React from 'react'

import styles from './AreaOptimize.scss'
import Header from '../Header/Header'

class AreaOptimize extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {}
  render() {
    return (
      <div className={styles.areaOptWrapper}>
        <Header />
      </div>
    )
  }
}

export default AreaOptimize
