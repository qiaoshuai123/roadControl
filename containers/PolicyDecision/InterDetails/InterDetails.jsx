import React from 'react'

import styles from './InterDetails.scss'

class InterDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {

  }
  render() {
    return (
      <div className={styles.interDetailsBox}>
        <div className={styles.interConfig}>123</div>
      </div>
    )
  }
}

export default InterDetails
