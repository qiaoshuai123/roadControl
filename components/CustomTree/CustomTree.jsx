import React from 'react'

import styles from 'CustomTree.scss'

class CustomTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {}
  render() {
    return (
      <div className={styles.treeWrapper}>123</div>
    )
  }
}

export default CustomTree
