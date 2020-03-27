import React, { Component } from 'react'
import styles from './PrimitiveEquipment.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class PrimitiveEquipment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgs: this.props.itemimgs
    }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.itemimgs !== this.props.itemimgs) {
      this.setState({
        imgs: nextProps.itemimgs
      })
    }
  }
  PullBoxDown = (e) => { // 鼠标点击盒子
    this.isPullBox = true
    this.defaultX = e.clientX - e.target.offsetLeft - this.PrimitiveInsideBox.offsetLeft
    this.defaultY = e.clientY - e.target.offsetTop - this.PrimitiveInsideBox.offsetTop
    this.PullBox.style.cursor = 'move'
  }
  PullBoxMove = (e) => { // 鼠标移动盒子
    if (this.isPullBox) {
      let offsetX = e.clientX - this.PrimitiveInsideBox.offsetLeft - this.defaultX
      let offsetY = e.clientY - this.PrimitiveInsideBox.offsetTop - this.defaultY
      const PrimitWidth = this.PrimitiveInsideBox.offsetWidth - this.PullBox.offsetWidth
      const PrimitHeight = this.PrimitiveInsideBox.offsetHeight - this.PullBox.offsetHeight
      if (offsetX < 0) {
        offsetX = 0
      }
      if (offsetY < 0) {
        offsetY = 0
      }
      if (offsetX > PrimitWidth) {
        offsetX = PrimitWidth
      }
      if (offsetY > PrimitHeight) {
        offsetY = PrimitHeight
      }
      this.PullBox.style.left = `${offsetX}px`
      this.PullBox.style.top = `${offsetY}px`
    }
  }
  PullBoxUp = () => { // 取消盒子移动
    this.isPullBox = false
    this.PullBox.style.cursor = 'default'
  }
  render() {
    // const {imgs} =this.state
    // const imgStyle = { position: 'absolute', top: `${imgs.P_TOP}px`, left: `${imgs.P_LEFT}px`, width: `${imgs.UI_WIDTH}px`, height: `${imgs.UI_HIGHT}px`, cursor: 'pointer' }
    // const srcs = imgs.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '海信' ? 'jm/' :
    //   imgs.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '西门子' ? 'byzt/' : ''
    return (
      <div style={{}} ref={(input) => { this.PullBox = input }} onMouseDown={this.PullBoxDown} onMouseMove={this.PullBoxMove} onMouseUp={this.PullBoxUp} className={styles.PrimitiveEquipmentbox}>
        213456879
        {/* <img src="" alt=""/> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    // data: state.interConfig,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(PrimitiveEquipment)
// {
//   devicePics &&
//   devicePics.map((item) => {
//     const imgStyle = { position: 'absolute', top: `${item.P_TOP}px`, left: `${item.P_LEFT}px`, width: `${item.UI_WIDTH}px`, height: `${item.UI_HIGHT}px`, cursor: 'pointer' }
//     const srcs = item.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '海信' ? 'jm/' :
//       item.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '西门子' ? 'byzt/' : ''
//     return (
//       <img
//         key={item.P_LEFT + item.P_TOP}
//         style={imgStyle}
//         src={`http://192.168.1.230:8080/atms-web/resources/imgs/${item.UI_TYPE_ID}/${srcs}${item.UI_IMAGE_NAME}`}
//         alt=""
//         onClick={() => { this.handleShowDeviceInfo(item) }}
//       />
//     )
//   })
// }