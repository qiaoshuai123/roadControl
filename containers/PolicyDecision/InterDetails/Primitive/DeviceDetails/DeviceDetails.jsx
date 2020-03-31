import React from 'react'

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.drag = false
  }
  componentDidMount = () => {
    document.addEventListener('mousemove', (e) => {
      if (this.drag) {
        console.log('move move move')
        const movePageX = e.pageX
        const movePageY = e.pageY
        this.imgBox.style.left = `${this.defaultLeft + (movePageX - this.defaultX)}px`
        this.imgBox.style.top = `${this.defaultTop + (movePageY - this.defaultY)}px`
      }
    })
  }
  handleDeviceDown = (e) => {
    this.timeStap = new Date().getTime()
    this.drag = true
    this.defaultX = e.pageX
    this.defaultY = e.pageY
    this.defaultLeft = parseInt(this.imgBox.style.left, 0)
    this.defaultTop = parseInt(this.imgBox.style.top, 0)
  }
  handleDeviceUp = () => {
    const nowTime = new Date().getTime()
    if (nowTime - this.timeStap < 200) {
      console.log('未拖动')
    } else {
      console.log('拖动中。。。')
    }
    this.drag = false
  }
  render() {
    const { UI_WIDTH, UI_HIGHT, DEVICE_NAME, UI_TYPE_ID, UI_IMAGE_NAME, P_LEFT, P_TOP } = this.props.imgMsg
    const imgStyle = {
      position: 'absolute', top: `${P_TOP}px`, left: `${P_LEFT}px`, width: `${UI_WIDTH}px`, height: `${UI_HIGHT}px`, cursor: 'pointer',
    }
    const deviceSrc = DEVICE_NAME === '信号机' && this.props.system === '海信' ? 'jm/' :
      DEVICE_NAME === '信号机' && this.props.system === '西门子' ? 'byzt/' : ''
    return (
      <div
        style={imgStyle}
        onMouseDown={this.handleDeviceDown}
        onMouseUp={this.handleDeviceUp}
        ref={(input) => { this.imgBox = input }}
      >
        <img
          width="100%"
          height="100%"
          draggable="false"
          src={`http://192.168.1.123:26001/atms/imgs/${UI_TYPE_ID}/${deviceSrc}${UI_IMAGE_NAME}`}
          alt=""
        />
      </div>
    )
  }
}

export default DeviceDetails
