import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './InterDetails.scss'

import { setInterId } from '../../../actions/data'

class InterDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    // this.props.setInterId()
    console.log(this.props)
  }
  componentDidUpdate = () => {
    console.log(this.props)
  }
  render() {
    console.log(this.props)
    return (
      <div className={styles.interDetailsBox}>
        <div className={styles.interConfig}>123</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    setInterId: bindActionCreators(setInterId, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(InterDetails)
