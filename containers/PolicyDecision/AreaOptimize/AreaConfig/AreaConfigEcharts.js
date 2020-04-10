const echarts = {
  echarts1: {
    option: {
      title: {
        // subtext: '单位：次/车',
        textStyle: {
          fontSize: 16,
          color: '#fff',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      toolbox: {
        show: true,
        top: 2,
        right: 10,
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
        },
        iconStyle: {
          normal: {
            color: 'white', // 设置颜色
          },
        },
      },
      grid: {
        left: '0',
        right: '20',
        bottom: '5%',
        top: '20%',
        containLabel: true,
      },
      legend: {
        data: ['东进口左转', '东进口直行', '东南进口左转', '东南进口直行', '西南进口左转', '西南进口直行', '西北进口左转', '西北进口直行', '西北进口左转1', '西北进口直行1'],
        // data: legend,
        top: 10,
        textStyle: {
          color: '#fff',
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50'],
          boundaryGap: false, // 首个从y轴开始
          // data: time,
          axisLabel: { // X轴文字
            textStyle: {
              fontSize: 12,
              color: '#3D839D',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#3D839D',
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
          axisLabel: { // Y轴刻度值
            formatter: '{value}',
            textStyle: {
              fontSize: 12,
              color: '#3D839D',
            },
          },
          axisLine: { // y轴隐藏
            show: false,
          },
        },
      ],
      series: [
        {
          name: '东进口左转',
          type: 'line',
          data: [2.0, 4.9, 1.0, 33.2, 25.6, 75.7, 25.6, 162.2, 32.6, 20.0, 6.4, 3.3, 33],
        },
      ],
      // series,
    }
  },
  echarts2: {
    option: {
      title: {
        // subtext: '单位：次/车',
        textStyle: {
          fontSize: 16,
          color: '#fff',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      toolbox: {
        show: true,
        top: 2,
        right: 10,
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
        },
        iconStyle: {
          normal: {
            color: 'white', // 设置颜色
          },
        },
      },
      grid: {
        left: '0',
        right: '20',
        bottom: '5%',
        top: '20%',
        containLabel: true,
      },
      legend: {
        data: ['东进口左转', '东进口直行', '东南进口左转', '东南进口直行', '西南进口左转', '西南进口直行', '西北进口左转', '西北进口直行', '西北进口左转1', '西北进口直行1'],
        // data: legend,
        top: 10,
        textStyle: {
          color: '#fff',
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50'],
          boundaryGap: false, // 首个从y轴开始
          // data: time,
          axisLabel: { // X轴文字
            textStyle: {
              fontSize: 12,
              color: '#3D839D',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#3D839D',
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
          axisLabel: { // Y轴刻度值
            formatter: '{value}',
            textStyle: {
              fontSize: 12,
              color: '#3D839D',
            },
          },
          axisLine: { // y轴隐藏
            show: false,
          },
        },
      ],
      series: [
        {
          name: '东进口左转',
          type: 'line',
          data: [2.0, 4.9, 1.0, 33.2, 25.6, 75.7, 25.6, 162.2, 32.6, 20.0, 6.4, 3.3, 33],
        },
      ],
      // series,
    },
  },
  echarts3: {
    option: {
      title: {
        // subtext: '单位：次/车',
        textStyle: {
          fontSize: 16,
          color: '#fff',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      toolbox: {
        show: true,
        top: 2,
        right: 10,
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
        },
        iconStyle: {
          normal: {
            color: 'white', // 设置颜色
          },
        },
      },
      grid: {
        left: '0',
        right: '20',
        bottom: '8%',
        top: '20%',
        containLabel: true,
      },
      legend: {
        data: ['东进口左转', '东进口直行', '东南进口左转', '东南进口直行', '西南进口左转', '西南进口直行', '西北进口左转', '西北进口直行', '西北进口左转1', '西北进口直行1'],
        boundaryGap: false, // 首个从y轴开始
        // data: legend,
        top: 10,
        textStyle: {
          color: '#fff',
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50'],
          boundaryGap: false, // 首个从y轴开始
          // data: time,
          axisLabel: { // X轴文字
            textStyle: {
              fontSize: 12,
              color: '#3D839D',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#3D839D',
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
          axisLabel: { // Y轴刻度值
            formatter: '{value}',
            textStyle: {
              fontSize: 12,
              color: '#3D839D',
            },
          },
          axisLine: { // y轴隐藏
            show: false,
          },
        },
      ],
      series: [
        {
          name: '东进口左转',
          type: 'line',
          data: [2.0, 4.9, 1.0, 33.2, 25.6, 75.7, 25.6, 162.2, 32.6, 20.0, 6.4, 3.3, 33],
        },
      ],
      // series,
    },
  },
  echarts4: {
    option: {
      title: {
        // subtext: '单位：次/车',
        textStyle: {
          fontSize: 16,
          color: '#fff',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      toolbox: {
        show: true,
        top: 2,
        right: 10,
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
        },
        iconStyle: {
          normal: {
            color: 'white', // 设置颜色
          },
        },
      },
      grid: {
        left: '0',
        right: '20',
        bottom: '8%',
        top: '20%',
        containLabel: true,
      },
      legend: {
        data: ['东进口左转', '东进口直行', '东南进口左转', '东南进口直行', '西南进口左转', '西南进口直行', '西北进口左转', '西北进口直行', '西北进口左转1', '西北进口直行1'],
        // data: legend,
        top: 10,
        textStyle: {
          color: '#fff',
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50'],
          boundaryGap: false, // 首个从y轴开始
          // data: time,
          axisLabel: { // X轴文字
            textStyle: {
              fontSize: 12,
              color: '#3D839D',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#3D839D',
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
          axisLabel: { // Y轴刻度值
            formatter: '{value}',
            textStyle: {
              fontSize: 12,
              color: '#3D839D',
            },
          },
          axisLine: { // y轴隐藏
            show: false,
          },
        },
      ],
      series: [
        {
          name: '东进口左转',
          type: 'line',
          data: [2.0, 4.9, 1.0, 33.2, 25.6, 75.7, 25.6, 162.2, 32.6, 20.0, 6.4, 3.3, 33],
        },
      ],
      // series,
    },
  },
}

export default echarts
