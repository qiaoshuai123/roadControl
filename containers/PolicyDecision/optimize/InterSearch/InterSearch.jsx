import React from 'react'
import { Select, Icon } from 'antd'
import $ from 'jquery'
import '../../../../utils/jqueryPhaseSvg'

import './InterSearch.css'

const signal_color = { red: '#FF4500', green: '#00FF00', yellow: '#F1C40F' }
window.cd_data = {
  inter_id: null,
  phase_plan_id: null,
  phase_status: null,
  phase_name: null,
  time: null,
  remain: null,
  url: null,
}

class InterSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interDatas: null,
      interList: null,
      phasePlanList: null,
    }
    this.phasePlanId = ''
    this.interId = { inter_id: '' }
    this.cd_data = {
      inter_id: null,
      phase_plan_id: null,
      phase_status: null,
      phase_name: null,
      time: null,
      remain: null,
      url: null,
    }
    this.colorTimer = false
    this.allInterDatas = []
    this.mapInterDatas = []
    this.InterUrl = 'http://192.168.1.123:12344/dws/interSignal/getInter' // 获取区和路口
    this.phasePlanListUrl = 'http://192.168.1.123:12344/dws/interSignal/getInterPhasePlanList' // 获取相位列表和颜色
    this.url_phase = 'http://192.168.1.123:8089/index.php/v3/signal?'
  }
  componentDidMount = () => {
    this.getInter()
  }
  componentWillUnmount = () => {
    if (this.colorTimer) {
      clearInterval(this.colorTimer)
      this.colorTimer = null
    }
  }
  getInterPhasePlanList = () => {
    $.ajax({
      url: this.phasePlanListUrl,
      type: 'post',
      data: this.interId,
      success: (result) => {
        result = JSON.parse(result)
        console.log(result)
        if (result.code === '1') {
          if (result.data.ippList.length > 0) {
            this.setState({ phasePlanList: result.data.ippList }, () => {
              result.data.ippList.forEach((item, index) => {
                const planId = item.phase_plan_ids.split(',')[0]
                const phaseName = item.phase_name
                const interId = this.interId.inter_id
                this.drawCrossing(interId, planId, phaseName)
              })
              if (this.colorTimer) {
                clearInterval(this.colorTimer)
                this.colorTimer = false
              }
              // this.colorTimer = setInterval(() => {
              //   this.getInterPhaseColor()
              // }, 1000)
              this.getInterPhaseColor()
            })
          }
        }
      }
    })
  }
  getInterPhaseColor = () => {
    $.ajax({
      url: this.phasePlanListUrl,
      type: 'post',
      data: this.interId,
      success: (result) => {
        result = JSON.parse(result)
        console.log(result)
        if (result.code === '1') {
          if (result.data.ippList.length > 0) {
            setTimeout(() => {
              result.data.ippList.forEach((item, index) => {
                const planId = item.phase_plan_ids.split(',')[0]
                const phaseName = item.phase_name
                const interId = this.interId.inter_id
                const color = 'url(#markerArrow_' + item.phase_status.toLowerCase() + ')'
                //11LAU064000_1_A_p
                const path = $('#PhaseSvg' + phaseName).find('.' + interId + '_' + planId + '_' + phaseName + '_p')

                const react = $('#PhaseSvg' + phaseName).find('.' + interId + '_' + planId + '_' + phaseName + '_sw')
                if (path.length > 0) {
                  path.each(function (i, k) {
                    $(k).attr('stroke', item.phase_status.toLowerCase() === 'green' ? '#00ff12' : item.phase_status)
                    //$(k).attr('marker-end', 'url(#markerArrow_' + item.phase_status + ')')
                    k.setAttribute('marker-end', color)
                    if (item.phase_status.toLowerCase() === 'green' || item.phase_status.toLowerCase() === 'yellow') {
                      $('.secondBox').text('')
                      $('#PhaseSvg' + phaseName).find('.secondBox').text(result.data.second)
                    }
                  })
                }
                if (react.length > 0) {
                  if (path.length <= 0){
                    if (item.phase_status.toLowerCase() === 'green' || item.phase_status.toLowerCase() === 'yellow') {
                      $('.secondBox').text('')
                      $('#PhaseSvg' + phaseName).find('.secondBox').text(result.data.second)                                                                                                                                                                                                                                                     
                    }
                  }
                  react.each(function (n, j) {
                    j.style = item.phase_status === 'Red' ? 'fill:url(#sidewalk_z_)' : item.phase_status === 'Gray' ? 'fill:url(#sidewalk_g_)' : 'fill:url(#sidewalk_h_)'
                  })
                }
              })
            }, 1000)
          }
        }
      }
    })
  }
  getInter = () => {
    $.ajax({
      url: this.InterUrl,
      type: 'post',
      data: '',
      success: (result) => {
        result = JSON.parse(result)
        if (result.code === '1') {
          const firstInterList = result.data[0].interList
          const interId = firstInterList[0].inter_id
          const lat = firstInterList[0].lat
          const lng = firstInterList[0].lng
          const planId = firstInterList[0].phase_plan_id
          const interName = firstInterList[0].inter_name
          const signalid = firstInterList[0].cust_signal_id
          result.data.forEach((item, index) => {
            this.allInterDatas = [...item.interList, ...this.allInterDatas]
            this.mapInterDatas = [...item.interList, ...this.mapInterDatas]
          })
          this.phasePlanId = planId
          this.interId.inter_id = interId
          // this.props.getInterMsg(interId, lat, lng, interName, planId,signalid,this.mapInterDatas)
          // this.props.getFirstInterId(interId)
          this.interDatas = this.allInterDatas
          this.setState({
            interDatas: result.data,
            interList: this.allInterDatas,
          })
          // this.props.getMapInterDatas(this.mapInterDatas)
          // this.getInterPhasePlanList()
          setTimeout(() => {
            $('.interItems[interid="11LAU063T70"]').trigger('click')
          }, 1000)
        }
      }
    })
  }
  handleInterFocus = () => {
    this.interListBox.style.maxHeight = '160px'
  }
  handleAreaChange = (value, options) => {
    console.log(value, options)
    const areaId = options.key
    if (areaId === 'haikoushi') {
      this.allInterDatas = []
      this.state.interDatas.forEach((item, index) => {
        this.allInterDatas = [...item.interList, ...this.allInterDatas]
      })
      this.setState({ interList: this.allInterDatas })
      return
    }
    const interData = this.state.interDatas.filter(item => item.id === areaId)
    this.interDatas = interData[0].interList
    this.setState({ interList: this.interDatas })
  }
  handleInterClick = (e) => {
    const ele = e.target
    const interId = ele.getAttribute('interid')
    const lat = ele.getAttribute('lat')
    const lng = ele.getAttribute('lng')
    const planId = ele.getAttribute('planid')
    const signalid = ele.getAttribute('signalid')
    const interName = ele.innerText
    this.phasePlanId = planId
    this.interId.inter_id = interId
    // this.draw_crossing(interId, planId)
    this.props.getInterMsg(interId, lat, lng, interName, planId, signalid, this.mapInterDatas)
    this.props.getFirstInterId(interId)
    this.getInterPhasePlanList()
    // this.drawCrossing(interId, planId, 'A')
    this.interListBox.style.maxHeight = 0
  }
  handleInterSearch = (e) => {
    const value = e.target.value
    const interArr = []
    this.interDatas.forEach((item, index) => {
      const hasInterId = item.inter_id.indexOf(value)
      const hasInterName = item.inter_name.indexOf(value)
      const hasDevice = item.cust_signal_id.indexOf(value)
      const inter_name_sound = item.inter_name_sound.indexOf(value.toLowerCase())
      if (hasInterId !== -1 || hasInterName !== -1 || hasDevice !== -1 || inter_name_sound !== -1) {
        interArr.push(item)
      }
    })
    this.setState({ interList: interArr })
  }

  drawCrossing = (index_id, planId, phaseName) => {
    var cd_data = window.cd_data
    const font_size = 12;
    window.map_data = null;
    cd_data.inter_id = null;
    cd_data.phase_plan_id = null;
    cd_data.phase_status = null;
    cd_data.phase_name = null;

    cd_data.time = null;
    cd_data.remain = null;
    cd_data.url = null;
    // 从接口中取出的数据
    $.get('http://192.168.1.123:8089/index.php/v6/index?inter_id=' + index_id + '&phase_plan_id=' + planId, {}, function (em) {
      console.log("我是个啥：", em);
      window.map_data = em;
      if (!em.success) {
        //alert("兄弟,inter_id 错了");
      } else {
        try {
          cd_data.inter_id = index_id;
          cd_data.phase_plan_id = em.data.phase_plan_id;
          cd_data.phase_status = null;
          cd_data.phase_name = null;
          cd_data.time = null;
          cd_data.remain = null;
          cd_data.url = 'http://192.168.1.123:8089/index.php/v3/signal?' + "inter_id=" + index_id + "&phase_plan_id=" + em.data.phase_plan_id;
          if (em.data.inter_id == index_id && em.data.phase_plan_id == planId) {
            em.data.total = 1;
            const nowIndexNum = em.data.map.turn_desc.phase_name.indexOf(phaseName);
            const resArr = em.data.map.turn_desc;
            // var turn_descArr =[];
            if (nowIndexNum > -1) {
              for (var p in resArr) {
                console.log(resArr[p]);
                if (resArr[p].length && p !== "path" && p !== "phase_current" && p !== "phase_remaining") {
                  em.data.map.turn_desc[p] = (resArr[p][nowIndexNum]).split();//当前选中的A、B、C 数组
                }
                if (p === "phase_current" || p === "phase_remaining") {
                  var nowArr = [];
                  nowArr.push(resArr[p][nowIndexNum]) //当前选中的A、B、C 数组
                  em.data.map.turn_desc[p] = nowArr
                }
                if (p === "path") {
                  var path = [];
                  path.push(resArr[p][nowIndexNum]) //当前选中的A、B、C 数组
                  em.data.map.turn_desc[p] = path
                }
              }
              $('#PhaseSvg' + phaseName).html('')
              $('#PhaseSvg' + phaseName).jqueryPhaseSvg({
                //dom: ,
                dataSourse: em,
                url: cd_data.url,//需要实时数据时请求的接口
                // 以下为可选填
                svgFont: { "fontFill": "black", "fontStroke": "none", "fontSize": "18px", "fontWeight": "bold" },//字体样式
                signalColor: { "red": "red", "green": "#00ff12", "yellow": "yellow", 'gray': 'gray' },//箭头和线的颜色
                svgBox: { "svgSize": 140, "svgBg": "#62705e", "bgFill": "#302d34", "bgStroke": "#302d34" },//svg盒子大小、背景色、路口填充色、路口边框色
                viewBox: "0 0 210 210",//svg 盒子的尺寸
              });
            }
          }
          console.log("新的DATA:", em)
          // jQuery调用方式

        } catch (err) {
          /* global layer 
          layer.open({
            type: 1,
            title: '路口信息',
            shadeClose: true,
            area: ['600px', '490px'],
            content: err.name + "<br>" + err.message		//这里是要显示的内容
          })*/
          console.log(err.name + '=====' + err.message)
        }
      }
    })
  }
  render() {
    const Option = Select.Option
    return (
      <div className="interSearchBox">
        <div className="interPhaseBox">
          <div className="areaList">
            <Select defaultValue="海口市" onChange={this.handleAreaChange}>
              <Option key="haikoushi" value="海口市">海口市</Option>
              {
                !!this.state.interDatas &&
                this.state.interDatas.map((item, index) => {
                  return (
                    <Option key={item.id} value={item.name} dataid={item.id}>{item.name}</Option>
                  )
                })
              }
            </Select>


            <span className="areaSearchBox">
              <input className="areaSearch" type="text" placeholder="搜索路口" onFocus={this.handleInterFocus} onChange={(e) => { this.handleInterSearch(e) }} />
              <Icon className="areaSearchIcon" type="search" />
            </span>
          </div>
          <div className="interListBox scrollBox" ref={(input) => { this.interListBox = input }}>
            {
              !!this.state.interList && this.state.interList.length > 0 ?
                this.state.interList.map((item, index) => {
                  return (
                    <div
                      className="interItems"
                      key={index}
                      interid={item.inter_id}
                      planid={item.phase_plan_id}
                      deviceid={item.cust_signal_id}
                      signalid={item.cust_signal_id}
                      lat={item.lat}
                      lng={item.lng}
                      onClick={(e) => { this.handleInterClick(e) }}
                    >
                      {item.inter_name}
                    </div>
                  )
                }) : <div style={{ padding: '5px 0', textAlign: 'center' }}>暂无路口数据</div>
            }
          </div>
          <div className="phaseSvgBox">
            {
              !!this.state.phasePlanList &&
              this.state.phasePlanList.map((item, index) => {
                return (
                  <div id={'PhaseSvg' + item.phase_name} key={this.interId.inter_id + index} style={{ position: 'relative' }}></div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default InterSearch
