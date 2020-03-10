import React from 'react'

import styles from './Header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {}
  render() {
    return (
      <div className={styles.headerWrapper}>
        123
      </div>
    )
  }
}

export default Header
