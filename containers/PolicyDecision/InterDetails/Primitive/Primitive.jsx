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
    }
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
  ischeckListItem = (e) => {
    e.stopPropagation()
    console.log(1)
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
    } = this.state
    return (
      <div className={styles.PrimitiveBox}>
        <div className={styles.PrimitiveInsideBox}>
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
                  <span><img src={require('./img/equipment_for.png')} alt="" /></span>
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
                <span>保存</span>
                <span onClick={this.isMessageinterNone}>取消</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Primitive
