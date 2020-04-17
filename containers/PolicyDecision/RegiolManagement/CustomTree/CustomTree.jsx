import React from 'react'
import { Icon, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getloadPlanTree } from '../../../../actions/management'
import styles from './CustomTree.scss'

class CustomTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expendsKey: [],
      visible: 0, // 右键菜单
      loopDate: [],
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
    this.props.getloadPlanTree('', '', 'district')
  }
  componentDidUpdate = (prevState) => {
    const { loadPlanTree } = this.props.data
    if (prevState.data.loadPlanTree !== loadPlanTree) {
      this.getloadPlanTree(loadPlanTree)
    }
  }
  componentWillUnmount() {

  }
  getloadPlanTree = (loadPlanTree) => {
    loadPlanTree.forEach((item) => {
      item.children = []
    })
    console.log(loadPlanTree, 'sx')
    this.setState({
      loopDate: loadPlanTree,
    })
  }
  btns = (id) => {
    // console.log(id)
  }
  handleTreeSelect = (e, ids) => {
    e.stopPropagation()
    e.preventDefault()
    const id = Number(e.currentTarget.getAttribute('id'))
    const index = this.state.expendsKey.indexOf(id)
    console.log(123456)
    if (index >= 0) {
      this.state.expendsKey.splice(index, 1)
    } else {
      this.state.expendsKey.push(id)
    }
    this.setState({ expendsKey: this.state.expendsKey })
    this.props.visibleShowLeft('', '', false)
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
        const isOpen = expendsKey.indexOf(item.ID) >= 0
        if (item.children && item.children.length) {
          return (
            <li className={styles.childLi} key={item.ID} id={item.ID} onClick={e => this.handleTreeSelect(e, item.ID)}>
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
          <li className={styles.childLi} onMouseDown={() => this.rightDown('', '', false)} key={item.ID} id={item.ID} onClick={e => this.handleTreeSelect(e, item.ID)}>
            <span className={styles.childIcon}><Icon type={isOpen ? 'minus-circle' : 'plus-circle'} /></span>
            <span title={item.DISTRICT_NAME} className={styles.childNode}>{item.DISTRICT_NAME}</span>
          </li>
        )
      })
    )
    return (
      <div className={styles.treeWrapper}>
        <ul className={styles.treeList}>
          {
            loopDate && loopDate.map((item) => {
              const isOpen = expendsKey.indexOf(item.ID) >= 0
              return (
                <li className={styles.treeLi} key={item.ID} id={item.ID} onContextMenu={this.noShow} onClick={e => this.handleTreeSelect(e, item.ID)}>
                  <span className={styles.treeIcon}>
                    <span className={styles.childIcon}><Icon type={isOpen ? 'minus-circle' : 'plus-circle'} /></span>
                  </span>
                  <span title={item.DISTRICT_NAME} onClick={() => this.btns(item.ID)} onMouseDown={e => this.rightDown(e, item.ID, true)} className={styles.childNode}>{item.DISTRICT_NAME}</span>
                  {
                    isOpen &&
                    <ul className={styles.childTree} key={item.ID}>
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

const mapStateToProps = (state) => {
  return {
    data: state.managements,
  }
}
const mapDisPatchToProps = dispatch => ({
  getloadPlanTree: bindActionCreators(getloadPlanTree, dispatch),

})
export default connect(mapStateToProps, mapDisPatchToProps)(CustomTree)

