import React, { Component } from 'react'
import { Icon, Radio, Upload, message, Modal, Input } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getInterdetailIsSignalling } from '../../../../actions/interCofig'
import styles from './Primitive.scss'

import interImgs from './img/equipment_for.png'

class Primitive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMessageinter: 'none',
      ischeckbtninter: 'none',
      interMonitorLeft: 0,
      value: 1,
      checkInterImgs: interImgs,
      isDeviceInformation: false, // 设备信息弹框
    }
    this.isPullBox = false
    this.equipmentList = [
      { id: 1, name: '信号机' },
      { id: 2, name: '信号灯' },
      { id: 3, name: '相位' },
      { id: 4, name: '检测器' },
      { id: 5, name: '路段名称' },
    ]
    this.InterId = this.props.InterId
  }

  componentDidMount = () => {
    this.picPropsFun()
  }
  componentDidUpdate = (prevState) => {
    console.log('111111')
  }
  onChangeRadio = (e) => {
    this.setState({
      value: e.target.value,
    })
  }
  getHasSingalDevice = () => {
    new Promise((resolve) => {
      resolve(this.props.getInterdetailIsSignalling(this.InterId))
    }).then(() => {
      const { issignaling } = this.props.data
      if (!issignaling) {
        message.info('信号机已存在')
      } else {
        this.showModal()
      }
    })
  }
  picPropsFun = () => { // 上传底图
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
  closeInter = () => { // 关闭弹出页面
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
  showModal = () => { // 设备信息弹框显示
    console.log(123456789)
    this.setState({
      isDeviceInformation: true,
    })
  }
  handleOk = () => { // 设备信息弹框隐藏
    this.setState({
      isDeviceInformation: false,
    })
  }
  handleCancel = () => { // 设备信息弹框隐藏
    this.setState({
      isDeviceInformation: false,
    })
  };
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
  btnNoneStop = (e) => {
    e.stopPropagation()
  }
  checkequipment = (id) => { // 添加新设备
    switch (id) {
      case 1:
        this.getHasSingalDevice()
        break
      default:
        break
    }
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
      isDeviceInformation,
    } = this.state
    return (
      <div className={styles.PrimitiveBox}>
        <div ref={(PrimitiveInsideBox) => { this.PrimitiveInsideBox = PrimitiveInsideBox }} className={styles.PrimitiveInsideBox}>
          <div className={styles.interMonitorBox} style={{ right: `${interMonitorLeft}px` }}>
            <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
              <Icon type="right" />
            </span>
            <p><span />设备配置</p>
            <div className={styles.EquipmentBox}>
              {
                this.equipmentList.map(item =>
                  (
                    <dl key={item.id}>
                      <dt><span onClick={() => this.checkequipment(item.id)} /></dt>
                      <dd>{item.name}</dd>
                    </dl>
                  ))
              }
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottom_left} onClick={this.Messageinter}>路口底图</div>
            <div onClick={this.closeInter} className={styles.bottom_right}>返回</div>
          </div>
          <div style={{ display: ischeckbtninter }} onClick={this.checkinterPageBoxNone} className={styles.checkinterPage}>
            <ul onClick={this.btnNoneStop} className={styles.checkinterPageBox}>
              <li onClick={this.ischeckListItem}>1</li>
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
          <div className={styles.PullBox} ref={(input) => { this.PullBox = input }} onMouseDown={this.PullBoxDown} onMouseMove={this.PullBoxMove} onMouseUp={this.PullBoxUp}>
            123
          </div>
          <Modal
            title="保存信息"
            visible={isDeviceInformation}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText={'确认'}
            width='680px'
          >
            <div className={styles.mountingTable}>
              <div className={styles.mountingTbody}>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div><span>*</span>设备型号</div><div><Input /></div></div>
                  <div className={styles.mountingTd}><div>关联编号</div><div><Input /></div></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div><span>*</span>设备编号</div><div><Input /></div></div>
                  <div className={styles.mountingTd}><div>出厂编号</div><div><Input /></div></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div><span>*</span>设备型号</div><div><Input /></div></div>
                  <div className={styles.mountingTd}><div>关联编号</div><div><Input /></div></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><span>设备安装位置</span><Input /></div>
                  <div className={styles.mountingTd}><span>生厂厂家联系方式</span><Input /></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><span>出厂日期</span><Input /></div>
                  <div className={styles.mountingTd}><span>安装日期</span><Input /></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><span>所属单位</span><Input /></div>
                  <div className={styles.mountingTd}><span>是否显示</span><Input /></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><span>维护单位</span><Input /></div>
                  <div className={styles.mountingTd}><span>维护电话</span><Input /></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><span>描述</span><Input /></div>
                  <div className={styles.mountingTd}><span><b>*</b>请选择正常图标(点击图片选择)</span><Input /></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><span><b>*</b>宽</span><Input /></div>
                  <div className={styles.mountingTd}><span><b>*</b>高</span><Input /></div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
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
    getInterdetailIsSignalling: bindActionCreators(getInterdetailIsSignalling, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(Primitive)
