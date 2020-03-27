import React, { Component } from 'react'
import { Icon, Radio, Upload, message, Modal, Input, Select, } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getInterdetailIsSignalling, getprimitiveInutuitype } from '../../../../actions/interCofig'
import styles from './Primitive.scss'

import interImgs from './img/equipment_for.png'

class Primitive extends Component {
  constructor(props) {
    super(props)
    console.log(this.props, 'qoiao')
    this.state = {
      isMessageinter: 'none',
      ischeckbtninter: 'none',
      interMonitorLeft: 0,
      value: 1,
      checkInterImgs: interImgs,
      isDeviceInformation: false, // 设备信息弹框
      PrimitivBacImg: this.props.data.sinaglInfo.UNIT_BACKGROUND_IMG,
      EquipmentList: [], // 右侧添加设备列表
      deviceinformation: { // 设备添加弹窗
        EquipmentModel: '', // 设备型号
        CorrelationNumber: '', // 关联编号
        EquipmentNumber: '', // 设备编号
        FactoryNumber: '', // 出厂编号
        EquipmentName: '', // 设备名称
        Manufacturer: '', // 生产厂家
        InstallationLocation: '', //安装位置
        ManufacturerTelephone: '', //厂家电话
        DateProduction: '', // 出厂日期
        installDate: '', // 安装日期
        SubordinateUnit: '', // 所属单位
        WhetherToDisplay: '', // 是否显示
        MaintenanceUnit: '', // 维护单位
        MaintenancePhine: '', // 维护电话
        EquipmentDetail: '', // 设备描述
        EquipmentIcon: '', // 设备图标
        PictWidth: '', // 图片宽
        PicHeight: '', // 图片高
      },
    }
    this.isPullBox = false
    // this.equipmentList = [
    //   { id: 1, name: '信号机' },
    //   { id: 2, name: '信号灯' },
    //   { id: 3, name: '相位' },
    //   { id: 4, name: '检测器' },
    //   { id: 5, name: '路段名称' },
    // ]
    this.InterId = this.props.InterId
  }

  componentDidMount = () => {
    this.picPropsFun()
    this.props.getprimitiveInutuitype()
  }
  componentDidUpdate = (prevState) => {
    if (prevState.data !== this.props.data) {
      console.log(this.props)
    }
    const { primitiveInutuitype } = this.props.data
    if (prevState.data.primitiveInutuitype !== primitiveInutuitype) {
      this.getControlRoads(primitiveInutuitype)
    }
  }
  onChangeRadio = (e) => {
    this.setState({
      value: e.target.value,
    })
  }
  getControlRoads = (EquipmentList) => {
    // console.log(primitiveInutuitype, 'ssss')
    this.setState({
      EquipmentList,
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
  checkequipment = (item) => { // 添加新设备
    console.log(item, '信号')
    switch (item.UI_TYPE_NAME) {
      case '信号机':
        this.getHasSingalDevice()
        break
      case '信号灯':
        break
      case '相位':
        break
      case '检测器':
        break
      case '路段名称':
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
  SubordinateUnit = (value) => { // 所属单位
    console.log(`selected ${value}`)
  }
  Isdisplay = (value) => { // 是否显示
    console.log(`selected ${value}`)
  }
  Maintenanceunit = (value) => { // 维护单位
    console.log(`selected ${value}`)
  }
  render() {
    const {
      interMonitorLeft,
      value, isMessageinter,
      ischeckbtninter,
      checkInterImgs,
      isDeviceInformation,
      PrimitivBacImg,
      EquipmentList,
      deviceinformation,
    } = this.state
    const { Option } = Select
    const { TextArea } = Input
    return (
      <div className={styles.PrimitiveBox}>
        <div ref={(PrimitiveInsideBox) => { this.PrimitiveInsideBox = PrimitiveInsideBox }} className={styles.PrimitiveInsideBox}>
          <img src={`http://192.168.1.230:8080/atms-web/resources/imgs/backupsImg/${PrimitivBacImg}`} alt="" />
          <div className={styles.interMonitorBox} style={{ right: `${interMonitorLeft}px` }}>
            <span className={styles.hideIcon} onClick={this.handleShowInterMonitor}>
              <Icon type="right" />
            </span>
            <p><span />设备配置</p>
            <div className={styles.EquipmentBox}>
              {
                EquipmentList && EquipmentList.map(item =>
                  (
                    <dl key={item.ID}>
                      <dt><span onClick={() => this.checkequipment(item)} /></dt>
                      <dd>{item.UI_TYPE_NAME}</dd>
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
            // onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            okText={'确认'}
            width='720px'
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
                  <div className={styles.mountingTd}><div>设备安装位置</div><div><Input /></div></div>
                  <div className={styles.mountingTd}><div>生厂厂家联系方式</div><div><Input /></div></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div>出厂日期</div><div><Input /></div></div>
                  <div className={styles.mountingTd}><div>安装日期</div><div><Input /></div></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div>所属单位</div>
                    <div>
                      <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.SubordinateUnit}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </div>
                  </div>
                  <div className={styles.mountingTd}><div>是否显示</div>
                    <div>
                      <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.Isdisplay}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div>维护单位</div>
                    <div>
                      <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.Maintenanceunit}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </div>
                  </div>
                  <div className={styles.mountingTd}><div>维护电话</div><div><Input /></div></div>
                </div>
                <div className={`${styles.mountingTr} ${styles.mountingTds}`}>
                  <div className={styles.mountingTd}><div>描述</div><div><TextArea rows={2} /></div></div>
                  <div className={styles.mountingTd}><div><span>*</span>请选择正常图标<br />(点击图片选择)</div>
                    <div className={styles.PrimitiveBacimg}>123</div>
                  </div>
                </div>
                {/* {`${styles.operationTop_box} ${styles.operationTopRightFor}`} */}
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div><span>*</span>宽</div><div><Input /></div></div>
                  <div className={styles.mountingTd}><div><span>*</span>高</div><div><Input /></div></div>
                </div>
              </div>
              <div className={styles.mountingTableBottom}>
                <div>
                  <span onClick={this.handleOk} className={styles.mountingTableBottom_left}>提交</span>
                  <span className={styles.mountingTableBottom_center}>删除</span>
                  <span onClick={this.handleCancel} className={styles.mountingTableBottom_right}>取消</span>
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
    getprimitiveInutuitype: bindActionCreators(getprimitiveInutuitype, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(Primitive)
