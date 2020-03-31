import React, { Component } from 'react'
import styles from './PrimitiveEquipment.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { geteditDeviceInfoPo } from '../../../../../actions/interCofig'

class PrimitiveEquipment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgs: this.props.itemimgs,
    }
    // console.log(this.props,'sss')
    this.isPullBox = false
    this.PrimitiveInsideBox = this.props.primintBox
    this.moveType = false
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.itemimgs !== this.props.itemimgs) {
      this.setState({
        imgs: nextProps.itemimgs,
      })
    }
  }
  componentDidUpdate = (prevState) => {
    const { editDeviceInfoPo } = this.props.data
    if (prevState.data.editDeviceInfoPo !== editDeviceInfoPo) {
      this.getIneditDeviceInfoPo(editDeviceInfoPo)
    }
  }
  getIneditDeviceInfoPo = (editDeviceInfoPo) => {
    // console.log(editDeviceInfoPo, '移动成功')
  }
  PullBoxDown = (e) => { // 鼠标点击盒子
    this.isPullBox = true
    this.defaultX = e.pageX - e.target.offsetLeft - this.PrimitiveInsideBox.offsetLeft
    this.defaultY = e.pageY - e.target.offsetTop - this.PrimitiveInsideBox.offsetTop
  }
  PullBoxMove = (e) => { // 鼠标移动盒子
    if (this.isPullBox) {
      this.PullBox.style.cursor = 'move'
      this.offsetX = e.pageX - this.PrimitiveInsideBox.offsetLeft - this.defaultX
      this.offsetY = e.pageY - this.PrimitiveInsideBox.offsetTop - this.defaultY
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
    console.log('mouseUp')
    this.PullBox.style.cursor = 'default'
    this.props.geteditDeviceInfoPo(this.state.imgs.ID, this.offsetX, this.offsetY)
  }
  PullClick = (e) => { // 双击子盒子对其修改
    e.stopPropagation()
    console.log('盒子单击')
    // this.props.showModal(1)
  }
  render() {
    // console.log(this.props.data,'sssss')
    const { sinaglInfo } = this.props.data
    const { imgs } = this.state
    const imgStyle = {
      position: 'absolute', top: `${imgs.P_TOP}px`, left: `${imgs.P_LEFT}px`, width: `${imgs.UI_WIDTH}px`, height: `${imgs.UI_HIGHT}px`, cursor: 'pointer',
    }
    const srcs = imgs.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '海信' ? 'jm/' :
      imgs.DEVICE_NAME === '信号机' && sinaglInfo.SIGNALSYSTEM === '西门子' ? 'byzt/' : ''
    return (
      <div
        style={imgStyle}
        ref={(input) => { this.PullBox = input }}
        onMouseDown={this.PullBoxDown}
        onMouseMove={this.PullBoxMove}
        onMouseUp={this.PullBoxUp}
      >
        <img
          width="100%"
          height="100%"
          // onClick={this.PullClick}
          draggable="false"
          src={`http://192.168.1.123:26001/atms/imgs/${imgs.UI_TYPE_ID}/${srcs}${imgs.UI_IMAGE_NAME}`}
          alt="显示失败"
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.interConfig,
})
const mapDisPatchToProps = dispatch => ({
  geteditDeviceInfoPo: bindActionCreators(geteditDeviceInfoPo, dispatch),
})
export default connect(mapStateToProps, mapDisPatchToProps)(PrimitiveEquipment)
