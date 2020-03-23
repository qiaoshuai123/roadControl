import React, { Component } from 'react'
import styles from './Form.scss'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { name, headOne, headTwo, headTre, datas } = this.props
    return (
      <div className={styles.formBox}>
        <p className={styles.pTop}>{name}</p>
        <div className={styles.mountingManage}>
          <div className={styles.mountingTable}>
            <div className={styles.mountingThead}>
              <div className={styles.mountingTh}>{headOne}</div>
              <div className={styles.mountingTh}>{headTwo}</div>
              <div className={styles.mountingTh}>{headTre}</div>
            </div>
            <div className={styles.mountingTbody}>
              {
                datas.map((item) => {
                  return (
                    <div className={styles.mountingTr} key={item.ID}>
                      <div className={styles.mountingTd}>{item.DISTRICT_NAME}</div>
                      <div className={styles.mountingTd}>{item.UNIT_NAME}</div>
                      <div className={styles.mountingTd}>{item.CONTROL_TIME}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Form
