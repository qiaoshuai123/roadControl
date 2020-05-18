import React from 'react'
import { Icon } from 'antd'

import styles from './CustomTree.scss'

class CustomTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expendsKey: [],
      interTreeData: null,
    }
    this.loopDate = [
      {
        name: '人民大道',
        id: 1,
        children: [
          {
            name: '人民大道都司路',
            id: 11,
            children: [],
          },
          {
            name: '人民大道永乐路',
            id: 11,
            children: [],
          },
          {
            name: '人民大道中山西路',
            id: 11,
            children: [],
          },
          {
            name: '人民大道北京路',
            id: 11,
            children: [],
          },
          {
            name: '人民大道省府西路',
            id: 12,
            children: [
              // {
              //   name: '海淀五东路世纪大道',
              //   id: 112,
              // },
              // {
              //   name: '海淀五东路世纪大道',
              //   id: 1112,
              // },
            ],
          },
        ],
      },
    ]
  }
  componentDidMount = () => {
    const { treeData } = this.props
    if (treeData) {
      this.setState({ interTreeData: treeData })
    } else {
      this.setState({ interTreeData: [] })
    }
    console.log(this.props.treeData)
  }
  handleTreeSelect = (e) => {
    e.stopPropagation()
    const id = Number(e.currentTarget.getAttribute('id'))
    const index = this.state.expendsKey.indexOf(id)

    if (index >= 0) {
      this.state.expendsKey.splice(index, 1)
    } else {
      this.state.expendsKey.push(id)
    }
    console.log(this.state.expendsKey)
    this.setState({ expendsKey: this.state.expendsKey })
  }

  render() {
    const { expendsKey, interTreeData } = this.state
    const loop = data => (
      data.map((item) => {
        const isOpen = expendsKey.indexOf(item.id) >= 0
        if (item.children && item.children.length) {
          return (
            <li className={styles.childLi} key={item.id} id={item.id} onClick={this.handleTreeSelect}>
              <span className={styles.childIcon}><Icon type={isOpen ? 'minus-circle' : 'plus-circle'} /></span>
              <span className={styles.childNode}>{item.name}</span>
              {
                isOpen &&
                <ul className={styles.childTree}>
                  {loop(item.children)}
                </ul>
              }
            </li>
          )
        }
        return (
          <li className={styles.childLi} key={item.id} id={item.id} onClick={this.handleTreeSelect}>
            <span className={styles.childIcon}><Icon type={isOpen ? 'minus-circle' : 'plus-circle'} /></span>
            <span className={styles.childNode}>{item.name}</span>
          </li>
        )
      })
    )
    return (
      <div className={styles.treeWrapper}>
        <ul className={styles.treeList}>
          {
            interTreeData &&
            interTreeData.map((item) => {
              const isOpen = expendsKey.indexOf(item.id) >= 0
              return (
                <li className={styles.treeLi} key={item.id} id={item.id} onClick={this.handleTreeSelect}>
                  <span className={styles.treeIcon}>
                    <Icon type={isOpen ? 'folder-open' : 'folder'} theme="filled" />
                  </span>
                  <span className={styles.treeNode}>{item.name}</span>
                  {
                    item.children &&
                    <ul className={styles.childTree} key={item.id}>
                      {loop(item.children)}
                    </ul>
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default CustomTree
