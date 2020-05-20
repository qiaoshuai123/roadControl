import React from 'react'
import { Select, Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../Header/Header'
import InterMsg from '../InterMsg/InterMsg'
import CustomTree from '../../../components/CustomTree/CustomTree'
import { getInterDataTree } from '../../../actions/evaluate'

import styles from './Artery.scss'

class Artery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interTree: null,
    }
    this.arteries = ['干线平均延误时间', '干线平均速度', '干线停车次数']
    this.chars_id = {
      evlregion_id: '460107',
    }
  }
  componentDidMount = () => {
    this.props.getInterDataTree().then((res) => {
      console.log(res)
      const { code, data } = res.data
      if (code === '1') {
        this.setState({ interTree: data }, () => {
          console.log(this.state.interTree)
        })
      }
    })
  }
  componentDidUpdate = (prevProps) => {
  }
  render() {
    const { Option } = Select
    return (
      <div className={styles.InterWrapper}>
        <Header {...this.props} />
        <div className={styles.interContainer}>
          <div className={styles.interTreeBox}>
            <div className={styles.interSearch}>
              <Select defaultValue="1">
                <Option key="1">贵阳市</Option>
              </Select>
              <span className={styles.searchBox}>
                <input className={styles.searchInput} type="text" placeholder="请输入你要搜索的内容" />
                <Icon className={styles.searchIcon} type="search" />
              </span>
            </div>
            <div className={styles.interTree}>
              {
                this.state.interTree &&
                <CustomTree treeData={this.state.interTree} />
              }
            </div>
          </div>
          <div className={styles.interChartsMsg}>
            <h3 className={styles.interName}>当前干线 : </h3>
            {
              this.arteries.map((item) => {
                return (
                  <InterMsg msgName={item} key={item} />
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getInterDataTree: bindActionCreators(getInterDataTree, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(Artery)
