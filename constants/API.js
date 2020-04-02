/**
 * @file 接口地址
 * author chaohui
 */

export const API_PLAN_INFO = '/control/dict/code/list/types'
export const API_INTER_LIST = '/atms/mainTree/listUnitInfos'
export const API_CONTROL_ROAD = '/atms/mainTree/loadRecentControlUnitList'
export const API_CONTROL_COUNT = '/atms/mainTree/loadThisMonthControlUnitList'
export const API_PLAN_TIME = '/atms/mainTree/loadRecentSignalTimingChangeUnitList'
export const API_CONTROL_STATUS = '/atms/mainTree/signalControlerStatus'
export const API_REAL_STATUS = '/atms/mainTree/signalNormalAndUnNomalStatusSize'
export const API_FAULT_STATISTICS = '/atms/mainTree/loadTodayAndYesterdayAlarmList'
export const API_INTER_INFO = '/atms/mainTree/unitBasicInfo'
export const API_ISSIGNALING = '/atms/singleUnitMonitor/hasSignal'
export const API_SINGALINFO = '/atms/monitor/unitBasicInfo'
export const API_PLAN_STAGE = '/atms/monitor/planRunning'
export const API_PRIMITIVE_INUTUITYPE = '/atms/singleUnitMonitor/initUiType' // 图元设备配置//路口图元配置--初始化路口图元类型
export const API_MONITOR_INFO = '/atms/monitor/monitorInfo'
export const API_PRIMITIVE_BASEMAPIMG = '/atms/basemap/basemapImg' // 图元配置选择底图
// export const API_PRIMITIVE_UICONFIG = '/atms/singleUnitMonitor/uiConfig' // 图片配置设备位置
export const API_PRIMITIVE_UPDATEBASEMAP = '/atms/basemap/updatebasemap' // 图元配置修改底图
export const API_PRIMITIVE_UPLOAD = '/atms/basemap/upload' // 图元配置上传图片底图 ??未调试
export const API_PRIMITIVE_EDITDEVICEINFOPO = '/atms/singleUnitMonitor/editDeviceInfoPo' // 更改设备位置
export const API_PRIMITIVE_SHOWDEVICEINFO = '/atms/singleUnitMonitor/showDeviceInfo' // 添加设备获取下拉信息
export const API_SINGAL_CONTROL = '/atms/singleUnitMonitor/sigalController'
export const API_PRIMITIVE_SHOWUILIST = '/atms/singleUnitMonitor/showUiList' // 添加设备表单页面图标
export const API_PRIMITIVE_EDITDEVICEINFO = '/atms/singleUnitMonitor/showUiList' // 添加设备
export const API_TIME_TABLE = '/atms/hisenseSignal/loadTimeintervalList'
export const API_DELETE_TIMETABLE = '/atms/hisenseSignal/deleteTimeinterval'
export const API_TIMETABLE_ACTIONS = '/atms/hisenseSignal/loadActionNoList'