import React from 'react'
import { Icon, Tooltip } from 'antd'

import styles from './CustomTree.scss'

class CustomTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expendsKey: [1, 11, 2, 22, 12],
      visible: 0, // 右键菜单
      vipRouteList: this.props.vipRouteList,
      indeX: this.props.indeX,
      loopDate: [],
    }
    this.loopDate = []
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
  componentDidUpdate = (prevState) => {
    console.log(this.props.vipRouteList, '数据更新')

    if (prevState.vipRouteList !== this.props.vipRouteList) {
      // this.props.vipRouteList.map((item)=>{
      //   // this.loopDate.push({
      //   //   id: item.ID,
      //   //   name: item.START_UNIT,
      //   //   children: this.props.childList,
      //   // })
      //   // this.loopDate.children.push({
      //   //   id: item.ID,
      //   //   name: item.START_UNIT,
      //   // })
      // })
      this.setState({
        loopDate: this.props.vipRouteList,
      })
    }
  
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
    console.log(this.props,'是个啥？')
  }
  rightDown = (e, id, boolean) => { // 鼠标右击
    // e.stopPropagation()
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
    const { expendsKey, loopDate } = this.state
    const loop = data => (
      data.map((item) => {
        debugger
        const isOpen = expendsKey.indexOf(item.name) >= 0
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
          <li className={styles.childLi} onMouseDown={() => this.rightDown('', '', false)} key={item.ID} id={item.ID} onClick={this.handleTreeSelect}>
            <span className={styles.childIcon}><Icon type={isOpen ? 'minus-circle' : 'plus-circle'} /></span>
            <span title={item.UNIT_NAME} className={styles.childNode}>{item.UNIT_NAME}</span>
          </li>
        )
      })
    )
    return (
      <div className={styles.treeWrapper}>
        <ul className={styles.treeList}>
          {
            loopDate && loopDate.map((item) => {
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
