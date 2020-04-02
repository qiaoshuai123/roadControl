import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { geteditDeviceInfoPo, getcfgPhaseInfo, getshowDeviceInfo } from '../../../../../actions/interCofig'

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.drag = false
  }
  componentDidMount = () => {
    document.addEventListener('mousemove', (e) => {
      if (this.drag) {
        const movePageX = e.pageX
        const movePageY = e.pageY
        this.ImgLeft = `${this.defaultLeft + (movePageX - this.defaultX)}`
        this.ImgTop = `${this.defaultTop + (movePageY - this.defaultY)}`
        const PrimitWidth = 1000 - this.imgBox.offsetWidth
        const PrimitHeight = 800 - this.imgBox.offsetHeight
        if (this.ImgLeft < 0) {
          this.ImgLeft = 0
        }
        if (this.ImgTop < 0) {
          this.ImgTop = 0
        }
        if (this.ImgLeft > PrimitWidth) {
          this.ImgLeft = PrimitWidth
        }
        if (this.ImgTop > PrimitHeight) {
          this.ImgTop = PrimitHeight
        }
        this.imgBox.style.left = `${this.ImgLeft}px`
        this.imgBox.style.top = `${this.ImgTop}px`
      }
    })
    document.addEventListener('mouseup', () => {
      this.drag = false
    })
  }
  componentDidUpdate = (prevState) => {
    const { showDeviceInfo } = this.props.data
    // if (prevState.data.showDeviceInfo !== showDeviceInfo) {
    //   this.getshowDeviceInfo(showDeviceInfo)
    // }
  }
  // getshowDeviceInfo = (showDeviceInfo) => {
  //   console.log(showDeviceInfo, 'ssv')
  // }
  handleDeviceDown = (e) => {
    this.timeStap = new Date().getTime()
    this.drag = true
    this.defaultX = e.pageX
    this.defaultY = e.pageY
    this.defaultLeft = parseInt(this.imgBox.style.left, 0)
    this.defaultTop = parseInt(this.imgBox.style.top, 0)
    this.imgBox.style.cursor = 'move'
  }
  handleDeviceUp = () => {
    const nowTime = new Date().getTime()
    this.imgBox.style.cursor = 'default'
    const { ID } = this.props.imgMsg
    if (nowTime - this.timeStap < 200) {
      this.props.getshowDeviceInfo(ID, this.props.InterIds)
    } else {
      this.props.geteditDeviceInfoPo(ID, this.ImgLeft, this.ImgTop)
    }
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

const mapStateToProps = (state) => {
  return {
    data: state.data,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    geteditDeviceInfoPo: bindActionCreators(geteditDeviceInfoPo, dispatch),
    getcfgPhaseInfo: bindActionCreators(getcfgPhaseInfo, dispatch),
    getshowDeviceInfo: bindActionCreators(getshowDeviceInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(DeviceDetails)
