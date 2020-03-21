import React from 'react'
import { Icon, Tooltip } from 'antd'

import styles from './CustomTreeList.scss'

class CustomTreeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
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
  static getDerivedStateFromProps(props, current_state) {
    if (props.item.width !== current_state.width) {
      return {
        width: props.item.width,
      }
    }
    return null
  }
  _handleContextMenu = (event) => {

    // this.setState({ visible:false });//当点击其他地方右键时可以根据需求来判断是否需要先关闭菜单
    event.preventDefault()
    console.log(123)
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
  // handleTreeSelect = (e) => {
  //   e.stopPropagation()
  //   const id = Number(e.currentTarget.getAttribute('id'))
  //   const index = this.state.expendsKey.indexOf(id)
  //   if (index >= 0) {
  //     this.state.expendsKey.splice(index, 1)
  //   } else {
  //     this.state.expendsKey.push(id)
  //   }
  //   console.log(this.state.expendsKey)
  //   this.setState({ expendsKey: this.state.expendsKey })
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.item.width !== this.state.width) {
  //     this.setState({
  //       width: prevProps.item.width,
  //     })
  //   }
  // }
  // componentWillUnmount = () => {
  // }
  // 如果条件不存在必须要返回null

  render() {
    const { item, isOpen, loop, handleTreeSelect } = this.props
    console.log(isOpen)
    const { visible } = this.state
    return (
      <li className={styles.treeLi} id={item.id} onClick={(e) => handleTreeSelect(e, item.id)}>
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
    )
  }
}

export default CustomTreeList
