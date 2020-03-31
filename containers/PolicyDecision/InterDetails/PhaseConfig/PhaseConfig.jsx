import React from 'react'
import { Icon, Input, Checkbox } from 'antd'
import styles from './PhaseConfig.scss'

class PhaseConfig extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidmount = () => { }
  closePhaseAdd = () => { // 传递给父级关闭弹框
    this.props.closePhaseAdd()
  }
  PhaseAdd = () => { // 添加相位

  }
  PhaseUpload = () => { // 上载相位

  }
  PhaseModify = () => { // 修改相位

  }
  PhaseDelete = () => { // 删除相位

  }
  ChangeCheck = (e) => { // 切换多选
    console.log(`checked = ${e.target.checked}`)
  }
  render() {
    return (
      <div className={styles.phaseConfigBox}>
        {/* <div className={styles.messagePhase}>
          <div className={styles.messagePhaseBox}>
            <div className={styles.phaseConfigBox_top}>
              <div className={styles.phaseConfigBoxTop_left}>相位配置</div>
              <div className={styles.phaseConfigBoxTop_right} onClick={this.closePhaseAdd}><Icon type="close" /></div>
            </div>
            <div className={styles.messagePhaseBox_center}>
              <div><span>相位编号:</span><Input /></div>
              <div><span>相位名称:</span><Input /></div>
              <div><span>相位特征:</span><Input /></div>
            </div>
            <ul className={styles.phaseConfigBox_pavement}>
              <li><Checkbox onChange={this.ChangeCheck}>北</Checkbox></li>
            </ul>
          </div>
        </div> */}
        <div className={styles.phaseConfigBox_top}>
          <div className={styles.phaseConfigBoxTop_left}>相位配置</div>
          <div className={styles.phaseConfigBoxTop_right} onClick={this.closePhaseAdd}><Icon type="close" /></div>
        </div>
        <div className={styles.phaseConfigBox_center}>
          <div onChange={this.PhaseAdd} className={styles.phaseConfigBoxCenter_left}>
            添加
          </div>
          <div className={styles.phaseConfigBoxCenter_left}>
            上载
          </div>
        </div>
        <div className={styles.phaseConfigBox_box}>
          <div className={styles.mountingThead}>
            <div className={styles.mountingTh}>相位编号</div>
            <div className={styles.mountingTh}>相位名称</div>
            <div className={styles.mountingTh}>相位特征</div>
            <div className={`${styles.mountingTh} ${styles.mountingcar}`}>所属车道</div>
            <div className={`${styles.mountingTh} ${styles.mountingTwo}`} > 相位放行人道方向</div>
            <div className={`${styles.mountingTh} ${styles.mountingTwo}`}> 相位关键渠化</div>
            <div className={`${styles.mountingTh} ${styles.mountingTwo}`}> 操作</div>
          </div>
          <div className={styles.mountingTbody}>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
            <div className={styles.mountingTr}>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={styles.mountingTd}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>*****</div>
              <div className={`${styles.mountingTd} ${styles.mountingTwo}`}>
                <div className={styles.deviceMsg}><span>修改</span></div>
                <div className={styles.deviceMsg}><span>删除</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PhaseConfig
