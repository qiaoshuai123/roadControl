import React, { Component } from 'react'
import { Pagination, Button, Input, Icon } from 'antd'
import styles from './Timing.scss'
import Header from '../Header/Header'
import TimingMessage from './TimingMessage/TimingMessage'


class Timing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
  }
  // 改变关键字内容
  changeFont = (e) => {
    console.log(e.target.value)
  }
  // 改变所属区域内容
  changeRegion = () => {

  }
  // 改变路口内容
  changeIntersection = () => {

  }
  // 改变信号机控制系统内容
  changeSignal = () => {

  }
  // 点击查询
  btnSearth = () => {

  }
  // 点击分页器
  pageChange = (page, pageSize) => {

  }
  render() {
    return (
      <div className={styles.timingWrapper}>
        <Header {...this.props} />
        <div className={styles.timingcontainer}>
          <h3>配时管理</h3>
          <div className={styles.searchBox}>
            <div><span>关键字</span><Input onChange={this.changeFont} placeholder="" /></div>
            <div><span>所属区域</span><Input onChange={this.changeRegion} placeholder="" /></div>
            <div><span>所属路口</span><Input onChange={this.changeIntersection} placeholder="" /></div>
            <div><span>信号机控制系统</span><Input onChange={this.changeSignal} placeholder="" /></div>
            <div><Button onClick={this.btnSearth} type="primary">查询</Button></div>
          </div>
          <div className={styles.goExcal}>
            <span>统计结果</span><Button type="primary">导出表格</Button>
          </div>
          <div className={styles.mountingManage}>
            <div className={styles.mountingTable}>
              <div className={styles.mountingThead}>
                <div className={styles.mountingTh} />
                <div className={styles.mountingTh}>安装点名称</div>
                <div className={styles.mountingTh}>所属高速路</div>
                <div className={styles.mountingTh}>桩号</div>
                <div className={styles.mountingTh}>经度</div>
                <div className={styles.mountingTh}>纬度</div>
                <div className={styles.mountingTh}>描述</div>
                <div className={styles.mountingTh}>操作</div>
              </div>
              <div className={styles.mountingTbody}>
                <div>
                  <div className={styles.mountingTr}>
                    <div className={styles.mountingTd}><span><Icon type="plus" /></span></div>
                    <div className={styles.mountingTd}>*************</div>
                    <div className={styles.mountingTd}>*************</div>
                    <div className={styles.mountingTd}>*************</div>
                    <div className={styles.mountingTd}>*************</div>
                    <div className={styles.mountingTd}>*************</div>
                    <div className={styles.mountingTd}>*************</div>
                    <div className={styles.mountingTd}>
                      <span className={styles.deviceMsg}>申请方案</span>
                      <span className={styles.deviceMsg}>路口监视</span>
                    </div>
                  </div>
                  <div className={styles.mountingTrbox}>
                    <TimingMessage />
                  </div>
                </div>
                <div className={styles.mountingTr}>
                  <div className={styles.mountingTd}><span><Icon type="plus" /></span></div>
                  <div className={styles.mountingTd}>*************</div>
                  <div className={styles.mountingTd}>*************</div>
                  <div className={styles.mountingTd}>*************</div>
                  <div className={styles.mountingTd}>*************</div>
                  <div className={styles.mountingTd}>*************</div>
                  <div className={styles.mountingTd}>*************</div>
                  <div className={styles.mountingTd}>
                    <span className={styles.deviceMsg}>申请方案</span>
                    <span className={styles.deviceMsg}>路口监视</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.paginationBox}>
            <Pagination size="small" onChange={this.pageChange} total={50} showQuickJumper />
            <span>共50条</span>
            <span>15条/页</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Timing
