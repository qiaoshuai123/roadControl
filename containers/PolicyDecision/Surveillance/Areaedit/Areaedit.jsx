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
      MaintenancePhine: '',
    }
  }
  componentDidMount() {
  }
  closeMeg = () => {
    this.props.closeMegFa()
  }
  render() {
    const { MaintenancePhine } = this.state
    const { Option } = Select
    return (
      <div className={styles.AreaeditBox}>
        <p className={styles.lvBox_header}>
          <b />
          <span className={styles.spanLeft}>绿波方案信息</span>
          <span className={styles.spanRight} onClick={this.closeMeg}><Icon type="close" /></span>
        </p>
        <div className={styles.nav}>
          <div><span>干线名称:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
          <div><span>备注描述:</span> <Input name="MaintenancePhine" style={{ width: '200px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
          <div>
            <button className={styles.goBtn}>立即执行</button>
            <button className={styles.goProgramme}>启动方案</button>
            <button className={styles.timeInDiagram}>时距图</button>
            <button className={styles.Preservation}>保存</button>
          </div>
        </div>
        <div className={styles.contain}>
          <div className={styles.contain_head}>
            <div><span>路口运行周期:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
            <div><span>干线总里程:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
            <div><span>干线总里程:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
            <div><span>执行时段:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} />至<Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
            <div className={styles.btnPopup}>添加&gt;&gt;</div>
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
                      <Select defaultValue="贵阳" style={{ width: '160px' }} onChange={this.cityChange}>
                        <Option value="贵阳">贵阳</Option>
                      </Select>
                    </div>
                    <div><span>协调相位:</span><b><img src={usPng} alt="" /></b></div>
                    <div><span>协调相位差:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
                    <div><span>相对距离:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
                    <div><span>平均速度:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
                  </div>
                  <div className={styles.conBox_bom_right_mid}>
                    <dl>
                      <dt><img src={asPng} alt="" /></dt>
                      <dd>
                        <li><span>绿信比(%):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                        <li><span>时间(秒):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                      </dd>
                    </dl>
                    <dl>
                      <dt><img src={usPng} alt="" /></dt>
                      <dd>
                        <li><span>绿信比(%):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                        <li><span>时间(秒):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                      </dd>
                    </dl>
                  </div>
                  <div className={styles.conBox_bom_right_bom}>
                    <input type="checkbox" name="" id="" /><span>绿信比按交通数据自动分配</span>
                  </div>
                </div>
              </div>
            </div>
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
                      <Select defaultValue="贵阳" style={{ width: '160px' }} onChange={this.cityChange}>
                        <Option value="贵阳">贵阳</Option>
                      </Select>
                    </div>
                    <div><span>协调相位:</span><b><img src={usPng} alt="" /></b></div>
                    <div><span>协调相位差:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
                    <div><span>相对距离:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
                    <div><span>平均速度:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
                  </div>
                  <div className={styles.conBox_bom_right_mid}>
                    <dl>
                      <dt><img src={asPng} alt="" /></dt>
                      <dd>
                        <li><span>绿信比(%):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                        <li><span>时间(秒):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                      </dd>
                    </dl>
                    <dl>
                      <dt><img src={usPng} alt="" /></dt>
                      <dd>
                        <li><span>绿信比(%):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                        <li><span>时间(秒):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                      </dd>
                    </dl>
                  </div>
                  <div className={styles.conBox_bom_right_bom}>
                    <input type="checkbox" name="" id="" /><span>绿信比按交通数据自动分配</span>
                  </div>
                </div>
              </div>
            </div>
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
                      <Select defaultValue="贵阳" style={{ width: '160px' }} onChange={this.cityChange}>
                        <Option value="贵阳">贵阳</Option>
                      </Select>
                    </div>
                    <div><span>协调相位:</span><b><img src={usPng} alt="" /></b></div>
                    <div><span>协调相位差:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
                    <div><span>相对距离:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
                    <div><span>平均速度:</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></div>
                  </div>
                  <div className={styles.conBox_bom_right_mid}>
                    <dl>
                      <dt><img src={asPng} alt="" /></dt>
                      <dd>
                        <li><span>绿信比(%):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                        <li><span>时间(秒):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                      </dd>
                    </dl>
                    <dl>
                      <dt><img src={usPng} alt="" /></dt>
                      <dd>
                        <li><span>绿信比(%):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
                        <li><span>时间(秒):</span><Input name="MaintenancePhine" style={{ width: '90px' }} onChange={this.changValue} value={MaintenancePhine} /></li>
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
      </div>
    )
  }
}

export default Areaedit
