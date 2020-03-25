import React, { Component } from 'react'
import { Icon, Radio, Upload, message, Button } from 'antd'
import styles from './Primitive.scss'

class Primitive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMessageinter: 'none',
      ischeckbtninter: 'none',
      interMonitorLeft: 0,
      value: 1,
      checkInterImgs: require('./img/equipment_for.png'),
    }
    this.isPullBox = false
  }

  componentDidMount = () => {
    this.picProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      },
    }
  }
  onChangeRadio = (e) => {
    this.setState({
      value: e.target.value,
    })
  };
  closeNone = () => { // 关闭弹出页面
    this.props.IsprimitiveNone()
  }

  Messageinter = () => { // 弹出路口底图
    this.setState({
      isMessageinter: 'block',
    })
  }
  isMessageinterNone = () => { // 路口底图隐藏
    this.setState({
      isMessageinter: 'none',
    })
  }
  checkbtninter = () => { // 选择底图窗口
    this.setState({
      ischeckbtninter: 'block',
    })
  }
  checkinterPageBoxNone = () => { // 隐藏选择底图窗口
    // console.log(e)
    this.setState({
      ischeckbtninter: 'none',
    })
  }
  ischeckListItem = (e) => { // 点击图片选择路口
    e.stopPropagation()
    console.log(1)
    this.setState({
      // checkInterImgs, // 切换预览图照片
      ischeckbtninter: 'none',
    })
  }
  saveBasePic = () => { // 保存底图

  }
  uploadPic = () => { // 上传底图

  }
  PullBoxDown = (e) => { // 鼠标点击盒子
    this.isPullBox = true
    console.log(e.clientX - e.target.offsetLeft - this.PrimitiveInsideBox.offsetLeft)
    this.defaultX = e.clientX - e.target.offsetLeft - this.PrimitiveInsideBox.offsetLeft
    this.defaultY = e.clientY - e.target.offsetTop - this.PrimitiveInsideBox.offsetTop
    this.PullBox.style.cursor = 'move'
    // this.moveBoxLeft = Math.abs(parseInt(this.PullBox.style.left, 0))
    // this.moveBoxTop = Math.abs(parseInt(this.PullBox.style.top, 0))
  }
  // isposition = (length, type) => {
  //   if (length < 0) {
  //     return 0
  //   }
  //   if(type < 'x'){

  //   }
  // }
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
      console.log(offsetX, offsetY, this.defaultX)
      this.PullBox.style.left = `${offsetX}px`
      this.PullBox.style.top = `${offsetY}px`
    }
  }
  PullBoxUp = () => { // 取消盒子移动
    this.isPullBox = false
    this.PullBox.style.cursor = 'default'
  }
  btnNoneStop = (e) => {
    e.stopPropagation()
  }
  handleShowInterMonitor = () => {
    if (this.state.interMonitorLeft >= 0) {
      this.setState({
        interMonitorLeft: -120,
      })
    } else {
      this.setState({
        interMonitorLeft: 0,
      })
    }
  }
  render() {
    const {
      interMonitorLeft,
      value, isMessageinter,
      ischeckbtninter,
      checkInterImgs,
    } = this.state
    return (
      <div className={styles.PrimitiveBox}>
        <div ref={(PrimitiveInsideBox) => { this.PrimitiveInsideBox = PrimitiveInsideBox }} className={styles.PrimitiveInsideBox}>
          {/* <div className={styles.closeNone}>x</div> */}
          <div className={styles.interMonitorBox} style={{ right: `${interMonitorLeft}px` }}>
            <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
              <Icon type="right" />
            </span>
            <p><span />设备配置</p>
            <div className={styles.EquipmentBox}>
              <dl>
                <dt><span /></dt>
                <dd>信号机</dd>
              </dl>
              <dl>
                <dt><span /></dt>
                <dd>信号灯</dd>
              </dl>
              <dl>
                <dt><span /></dt>
                <dd>相位</dd>
              </dl>
              <dl>
                <dt><span /></dt>
                <dd>检测器</dd>
              </dl>
              <dl>
                <dt><span /></dt>
                <dd>路段名称</dd>
              </dl>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottom_left} onClick={this.Messageinter}>路口底图</div>
            <div onClick={this.closeNone} className={styles.bottom_right}>返回</div>
          </div>
          <div style={{ display: ischeckbtninter }} onClick={this.checkinterPageBoxNone} className={styles.checkinterPage}>
            <ul onClick={this.btnNoneStop} className={styles.checkinterPageBox}>
              <li onClick={(e) => this.ischeckListItem(e)}>1</li>
            </ul>
          </div>
          <div style={{ display: isMessageinter }} className={styles.interPage}>
            <div className={styles.interPageBox}>
              <p>选择底图<span onClick={this.isMessageinterNone}>x</span></p>
              <div className={styles.interPage_center}>
                <div className={styles.interPage_centerLeft}>
                  <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
                    <Radio value={1}>选择底图</Radio>
                    <Radio value={2}>上传底图</Radio>
                  </Radio.Group>
                </div>
                <div className={styles.interPage_centerCenter}>
                  <span><img src={checkInterImgs} alt="" /></span>
                </div>
                <div className={styles.interPage_centerRight}>
                  {
                    value === 1 ?
                      <span onClick={this.checkbtninter}>选择</span> :
                      <Upload {...this.picProps}>
                        浏览
                      </Upload>
                  }
                </div>
              </div>
              <div className={styles.interPage_bottom} >
                <span onClick={this.isMessageinterNone}>取消</span>
                {
                  value === 1 ? <span onClick={this.saveBasePic}>保存</span> : <span onClick={this.uploadPic}>上传</span>
                }
              </div>
            </div>
          </div>
          <div style={{ top: 0, left: 0 }} className={styles.PullBox} ref={(input) => { this.PullBox = input }} onMouseDown={this.PullBoxDown} onMouseMove={this.PullBoxMove} onMouseUp={this.PullBoxUp}>
            123
          </div>
        </div>
      </div>
    )
  }
}

export default Primitive
