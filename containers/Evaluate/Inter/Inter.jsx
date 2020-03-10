import React from 'react'
import { Select, Icon, Tree } from 'antd'

import Header from '../Header/Header'
import EvaNav from '../Nav/Nav'
import InterMsg from './InterMsg/InterMsg'

import styles from './Inter.scss'

class Inter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {

  }
  render() {
    const { Option } = Select
    const { TreeNode, DirectoryTree } = Tree
    return (
      <div className={styles.InterWrapper}>
        <Header />
        <EvaNav />
        <div className={styles.interContainer}>
          <div className={styles.interTreeBox}>
            <div className={styles.interSearch}>
              <Select defaultValue="1">
                <Option key="1">贵阳市</Option>
                <Option key="2">南阳市</Option>
              </Select>
              <span className={styles.searchBox}>
                <input className={styles.searchInput} type="text" placeholder="请输入你要搜索的内容" />
                <Icon className={styles.searchIcon} type="search" />
              </span>
            </div>
            <div className={styles.interTree}>
              <DirectoryTree multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                <TreeNode title="parent 0" key="0-0">
                  <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                  <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                </TreeNode>
                <TreeNode title="parent 1" key="0-1">
                  <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                  <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                </TreeNode>
              </DirectoryTree>
            </div>
          </div>
          <div className={styles.interChartsMsg}>
            <h3 className={styles.interName}>当前路口 : 世纪大道与海淀五西路</h3>
            <InterMsg />
          </div>
        </div>
      </div>
    )
  }
}

export default Inter
