import React, { Component } from 'react'
import { Select, Input, Icon } from 'antd'
import usPng from '../img/u148.png'
import asPng from '../img/u149.png'
import leftpage from '../img/leftpage.png'
import styles from './Areaedit.scss'


class Areaedit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      MaintenancePhine: '北三环',
      Nameoftrunkline: '北三环地区信息',
      Operationcycle: '1',
      Trunkmileage: '20km',
      Trunkmileager: '20km',
      ExecutionPeriod: '7',
      Periodend: '12',
      CoordinatedDfference: '18',
      RelativeDistance: '15',
      averageVelocity: '35km',
      GreeningRatio: '35',
      time: '25',
      GreeningRatios: '45',
      times: '30',
      addGreenMeg: false, // 添加绿波方案
      addroader: false, // 添加路口
      MaintenanceName: '北三环',
      EquipmentDetail: '无',
      MaintenancePhines: '15',
      phasedifference: '0',
    }
  }
  componentDidMount() {
  }
  closeMeg = () => {
    this.props.closeMegFa()
  }
  addGreenMegsBoxers = () => { // 展示添加路口
    this.setState({
      addroader: true,
    })
  }
  quicklySecretTask = () => {
    this.setState({
      addGreenMeg: true,
    })
  }
  closeAddroaders = () => { // 关闭添加路口
    this.setState({
      addroader: false,
    })
  }
  closeaddGreenMegsBox = () => { // 关闭添加/修改绿波方案
    this.setState({
      addGreenMeg: false,
    })
  }
  render() {
    const {
      MaintenancePhine, Nameoftrunkline, Operationcycle, Trunkmileage, Trunkmileager,
      ExecutionPeriod, CoordinatedDfference, RelativeDistance, averageVelocity,
      GreeningRatio, time, GreeningRatios, times, Periodend, addGreenMeg, addroader,
      MaintenanceName, EquipmentDetail, MaintenancePhines, phasedifference,
    } = this.state
    const { Option } = Select
    const { TextArea } = Input
    return (
      <div className={styles.AreaeditBox}>
        <p className={styles.lvBox_header}>
          <b />
          <span className={styles.spanLeft}>绿波方案信息</span>
          <span className={styles.spanRight} onClick={this.closeMeg}><Icon type="close" /></span>
        </p>
        <div className={styles.nav}>
          <div><span>干线名称:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
          <div><span>备注描述:</span> <Input name="Nameoftrunkline" style={{ width: '200px' }} onChange={this.changValue} value={Nameoftrunkline} /></div>
          <div>
            <button className={styles.goBtn}>立即执行</button>
            <button className={styles.goProgramme}>启动方案</button>
            <button className={styles.timeInDiagram}>时距图</button>
            <button className={styles.Preservation}>保存</button>
          </div>
        </div>
        <div className={styles.contain}>
          <div className={styles.contain_head}>
            <div><span>路口运行周期:</span><Input name="Operationcycle" style={{ width: '90px' }} onChange={this.changValue} value={Operationcycle} /></div>
            <div><span>干线总里程:</span><Input name="Trunkmileage" style={{ width: '90px' }} onChange={this.changValue} value={Trunkmileage} /></div>
            <div><span>干线总里程:</span><Input name="Trunkmileager" style={{ width: '90px' }} onChange={this.changValue} value={Trunkmileager} /></div>
            <div><span>执行时段:</span><Input name="ExecutionPeriod" style={{ width: '90px' }} onChange={this.changValue} value={ExecutionPeriod} /><span className={styles.spans}>至</span> <Input name="Periodend" style={{ width: '90px' }} onChange={this.changValue} value={Periodend} /></div>
            {this.props.addList && <div onClick={this.quicklySecretTask} className={styles.btnPopup}>添加&gt;&gt;</div>}
          </div>
          <div className={styles.contain_bigBox}>
            <div className={styles.contain_box}>
              <div className={styles.conBox_top}>
                <div className={styles.conBox_top_left}>
                  <span>01</span>
                  <span>青秀中新(IP:45.6.218.114)</span>
                </div>
                <div className={styles.conBox_top_right}>x</div>
              </div>
              <div className={styles.conBox_bom}>
                <div className={styles.conBox_bom_left}>
                  <img src={leftpage} alt="" />
                </div>
                <div className={styles.conBox_bom_right}>
                  <div className={styles.conBox_bom_right_top}>
                    <div><span>相序:</span>
                      <Select defaultValue="1" style={{ width: '160px' }} onChange={this.cityChange}>
                        <Option value="1">1</Option>
                      </Select>
                    </div>
                    <div><span>协调相位:</span><b><img src={usPng} alt="" /></b></div>
                    <div><span>协调相位差:</span><Input name="CoordinatedDfference" style={{ width: '90px' }} onChange={this.changValue} value={CoordinatedDfference} /></div>
                    <div><span>相对距离:</span><Input name="RelativeDistance" style={{ width: '90px' }} onChange={this.changValue} value={RelativeDistance} /></div>
                    <div><span>平均速度:</span><Input name="averageVelocity" style={{ width: '90px' }} onChange={this.changValue} value={averageVelocity} /></div>
                  </div>
                  <div className={styles.conBox_bom_right_mid}>
                    <dl>
                      <dt><img src={asPng} alt="" /></dt>
                      <dd>
                        <li><span>绿信比(%):</span><Input name="GreeningRatio" style={{ width: '90px' }} onChange={this.changValue} value={GreeningRatio} /></li>
                        <li><span>时间(秒):</span><Input name="time" style={{ width: '90px' }} onChange={this.changValue} value={time} /></li>
                      </dd>
                    </dl>
                    <dl>
                      <dt><img src={usPng} alt="" /></dt>
                      <dd>
                        <li><span>绿信比(%):</span><Input name="GreeningRatios" style={{ width: '90px' }} onChange={this.changValue} value={GreeningRatios} /></li>
                        <li><span>时间(秒):</span><Input name="times" style={{ width: '90px' }} onChange={this.changValue} value={times} /></li>
                      </dd>
                    </dl>
                  </div>
                  <div className={styles.conBox_bom_right_bom}>
                    <input type="checkbox" name="" id="" /><span>绿信比按交通数据自动分配</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {addGreenMeg &&
          <div className={styles.addGreenMegs}>
            <div className={styles.addGreenMegsBox}>
              <p>添加/修改绿波方案<span onClick={this.closeaddGreenMegsBox}><Icon type="close" /></span></p>
              <p>绿波方案基本信息</p>
              <div className={styles.information}>
                <div><span>协调干线编号</span><Input style={{ width: '200px' }} name="MaintenancePhines" onChange={this.changValue} value={MaintenancePhines} /></div>
                <div><span>协调干线名称</span><Input style={{ width: '200px' }} name="MaintenanceName" onChange={this.changValue} value={MaintenanceName} /></div>
                <button>保存方案</button>
              </div>
              <div className={styles.Scheme}>
                <span>协调方案描述</span><TextArea rows={2} style={{ width: '200px', resize: 'none' }} name="EquipmentDetail" onChange={this.changValue} value={EquipmentDetail} />
              </div>
              <div className={styles.addGreenMegsBoxer}>
                <div onClick={this.addGreenMegsBoxers} className={styles.addGreenMegsBoxer_left}>
                  <Icon type="plus" />
                </div>
              </div>
            </div>
            {
              addroader &&
              <div className={styles.addroaders}>
                <div>添加路口 <b onClick={this.closeAddroaders} className={styles.Icos}><Icon type="close" /></b></div>
                <div><span>路口名称:</span>
                  <Select defaultValue="建政古城" style={{ width: '160px' }} onChange={this.cityChange}>
                    <Option value="建政古城">建政古城</Option>
                  </Select>
                </div>
                <div><span>协调相位:</span>
                  <Select defaultValue="未找到结果" style={{ width: '160px' }} onChange={this.cityChange}>
                    <Option value="未找到结果">未找到结果</Option>
                  </Select>
                </div>
                <div>
                  <span className={styles.spansico}>相位图显示:</span>
                  <b className={styles.icobs}><img src={usPng} alt="" /></b>
                </div>
                <div>
                  <span>相位差:</span><Input style={{ width: '160px' }} name="phasedifference" onChange={this.changValue} value={phasedifference} />
                </div>
                <div className={styles.lastdiv}>
                  <span onClick={this.closeAddroaders}>取消</span>
                  <span>保存</span>
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default Areaedit
