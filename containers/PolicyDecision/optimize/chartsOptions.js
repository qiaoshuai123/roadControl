export const echartsprogramme = {
  option: {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      show: false, // ---是否显示直角坐标系网格
      top: '13%', // 等价于 y: '16%'
      left: '13%',
      bottom: '13%', // ---相对位置，top\bottom\left\right
      containLabel: false, // ---grid 区域是否包含坐标轴的刻度标签
    },
    legend: {
      data: ['蒸发量', '降水量'],
      right: '5%', // 图列相对容器的位置 top\bottom\left\right
      selected: {
        // '销量': true  // 图列选择，图形加载出来会显示选择的图列，默认为true
      },
      textStyle: { // 图列内容样式
        color: '#fff', // 字体颜色
        // backgroundColor: 'black', // 字体背景色
      },
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#FFFFFF', // 更改坐标轴文字颜色
            fontSize: 14, // 更改坐标轴文字大小
          },
        },
        axisLine: {
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: { // ---grid 区域中的分隔线
          show: true, // ---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
          lineStyle: {
            color: ['#143058'],
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#FFFFFF', // 更改坐标轴文字颜色
            fontSize: 14, // 更改坐标轴文字大小
          },
        },
        axisLine: {
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        },
      },
    ],
    series: [
      {
        name: '蒸发量',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
        barGap: '0%', // 两个柱子直接的距离
        itemStyle: {
          normal: {
            color: '#1F4FA1',
            barBorderRadius: [5, 5, 0, 0],
          },
        },
      },
      {
        name: '降水量',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
        itemStyle: {
          normal: {
            color: '#0D9737',
            barBorderRadius: [5, 5, 0, 0],
          },
        },
      },
    ],
  },
}
export const echarts = {
  echarts1: {
    option: {
      color: ['#0189FF', '#FF8C3C', '#F10282'],
      graphic: {
        type: 'text',
        left: 'center',
        bottom: '40%',
        style: {
          text: `10`,
          textAlign: 'center',
          fontSize: 16,
          // font: 'italic bolder 30px cursive',
          fill: '#fff',
          width: 30,
          height: 30,
        },
      },
      tooltip: {
        trigger: 'item',
        showDelay: 20,
        hideDelay: 20,
        backgroundColor: 'rgba(255,0,0,0.7)',
        textStyle: {
          fontSize: '16px',
          color: '#000',
        },
        formatter: '{b} : {c}个 ({d}%)',
      },
      series: [
        {
          name: '未完成',
          type: 'pie',
          selectedMode: 'single',
          radius: [20, '30%'],

          label: {
            normal: {
              position: 'inner',
            },
          },
          // labelLine: {
          //   normal: {
          //     show: false,
          //   },
          // },
        },
        {
          name: '已完成',
          type: 'pie',
          radius: ['40%', '55%'],
          data: [
            { value: 332, name: '离线设备' },
            { value: 55, name: '异常设备' },
            { value: 88, name: '在线设备' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    },
  },
  echarts2: {
    option: {
      color: ['#0189FF', '#FF8C3C', '#F10282'],
      graphic: {
        type: 'text',
        left: 'center',
        bottom: '40%',
        style: {
          text: `20`,
          textAlign: 'center',
          fontSize: 16,
          // font: 'italic bolder 30px cursive',
          fill: '#fff',
          width: 30,
          height: 30,
        },
      },
      tooltip: {
        trigger: 'item',
        showDelay: 20,
        hideDelay: 20,
        backgroundColor: 'rgba(255,0,0,0.7)',
        textStyle: {
          fontSize: '16px',
          color: '#000',
        },
        formatter: '{b} : {c}个 ({d}%)',
      },
      series: [
        {
          name: '未完成',
          type: 'pie',
          selectedMode: 'single',
          radius: [20, '30%'],

          label: {
            normal: {
              position: 'inner',
            },
          },
          // labelLine: {
          //   normal: {
          //     show: false,
          //   },
          // },
        },
        {
          name: '已完成',
          type: 'pie',
          radius: ['40%', '55%'],
          data: [
            { value: 332, name: '离线设备' },
            { value: 55, name: '异常设备' },
            { value: 88, name: '在线设备' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    },
  },
}