import React from 'react'
import { Icon, Tooltip } from 'antd'

import styles from './CustomTree.scss'
import CustomTreeList from './CustomTreeList/CustomTreeList'

class CustomTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expendsKey: [1, 11, 2, 22, 12],
      visible: false, // 右键菜单
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
    document.addEventListener('contextmenu', this._handleContextMenu)
    document.addEventListener('click', this._handleClick)
    document.addEventListener('scroll', this._handleScroll)
  }
  componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu)
    document.removeEventListener('click', this._handleClick)
    document.removeEventListener('scroll', this._handleScroll)
  }
  _handleContextMenu = (event) => {

    // this.setState({ visible:false });//当点击其他地方右键时可以根据需求来判断是否需要先关闭菜单
    event.preventDefault()

    this.setState({ visible: true })
    const clickX = event.clientX
    const clickY = event.clientY // 事件发生时鼠标的Y坐标
    const screenW = window.innerWidth // 文档显示区的宽度
    const screenH = window.innerHeight
    const rootW = this.root.offsetWidth // 右键菜单本身元素的宽度
    const rootH = this.root.offsetHeight

    // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放contextmenu。

    // 否则，菜单放到左边。 // top和bottom，同理。

    const right = (screenW - clickX) > rootW
    const left = !right
    const top = (screenH - clickY) > rootH
    const bottom = !top

    if (right) {
      this.root.style.left = `${clickX + 15}px`
    }

    if (left) {
      this.root.style.left = `${clickX - rootW - 15}px`
    }

    if (top) {
      this.root.style.top = `${clickY + 15}px`
    }

    if (bottom) {
      this.root.style.top = `${clickY - rootH - 15}px`
    }
  };

  _handleClick = (event) => {
    const { visible } = this.state
    const wasOutside = !(event.target.contains === this.root)

    if (wasOutside && visible) this.setState({ visible: false })
  };

  _handleScroll = () => {
    const { visible } = this.state
    if (visible) this.setState({ visible: false })
  };
  btns = (id) => {
    console.log(id)
  }
  handleTreeSelect = (e, ids) => {
    console.log(e, 2222)
    // console.log(123456)
    e.stopPropagation()
    const id = Number(e.currentTarget.getAttribute('id'))
    // const id = Number(ids)
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
    const { expendsKey, visible } = this.state
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
            <Tooltip placement="topLeft" title={item.name} arrowPointAtCenter>
              <span className={styles.childNode}>{item.name}</span>
            </Tooltip>
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
              console.log(isOpen, 'sssssee')
              return (
                <li className={styles.treeLi} key={item.id} id={item.id} onClick={this.handleTreeSelect}>
                  <span className={styles.treeIcon}>
                    <span className={styles.childIcon}><Icon type={isOpen ? 'minus-circle' : 'plus-circle'} /></span>
                  </span>
                  <Tooltip placement="topLeft" title={item.name} arrowPointAtCenter>
                    <span onClick={() => this.btns(item.id)} className={styles.childNode}>{item.name}</span>
                    {visible ?
                      <div ref={ref => { this.root = ref }} className="contextMenu">
                        <div>右键菜单内容</div>
                      </div> : null}
                  </Tooltip>
                  {
                    isOpen &&
                    <ul className={styles.childTree} key={item.id}>
                      {loop(item.children)}
                    </ul>
                  }
                </li>
                // <CustomTreeList isOpen={isOpen} key={item.id} handleTreeSelect={this.handleTreeSelect} loop={loop} item={item} />
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default CustomTree
