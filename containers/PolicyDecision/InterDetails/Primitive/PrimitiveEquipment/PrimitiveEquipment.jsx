import React, { Component } from 'react'
import styles from './PrimitiveEquipment.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { geteditDeviceInfoPo } from '../../../../../actions/interCofig'

class PrimitiveEquipment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgs: this.props.itemimgs
    }
    // console.log(this.props,'sss')
    this.isPullBox = false
    this.PrimitiveInsideBox = this.props.primintBox
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
    // console.log(e)
    this.isPullBox = true
    this.defaultX = e.clientX - e.target.offsetLeft - this.PrimitiveInsideBox.offsetLeft
    this.defaultY = e.clientY - e.target.offsetTop - this.PrimitiveInsideBox.offsetTop
    this.PullBox.style.cursor = 'move'
  }
  PullBoxMove = (e) => { // 鼠标移动盒子
    if (this.isPullBox) {
      this.offsetX = e.clientX - this.PrimitiveInsideBox.offsetLeft - this.defaultX
      this.offsetY = e.clientY - this.PrimitiveInsideBox.offsetTop - this.defaultY
      const PrimitWidth = this.PrimitiveInsideBox.offsetWidth - this.PullBox.offsetWidth
      const PrimitHeight = this.PrimitiveInsideBox.offsetHeight - this.PullBox.offsetHeight
      if (this.offsetX < 0) {
        this.offsetX = 0
      }
      if (this.offsetY < 0) {
        this.offsetY = 0
      }
      if (this.offsetX > PrimitWidth) {
        this.offsetX = PrimitWidth
      }
      if (this.offsetY > PrimitHeight) {
        this.offsetY = PrimitHeight
      }
      this.PullBox.style.left = `${this.offsetX}px`
      this.PullBox.style.top = `${this.offsetY}px`
    }
  }
  PullBoxUp = () => { // 取消盒子移动
    console.log(this.state.imgs, '盒子id')
    this.isPullBox = false
    this.PullBox.style.cursor = 'default'
    this.props.geteditDeviceInfoPo(this.state.imgs.ID, this.offsetX, this.offsetY)
  }
  render() {
    // console.log(this.props.data,'sssss')
    const { sinaglInfo } = this.props.data
    const { imgs } = this.state
    const imgStyle = { position: 'absolute', top: `${imgs.P_TOP}px`, left: `${imgs.P_LEFT}px`, width: `${imgs.UI_WIDTH}px`, height: `${imgs.UI_HIGHT}px`, cursor: 'pointer' }
    const srcs = imgs.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '海信' ? 'jm/' :
      imgs.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '西门子' ? 'byzt/' : ''
    return (
      <img
        style={imgStyle}
        ref={(input) => { this.PullBox = input }}
        onMouseDown={this.PullBoxDown}
        onMouseMove={this.PullBoxMove}
        onMouseUp={this.PullBoxUp}
        draggable="false"
        src={`http://192.168.1.123:26001/atms/imgs/${imgs.UI_TYPE_ID}/${srcs}${imgs.UI_IMAGE_NAME}`}
        className={styles.PrimitiveEquipmentbox}
        alt="显示失败"
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.interConfig,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    geteditDeviceInfoPo: bindActionCreators(geteditDeviceInfoPo, dispatch),
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