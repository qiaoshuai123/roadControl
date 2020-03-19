import React, { Component } from 'react'
import styles from './Form.scss'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { name, headOne, headTwo, headTre } = this.props
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
              <div className={styles.mountingTr}>
                <div className={styles.mountingTd}>青秀区</div>
                <div className={styles.mountingTd}>衡阳北一巷</div>
                <div className={styles.mountingTd}>2019-07-12 16:29:39</div>
              </div>
              <div className={styles.mountingTr}>
                <div className={styles.mountingTd}>居中</div>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
              </div>
              <div className={styles.mountingTr}>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
              </div>
              <div className={styles.mountingTr}>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
              </div>
              <div className={styles.mountingTr}>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
              </div>
              <div className={styles.mountingTr}>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
              </div>
              <div className={styles.mountingTr}>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
              </div>
              <div className={styles.mountingTr}>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
                <div className={styles.mountingTd}>*************</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Form
