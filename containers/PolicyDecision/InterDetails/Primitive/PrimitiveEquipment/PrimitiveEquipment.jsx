import React, { Component } from 'react'
import styles from './PrimitiveEquipment.scss'

class PrimitiveEquipment extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.items !== this.props.items) {
  //     this.setState({
  //       PrimitivBacImg: nextProps.data.sinaglInfo.UNIT_BACKGROUND_IMG
  //     })
  //   }
  // }
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
    return (
      <div style={{}} ref={(input) => { this.PullBox = input }} onMouseDown={this.PullBoxDown} onMouseMove={this.PullBoxMove} onMouseUp={this.PullBoxUp} className={styles.PrimitiveEquipmentbox}>
        213456879
        {/* <img src="" alt=""/> */}
      </div>
    )
  }
}

export default PrimitiveEquipment
