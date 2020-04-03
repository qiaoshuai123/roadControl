import React, { PureComponent } from 'react'
import { Icon, Radio, Upload, message, Modal, Input, Select, DatePicker } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import moment from 'moment'
import {
  getInterdetailIsSignalling,
  getprimitiveInutuitype,
  getbasemapImg,
  getupdatebasemap,
  getshowDeviceInfo,
  getshowUiList,
  geteditDeviceInfo,
  getremovedeviceinfo,
} from '../../../../actions/interCofig'
import DeviceDetails from './DeviceDetails/DeviceDetails'
import styles from './Primitive.scss'

class Primitive extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMessageinter: 'none',
      ischeckbtninter: 'none',
      interMonitorLeft: 0,
      value: 1,
      checkInterImgs: this.props.data.sinaglInfo.UNIT_BACKGROUND_IMG,
      isDeviceInformation: false, // 设备信息弹框
      PrimitivBacImg: this.props.data.sinaglInfo.UNIT_BACKGROUND_IMG,
      EquipmentList: [], // 右侧添加设备列表
      basemapImgs: [], // 底图选择展示
      picList: [], // 添加设备图标展示
      SubordinateUnitLsit: [], // 所属单位列表
      MaintenanceUnitList: [], // 维护单位列表
      EquipmentModel: '', // 设备型号
      CorrelationNumber: 1, // 关联编号
      EquipmentNumber: '', // 设备编号
      FactoryNumber: 10011, // 出厂编号
      EquipmentName: '相位', // 设备名称
      Manufacturer: '北京博研智通有限公司', // 生产厂家
      sInstallationLocation: '', // 所属单位
      sInstallationLocationNumber: '',
      ManufacturerTelephone: 110, // 厂家电话
      DateProduction: this.formatDate(new Date() * 1), // 出厂日期
      installDate: this.formatDate(new Date() * 1), // 安装日期
      SubordinateUnit: '', // 维护单位
      SubordinateUnitNumber: '',
      WhetherToDisplay: '是', // 是否显示
      MaintenanceUnit: '', // 设备安装位置
      MaintenanceUnitNumber: '',
      MaintenancePhine: 110, // 维护电话
      EquipmentDetail: '无', // 设备描述
      EquipmentIcon: '/baseImg/ylt.jpg', // 设备图标
      PictWidth: 0, // 图片宽
      PicHeight: 0, // 图片高
      isshowSubmission: true, // 展示提交或修改按钮
    }
    this.isPullBox = false
    this.InterId = this.props.InterId
    this.typeShowPic = false // 判断选择地图或选择图标
    this.isShow = [{ id: 1, us: 1, name: '是' }, { id: 2, us: 0, name: '否' }]
    this.dateFormat = 'YYYY-MM-DD'
  }
  componentDidMount = () => {
    this.picPropsFun()
    this.props.getprimitiveInutuitype()
    // this.props.getuiConfig(this.InterId)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.sinaglInfo.UNIT_BACKGROUND_IMG !== this.props.data.sinaglInfo.UNIT_BACKGROUND_IMG) {
      this.setState({
        PrimitivBacImg: nextProps.data.sinaglInfo.UNIT_BACKGROUND_IMG,
      })
    }
  }
  componentDidUpdate = (prevState) => {
    // if (prevState.data !== this.props.data) {
    //   console.log(this.props)
    // }
    const { primitiveInutuitype, basemapImg, updatebasemap, showDeviceInfo, showUiList, editDeviceInfo, removedeviceinfo } = this.props.data
    if (prevState.data.primitiveInutuitype !== primitiveInutuitype) {
      this.getControlRoads(primitiveInutuitype)
    }
    if (prevState.data.basemapImg !== basemapImg) {
      this.getbasemapImg(basemapImg)
    }
    // if (prevState.data.uiConfig !== uiConfig) {
    //   this.getuiConfig(uiConfig)
    // }
    if (prevState.data.updatebasemap !== updatebasemap) {
      this.getupdatebasemap(updatebasemap)
    }
    if (prevState.data.showDeviceInfo !== showDeviceInfo) {
      this.getshowDeviceInfo(showDeviceInfo)
    }
    if (prevState.data.showUiList !== showUiList) {
      this.getshowUiList(showUiList)
    }
    if (prevState.data.editDeviceInfo !== editDeviceInfo) {
      this.geteditDeviceInfo(editDeviceInfo)
    }
    if (prevState.data.removedeviceinfo !== removedeviceinfo) {
      this.getremovedeviceinfo(removedeviceinfo)
    }
  }
  onChangeRadio = (e) => {
    const { PrimitivBacImg } = this.state
    this.setState({
      value: e.target.value,
      checkInterImgs: PrimitivBacImg,
    })
  }
  onChangDateStart = (date) => { // 出厂日期
    console.log(this.formatDate(new Date(date._d) * 1), '出厂日期')
    this.setState({
      DateProduction: this.formatDate(new Date(date._d) * 1),
    })
  }
  onChangDateEnd = (date) => { // 安装日期
    console.log(this.formatDate(new Date(date._d) * 1), '安装日期')
    this.setState({
      installDate: this.formatDate(new Date(date._d) * 1),
    })
  }
  getControlRoads = (EquipmentList) => {
    this.setState({
      EquipmentList,
    })
  }
  getbasemapImg = (basemapImgs) => {
    this.setState({
      basemapImgs,
    })
  }
  getremovedeviceinfo = (deletePhase) => {
    console.log(deletePhase, '删除')
  }
  getshowDeviceInfo = (showDeviceInfo) => {
    console.log(showDeviceInfo, '弹窗信息')
    if (showDeviceInfo.data.FACTORY_NAME) {
      this.typeShowPic = false
      this.showAddChange = true
      this.imgID = showDeviceInfo.data.ID
      this.imgDeviceId = showDeviceInfo.data.DEVICE_ID
      this.EquipmentConfigurationPic = showDeviceInfo.data.DEVICE_TYPE
      this.uiCodeId = showDeviceInfo.data.UI_ID
      this.uiType = showDeviceInfo.data.UI_TYPE_ID
      const isviews = this.isShow.find(item => item.us === showDeviceInfo.data.IS_VIEW).name
      const MaintenanceUnitNumbers = showDeviceInfo.data.directCodes.find(item => item.ID === showDeviceInfo.data.INSTALL_LOCATION).CODE_NAME
      const sInstallationLocations = showDeviceInfo.data.groups.find(item => item.ID === showDeviceInfo.data.MAINTENANCE_UNIT_ID).USER_GROUP_NAME
      const SubordinateUnitNumbers = showDeviceInfo.data.groups.find(item => item.ID === showDeviceInfo.data.MANAGEMENT_UNIT_ID).USER_GROUP_NAME
      this.setState({
        isDeviceInformation: true,
        isshowSubmission: false,
        EquipmentModel: showDeviceInfo.data.DEVICE_MODEL,
        CorrelationNumber: showDeviceInfo.data.CONFIG_CODE,
        EquipmentNumber: showDeviceInfo.data.DEVICE_CODE,
        FactoryNumber: showDeviceInfo.data.FACTORY_CODE,
        EquipmentName: showDeviceInfo.data.DEVICE_CODE,
        Manufacturer: showDeviceInfo.data.FACTORY_NAME,
        ManufacturerTelephone: showDeviceInfo.data.MAINTENANCE_UNIT_TEL,
        MaintenancePhine: showDeviceInfo.data.FACTORY_TEL,
        EquipmentDetail: showDeviceInfo.data.DETAIL,
        PictWidth: showDeviceInfo.data.UI_WIDTH,
        PicHeight: showDeviceInfo.data.UI_HIGHT,
        EquipmentIcon: `${showDeviceInfo.data.UI_TYPE_ID}/${showDeviceInfo.data.UI_IMAGE_NAME}`,
        SubordinateUnitLsit: showDeviceInfo.data.groups,
        MaintenanceUnitList: showDeviceInfo.data.directCodes,
        SubordinateUnitNumber: showDeviceInfo.data.MANAGEMENT_UNIT_ID,
        sInstallationLocationNumber: showDeviceInfo.data.MAINTENANCE_UNIT_ID,
        MaintenanceUnitNumber: showDeviceInfo.data.INSTALL_LOCATION,
        SubordinateUnit: SubordinateUnitNumbers,
        sInstallationLocation: sInstallationLocations,
        MaintenanceUnit: MaintenanceUnitNumbers,
        WhetherToDisplay: isviews,
        DateProduction: this.formatDate(showDeviceInfo.data.FACTORY_DAY),
        installDate: this.formatDate(showDeviceInfo.data.INSTALL_DAY),
      })
    } else {
      this.setState({
        SubordinateUnitLsit: showDeviceInfo.data.groups,
        MaintenanceUnitList: showDeviceInfo.data.directCodes,
        EquipmentModel: `相位${showDeviceInfo.message}`,
        EquipmentNumber: showDeviceInfo.message,
        SubordinateUnit: showDeviceInfo.data.groups[0].USER_GROUP_NAME,
        sInstallationLocation: showDeviceInfo.data.groups[0].USER_GROUP_NAME,
        MaintenanceUnit: showDeviceInfo.data.directCodes[0].CODE_NAME,
        SubordinateUnitNumber: showDeviceInfo.data.groups[0].ID,
        sInstallationLocationNumber: showDeviceInfo.data.groups[0].ID,
        MaintenanceUnitNumber: showDeviceInfo.data.directCodes[0].ID,
      })
    }
  }
  geteditDeviceInfo = (editDeviceInfo) => {
    console.log(editDeviceInfo, '添加成功')
    editDeviceInfo.then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.handleCancel()
        message.success('添加成功')
      }
    })
  }
  getupdatebasemap = (updatebasemap) => {
    updatebasemap.then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.isMessageinterNone()
      }
      message.info(res.data.message)
    })
  }
  getHasSingalDevice = (item) => {
    new Promise((resolve) => {
      resolve(this.props.getInterdetailIsSignalling(this.InterId))
    }).then(() => {
      const { issignaling } = this.props.data
      if (issignaling) {
        message.info('信号机已存在')
      } else {
        this.showModal(item)
      }
    })
  }
  getshowUiList = (showUiList) => {
    // console.log(showUiList, 'icon')
    this.setState({
      picList: showUiList,
    })
  }
  textInput = () => { // 初始页面信息状态
    this.setState({
      EquipmentModel: '', // 设备型号
      CorrelationNumber: 1, // 关联编号
      EquipmentNumber: '', // 设备编号
      FactoryNumber: 10011, // 出厂编号
      EquipmentName: '相位', // 设备名称
      Manufacturer: '北京博研智通有限公司', // 生产厂家
      sInstallationLocation: '', // 所属单位
      ManufacturerTelephone: 110, // 厂家电话
      DateProduction: this.formatDate(new Date() * 1), // 出厂日期
      installDate: this.formatDate(new Date() * 1), // 安装日期
      SubordinateUnit: '', // 维护单位
      WhetherToDisplay: '是', // 是否显示
      MaintenanceUnit: '', // 设备安装位置
      SubordinateUnitLsit: [], // 所属单位列表
      MaintenanceUnitList: [], // 维护单位列表
      MaintenancePhine: 110, // 维护电话
      EquipmentDetail: '无', // 设备描述
      EquipmentIcon: '/baseImg/ylt.jpg', // 设备图标
      PictWidth: 0, // 图片宽
      PicHeight: 0, // 图片高
    })
  }
  numberBox = () => {
    return this.props.data.monitorInfo.UI_UNIT_CONFIGS.sort((a, b) => b.DEVICE_ID - a.DEVICE_ID)[0].DEVICE_ID
  }
  formatDate = (value) => {// 时间戳转换日期格式方法
    if (value == null) {
      return ''
    }
    const date = new Date(value)
    const y = date.getFullYear()// 年
    let MM = date.getMonth() + 1// 月
    MM = MM < 10 ? (`0${MM}`) : MM
    let d = date.getDate()// 日
    d = d < 10 ? (`0${d}`) : d
    let h = date.getHours()// 时
    h = h < 10 ? (`0${h}`) : h
    let m = date.getMinutes()// 分
    m = m < 10 ? (`0${m}`) : m
    let s = date.getSeconds()// 秒
    s = s < 10 ? (`0${s}`) : s
    return `${y}-${MM}-${d} ${h}:${m}:${s}`
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
    this.typeShowPic = true
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
    }, () => {
      this.props.getbasemapImg()
    })
  }
  checkinterPageBoxNone = () => { // 隐藏选择底图窗口
    this.setState({
      ischeckbtninter: 'none',
      isDeviceInformation: true,
    })
  }
  ischeckListItem = (e, imgs) => { // 点击图片选择路口
    e.stopPropagation()
    this.setState({
      ischeckbtninter: 'none',
      checkInterImgs: imgs,
    })
  }
  ischeckbacitem = (e, imgs, type, id) => {
    this.uiCodeId = id
    e.stopPropagation()
    console.log(id, 'qiaoshai')
    this.setState({
      ischeckbtninter: 'none',
      PictWidth: e.target.width,
      PicHeight: e.target.height,
      isDeviceInformation: true,
      EquipmentIcon: `${type}/${imgs}`,
    })
  }
  saveBasePic = () => { // 保存底图
    this.props.getupdatebasemap(this.InterId, this.state.checkInterImgs)
  }
  uploadPic = () => { // 上传底图

  }
  showModal = (item) => { // 设备信息弹框显示
    this.EquipmentConfigurationPic = item.DEVICE_TYPE // 选择设备图标
    this.setState({
      isDeviceInformation: true,
      isshowSubmission: true,
    }, () => {
      this.props.getshowDeviceInfo(0, this.InterId)
    })
  }
  isFormParameters = () => { // 判断是否选择
    const {
      EquipmentModel, CorrelationNumber, EquipmentNumber, FactoryNumber, EquipmentName, Manufacturer, sInstallationLocation, ManufacturerTelephone,
      DateProduction, installDate, SubordinateUnit, WhetherToDisplay, MaintenanceUnit, MaintenancePhine, EquipmentDetail, EquipmentIcon, PictWidth, PicHeight,
    } = this.state
    if (EquipmentIcon === '/baseImg/ylt.jpg') {
      return message.error('请选择正常图标')
    }
    if (!EquipmentModel) {
      return message.warning('请输入设备型号')
    }
    if (!CorrelationNumber) {
      return message.warning('请输入关联编号')
    }
    if (!EquipmentNumber) {
      return message.warning('请输入设备编号')
    }
    if (!FactoryNumber) {
      return message.warning('请输入出厂编号')
    }
    if (!EquipmentName) {
      return message.warning('请输入设备名称')
    }
    if (!Manufacturer) {
      return message.warning('请输入生产厂家')
    }
    if (!sInstallationLocation) {
      return message.warning('请输入所属单位')
    }
    if (!ManufacturerTelephone) {
      return message.warning('请输入厂家电话')
    }
    if (!DateProduction) {
      return message.warning('请选择出厂日期')
    }
    if (!installDate) {
      return message.warning('请选择安装日期')
    }
    if (!SubordinateUnit) {
      return message.warning('请选择维护单位')
    }
    if (!MaintenancePhine) {
      return message.warning('请输入维护电话')
    }
    if (!WhetherToDisplay) {
      return message.warning('请选择是否显示')
    }
    if (!MaintenanceUnit) {
      return message.warning('请选择设备安装位置')
    }
    if (!EquipmentDetail) {
      return message.warning('请输入设备描述')
    }
    if (!PictWidth) {
      return message.warning('请输入设备宽度')
    }
    if (!PicHeight) {
      return message.warning('请输入设备高度')
    }
  }
  handleOk = async () => { // 保存设备信息
    const addimg = await this.isFormParameters()
    if (!addimg) {
      const {
        EquipmentModel, CorrelationNumber, EquipmentNumber, FactoryNumber, EquipmentName, Manufacturer,
        MaintenanceUnitNumber, sInstallationLocationNumber, ManufacturerTelephone, DateProduction, installDate,
        WhetherToDisplay, SubordinateUnitNumber, MaintenancePhine, EquipmentDetail, PictWidth, PicHeight,
      } = this.state
      const nameId = this.isShow.find(item => item.name === WhetherToDisplay).us
      const obj = {
        id: '',
        pLeft: 10,
        pTop: 10,
        unitId: this.InterId,
        isView: nameId,
        detail: EquipmentDetail,
        uiWidth: PictWidth,
        uiHight: PicHeight,
        uiId: this.uiCodeId,
        configCode: CorrelationNumber,
        deviceInfo: {
          id: '',
          deviceModel: EquipmentModel,
          deviceCode: EquipmentNumber,
          factoryCode: FactoryNumber,
          deviceName: EquipmentName,
          factoryName: Manufacturer,
          installLocation: MaintenanceUnitNumber,
          factoryTel: ManufacturerTelephone,
          factoryDay: DateProduction,
          installDay: installDate,
          userGroup1: sInstallationLocationNumber,
          maintenanceUnitTel: MaintenancePhine,
          userGroup2: SubordinateUnitNumber,
          deviceState: 1,
          flag: 1,
          deviceType: this.EquipmentConfigurationPic,
        },
      }
      this.props.geteditDeviceInfo(obj)
    }
  }
  changeOk = () => {
    const {
      EquipmentModel, CorrelationNumber, EquipmentNumber, FactoryNumber, EquipmentName, Manufacturer,
      MaintenanceUnitNumber, sInstallationLocationNumber, ManufacturerTelephone, DateProduction, installDate,
      WhetherToDisplay, SubordinateUnitNumber, MaintenancePhine, EquipmentDetail, PictWidth, PicHeight,
    } = this.state
    const nameId = this.isShow.find(item => item.name === WhetherToDisplay).us
    const obj = {
      id: this.imgID,
      unitId: this.InterId,
      isView: nameId,
      detail: EquipmentDetail,
      uiWidth: PictWidth,
      uiHight: PicHeight,
      uiId: this.uiCodeId,
      configCode: CorrelationNumber,
      deviceId: this.imgDeviceId,
      deviceInfo: {
        id: this.imgDeviceId,
        deviceModel: EquipmentModel,
        deviceCode: EquipmentNumber,
        factoryCode: FactoryNumber,
        deviceName: EquipmentName,
        factoryName: Manufacturer,
        installLocation: MaintenanceUnitNumber,
        factoryTel: ManufacturerTelephone,
        factoryDay: DateProduction,
        installDay: installDate,
        userGroup1: sInstallationLocationNumber,
        maintenanceUnitTel: MaintenancePhine,
        userGroup2: SubordinateUnitNumber,
        deviceState: 1,
        flag: 1,
        deviceType: this.EquipmentConfigurationPic,
      },
    }
    this.props.geteditDeviceInfo(obj)
  }
  handleCancel = () => { // 设备信息弹框隐藏
    this.textInput()
    this.setState({
      isDeviceInformation: false,
    })
  }
  handDelect = () => { // 设备信息关闭或删除设备
    if (!this.showAddChange) { // 隐藏窗口
      this.handleCancel()
    } else { // 删除设备
      this.props.getremovedeviceinfo(this.imgDeviceId)
    }
  }
  btnNoneStop = (e) => {
    e.stopPropagation()
  }
  checkequipment = (item) => { // 添加新设备
    this.typeShowPic = false
    this.showAddChange = false
    this.uiType = item.ID
    if (item.UI_TYPE_NAME === '信号机') {
      this.getHasSingalDevice(item)
    } else {
      this.showModal(item)
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
  sInstallationLocations = (value) => { // 所属单位
    const { SubordinateUnitLsit } = this.state
    const sInstallationLocation = SubordinateUnitLsit.find(item => item.ID === value)
    this.setState({
      sInstallationLocation: sInstallationLocation.USER_GROUP_NAME,
      sInstallationLocationNumber: sInstallationLocation.ID,
    })
  }
  Isdisplay = (value) => { // 是否显示
    const WhetherToDisplay = this.isShow.find(item => item.id === value)
    this.setState({
      WhetherToDisplay: WhetherToDisplay.name,
    })
  }
  SubordinateUnits = (value) => { // 维护单位
    const { SubordinateUnitLsit } = this.state
    const SubordinateUnit = SubordinateUnitLsit.find(item => item.ID === value)
    this.setState({
      SubordinateUnit: SubordinateUnit.USER_GROUP_NAME,
      SubordinateUnitNumber: SubordinateUnit.ID,
    })
  }
  IssInstallationLocation = (value) => { // 设备安装位置
    const { MaintenanceUnitList } = this.state
    const MaintenanceUnit = MaintenanceUnitList.find(item => item.ID === value)
    this.setState({
      MaintenanceUnit: MaintenanceUnit.CODE_NAME,
      MaintenanceUnitNumber: MaintenanceUnit.ID,
    })
  }
  changValue = (e) => { // 页面所有input事件改变
    const names = e.target.name
    this.setState({
      [names]: e.target.value,
    })
  }
  FormpavementPic = () => { // 点击表单提交页面路面图标
    this.setState({
      ischeckbtninter: 'block',
      isDeviceInformation: false,
    }, () => {
      this.props.getshowUiList(this.uiType)
    })
  }
  render() {
    const {
      interMonitorLeft, value, isMessageinter, ischeckbtninter, checkInterImgs, isDeviceInformation, PrimitivBacImg, EquipmentList, basemapImgs,
      SubordinateUnitLsit, MaintenanceUnitList, EquipmentModel, CorrelationNumber, EquipmentNumber, FactoryNumber, EquipmentName, Manufacturer,
      ManufacturerTelephone, DateProduction, installDate, SubordinateUnit, WhetherToDisplay, sInstallationLocation, MaintenanceUnit, MaintenancePhine,
      EquipmentDetail, EquipmentIcon, PictWidth, PicHeight, picList, isshowSubmission,
    } = this.state
    // const { confirm } = Modal
    const { Option } = Select
    const { TextArea } = Input
    const { UI_UNIT_CONFIGS } = this.props.data.monitorInfo
    const { SIGNALSYSTEM } = this.props.data.sinaglInfo
    return (
      <div className={styles.PrimitiveBox}>
        <div ref={(PrimitiveInsideBox) => { this.PrimitiveInsideBox = PrimitiveInsideBox }} className={styles.PrimitiveInsideBox}>
          {
            UI_UNIT_CONFIGS && UI_UNIT_CONFIGS.length > 0 ?
              UI_UNIT_CONFIGS.map((item) => {
                return (
                  <DeviceDetails key={item.DEVICE_CODE} InterIds={this.InterId} imgMsg={item} system={SIGNALSYSTEM} />
                )
              }) : null
          }
          <img src={`http://192.168.1.123:26001/atms/imgs/baseImg/${PrimitivBacImg}`} draggable="false" alt="" />
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
            {
              this.typeShowPic ?
                <ul onClick={this.btnNoneStop} className={styles.checkinterPageBox}>
                  {
                    this.typeShowPic && basemapImgs && basemapImgs.map(item => (
                      <li key={item}>
                        <img
                          onClick={e => this.ischeckListItem(e, item)}
                          src={`http://192.168.1.123:26001/atms/imgs/baseImg/${item}`}
                          alt=""
                        />
                      </li>
                    ))
                  }
                </ul> : null
            }
            {
              !this.typeShowPic ?
                <ul onClick={this.btnNoneStop} className={styles.checkinterPageBoxTwo}>
                  {
                    picList && picList.map(item => (
                      <img
                        key={item.ID}
                        onClick={e => this.ischeckbacitem(e, item.UI_IMAGE_NAME, item.UI_TYPE_ID, item.ID)}
                        src={`http://192.168.1.123:26001/atms/imgs/${item.UI_TYPE_ID}/${item.UI_IMAGE_NAME}`}
                        alt=""
                      />
                    ))
                  }
                </ul> : null
            }
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
                  <span><img src={`http://192.168.1.123:26001/atms/imgs/baseImg/${checkInterImgs}`} alt="" /></span>
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
            bodyStyle={{ backgroundColor: 'rgba(61, 87, 114, .8)' }}
            onCancel={this.handleCancel}
            footer={null}
            width="720px"
          >
            <div className={styles.mountingTable}>
              <div className={styles.mountingTbody}>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div><span>*</span>设备型号</div><div><Input name="EquipmentModel" onChange={this.changValue} value={EquipmentModel} /></div></div>
                  <div className={styles.mountingTd}><div>关联编号</div><div><Input name="CorrelationNumber" onChange={this.changValue} value={CorrelationNumber} /></div></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div><span>*</span>设备编号</div><div><Input name="EquipmentNumber" onChange={this.changValue} value={EquipmentNumber} /></div></div>
                  <div className={styles.mountingTd}><div>出厂编号</div><div><Input name="FactoryNumber" onChange={this.changValue} value={FactoryNumber} /></div></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div><span>*</span>设备名称</div><div><Input name="EquipmentName" onChange={this.changValue} value={EquipmentName} /></div></div>
                  <div className={styles.mountingTd}><div>生产厂家</div><div><Input name="Manufacturer" onChange={this.changValue} value={Manufacturer} /></div></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div>设备安装位置</div>
                    <div>
                      <Select
                        style={{ width: '100%' }}
                        value={MaintenanceUnit || ''}
                        // optionFilterProp="children"
                        onChange={this.IssInstallationLocation}
                      >
                        {
                          MaintenanceUnitList && MaintenanceUnitList.map(item =>
                            <Option value={item.ID} key={item.ID}>{item.CODE_NAME}</Option>)}
                      </Select>
                    </div>
                  </div>
                  <div className={styles.mountingTd}><div>生厂厂家联系方式</div><div><Input name="ManufacturerTelephone" onChange={this.changValue} value={ManufacturerTelephone} /></div></div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div>出厂日期</div>
                    <div>
                      <DatePicker style={{ width: '177px' }} value={moment(this.formatDate(DateProduction), this.dateFormat)} format={this.dateFormat} onChange={this.onChangDateStart} />
                      {/*  */}
                    </div>
                  </div>
                  <div className={styles.mountingTd}><div>安装日期</div>
                    <div>
                      <DatePicker style={{ width: '177px' }} value={moment(installDate, this.dateFormat)} format={this.dateFormat} onChange={this.onChangDateEnd} />
                    </div>
                  </div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div>所属单位</div>
                    <div>
                      <Select
                        style={{ width: '100%' }}
                        value={sInstallationLocation || ''}
                        // optionFilterProp="children"
                        onChange={this.sInstallationLocations}
                      >
                        {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                          <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
                      </Select>
                    </div>
                  </div>
                  <div className={styles.mountingTd}><div>是否显示</div>
                    <div>
                      <Select
                        value={WhetherToDisplay || ''}
                        style={{ width: '100%' }}
                        onChange={this.Isdisplay}
                      >
                        {this.isShow.map(item =>
                          <Option value={item.id} key={item.id}>{item.name}</Option>)}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div>维护单位</div>
                    <div>
                      <Select
                        style={{ width: '100%' }}
                        value={SubordinateUnit || ''}
                        // optionFilterProp="children"
                        onChange={this.SubordinateUnits}
                      >
                        {SubordinateUnitLsit && SubordinateUnitLsit.map(item =>
                          <Option value={item.ID} key={item.ID}>{item.USER_GROUP_NAME}</Option>)}
                      </Select>
                    </div>
                  </div>
                  <div className={styles.mountingTd}><div>维护电话</div><div><Input name="MaintenancePhine" onChange={this.changValue} value={MaintenancePhine} /></div></div>
                </div>
                <div className={`${styles.mountingTr} ${styles.mountingTds}`}>
                  <div className={styles.mountingTd}><div>描述</div><div><TextArea rows={2} name="EquipmentDetail" onChange={this.changValue} value={EquipmentDetail} /></div></div>
                  <div className={styles.mountingTd}><div><span>*</span>请选择正常图标<br />(点击图片选择)</div>
                    <div className={styles.PrimitiveBacimg}><img onClick={this.FormpavementPic} src={`http://192.168.1.123:26001/atms/imgs/${EquipmentIcon}`} alt="" /></div>
                  </div>
                </div>
                {/* {`${styles.operationTop_box} ${styles.operationTopRightFor}`} */}
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><div><span>*</span>宽</div><div><Input name="PictWidth" onChange={this.changValue} type="number" value={PictWidth} /></div></div>
                  <div className={styles.mountingTd}><div><span>*</span>高</div><div><Input name="PicHeight" onChange={this.changValue} type="number" value={PicHeight} /></div></div>
                </div>
              </div>
              <div className={styles.mountingTableBottom}>
                <div>
                  <span className={styles.mountingTableBottom_left}>
                    {
                      isshowSubmission ? <b onClick={this.handleOk}>提交</b> : <b onClick={this.changeOk}>修改</b>
                    }
                  </span>
                  <span onClick={this.handDelect} className={styles.mountingTableBottom_center}>删除</span>
                  <span onClick={this.handleCancel} className={styles.mountingTableBottom_right}>取消</span>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div >
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
    getbasemapImg: bindActionCreators(getbasemapImg, dispatch),
    getupdatebasemap: bindActionCreators(getupdatebasemap, dispatch),
    getshowDeviceInfo: bindActionCreators(getshowDeviceInfo, dispatch),
    getshowUiList: bindActionCreators(getshowUiList, dispatch),
    geteditDeviceInfo: bindActionCreators(geteditDeviceInfo, dispatch),
    getremovedeviceinfo: bindActionCreators(getremovedeviceinfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(Primitive)
