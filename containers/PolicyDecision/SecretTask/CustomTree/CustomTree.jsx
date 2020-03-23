import React from 'react'
import { Icon, Tooltip } from 'antd'

import styles from './CustomTree.scss'

class CustomTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expendsKey: [1, 11, 2, 22, 12],
      visible: 0, // 右键菜单
    }
    this.loopDate = [{
      name: '海淀五西路11',
      id: 11,
      children: [
        {
          name: '海淀五西路世纪大道11-1',
          id: 111,
        },
        {
          name: '海淀五西路世纪大道11-2',
          id: 1,
        }],
    },
    {
      name: '海淀五东路22',
      id: 12,
      children: [
        {
          name: '海淀五东路世纪大道22-1',
          id: 112,
        },
        {
          name: '海淀五东路世纪大道22-2',
          id: 1112,
        },
      ],
    }]
    // {
    //   name: '龙华区',
    //   id: 2,
    //   children: [
    //     {
    //       name: '龙华路',
    //       id: 22,
    //       children: [
    //         {
    //           name: '龙华路世纪大道',
    //           id: 222,
    //         },
    //       ],
    //     },
    //   ],
    // },
  }
  componentDidMount = () => {
  }
  componentWillUnmount() {

  }
  btns = (id) => {
    // console.log(id)
  }
  handleTreeSelect = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const id = Number(e.currentTarget.getAttribute('id'))
    const index = this.state.expendsKey.indexOf(id)
    if (index >= 0) {
      this.state.expendsKey.splice(index, 1)
    } else {
      this.state.expendsKey.push(id)
    }
    this.setState({ expendsKey: this.state.expendsKey })
    this.props.visibleShowLeft('', '', false)
  }
  rightDown = (e, id, boolean) => { // 鼠标右击
    e.stopPropagation()
    e.preventDefault()
    const { visibleShowLeft } = this.props
    if (boolean) {
      const top = e.pageY
      if (e.button === 2) {
        visibleShowLeft(top, id, true)
      }
    } else {
      visibleShowLeft('', '', false)
    }
  }
  noShow = (e) => { // 禁止默认右键菜单
    e.stopPropagation()
    e.preventDefault()
  }
  render() {
    const { expendsKey } = this.state
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
          <li className={styles.childLi} onMouseDown={() => this.rightDown('', '', false)} key={item.id} id={item.id} onClick={this.handleTreeSelect}>
            <span className={styles.childIcon}><Icon type={isOpen ? 'minus-circle' : 'plus-circle'} /></span>
            <span title={item.name} className={styles.childNode}>{item.name}</span>
          </li>
        )
      })
    )
    return (
      <div className={styles.treeWrapper}>
        <ul className={styles.treeList}>
          {
            this.loopDate.map((item) => {
              const isOpen = expendsKey.indexOf(item.id) >= 0
              return (
                <li className={styles.treeLi} key={item.id} id={item.id} onContextMenu={this.noShow} onClick={this.handleTreeSelect}>
                  <span className={styles.treeIcon}>
                    <span className={styles.childIcon}><Icon type={isOpen ? 'minus-circle' : 'plus-circle'} /></span>
                  </span>
                  <span title={item.name} onClick={() => this.btns(item.id)} onMouseDown={e => this.rightDown(e, item.id, true)} className={styles.childNode}>{item.name}</span>
                  {
                    isOpen &&
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
