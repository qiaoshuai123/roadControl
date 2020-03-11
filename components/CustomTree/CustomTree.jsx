import React from 'react'
import { Icon, Tree } from 'antd'

import styles from './CustomTree.scss'

class CustomTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {}
  render() {
    const { TreeNode } = Tree
    return (
      <div className={styles.treeWrapper}>
        <ul className={styles.treeList}>
          <li className={styles.treeLi}>
            <span className={styles.treeIcon}>
              <Icon type="folder-open" theme="filled" />
            </span>
            <span className={styles.treeNode}>美兰区</span>
            <ul className={styles.childTree}>
              <li className={styles.childLi}>
                <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                <span className={styles.childNode}>海淀五西路</span>
                <ul className={styles.childTree}>
                  <li className={styles.childLi}>
                    <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                    <span className={styles.childNode}>海淀五西路世纪大道</span>
                  </li>
                  <li className={styles.childLi}>
                    <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                    <span className={styles.childNode}>海淀五西路世纪大道</span>
                  </li>
                  <li className={styles.childLi}>
                    <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                    <span className={styles.childNode}>海淀五西路世纪大道</span>
                  </li>
                  <li className={styles.childLi}>
                    <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                    <span className={styles.childNode}>海淀五西路世纪大道</span>
                  </li>
                </ul>
              </li>
              <li className={styles.childLi}>
                <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                <span className={styles.childNode}>海淀五东路</span>
                <ul className={styles.childTree}>
                  <li className={styles.childLi}>
                    <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                    <span className={styles.childNode}>海淀五东路世纪大道</span>
                  </li>
                </ul>
              </li>
              <li className={styles.childLi}>
                <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                <span className={styles.childNode}>海淀五东路</span>
                <ul className={styles.childTree}>
                  <li className={styles.childLi}>
                    <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                    <span className={styles.childNode}>海淀五东路世纪大道</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className={styles.treeLi}>
            <span className={styles.treeIcon}>
              <Icon type="folder-open" theme="filled" />
            </span>
            <span className={styles.treeNode}>龙华区</span>
            <ul className={styles.childTree}>
              <li className={styles.childLi}>
                <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                <span className={styles.childNode}>龙华路</span>
                <ul className={styles.childTree}>
                  <li className={styles.childLi}>
                    <span className={styles.childIcon}><Icon type="plus-circle" /></span>
                    <span className={styles.childNode}>龙华路世纪大道</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        {/* <Tree
          showLine
          showIcon
          switcherIcon={<Icon type="plus-circle" />}
          defaultExpandedKeys={['0-0-0', '0-0-1', '0-0-2']}
        >
          <TreeNode title="1" key="0-0">
            <TreeNode title="1-0" key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" />
              <TreeNode title="leaf" key="0-0-0-1" />
              <TreeNode title="leaf" key="0-0-0-2" />
            </TreeNode>
            <TreeNode title="1-1" key="0-0-1">
              <TreeNode title="leaf" key="0-0-1-0" />
            </TreeNode>
          </TreeNode>
          <TreeNode title="2" key="0-1">
            <TreeNode title="2-0" key="0-1-0">
              <TreeNode title="leaf" key="0-1-0-0" />
              <TreeNode title="leaf" key="0-1-0-1" />
              <TreeNode title="leaf" key="0-1-0-2" />
            </TreeNode>
            <TreeNode title="2-1" key="0-1-1">
              <TreeNode title="leaf" key="0-1-1-0" />
            </TreeNode>
          </TreeNode>
        </Tree> */}
      </div>
    )
  }
}

export default CustomTree
