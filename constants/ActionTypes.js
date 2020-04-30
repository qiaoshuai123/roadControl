/**
 * @file actions 的 type name
 * author chaohui
 */

export const GET_PLAN_INFO = 'GET_PLAN_INFO'
export const GET_INTER_LIST = 'GET_INTER_LIST'
export const GET_CONTROL_ROAD = 'GET_CONTROL_ROAD'
export const GET_CONTROL_COUNT = 'GET_CONTROL_COUNT'
export const GET_PLAN_TIME = 'GET_PLAN_TIME'
export const GET_CONTROL_STATUS = 'GET_CONTROL_STATUS'
export const GET_REAL_STATUS = 'GET_REAL_STATUS'
export const GET_FAULT_STATISTICS = 'GET_FAULT_STATISTICS'
export const GET_INTER_INFO = 'GET_INTER_INFO'
export const GET_SINGAL_INFO = 'GET_SINGAL_INFO'
export const GET_ISSIGNALING = 'GET_ISSIGNALING'
export const GET_PLAN_STAGE = 'GET_PLAN_STAGE'
export const GET_PRIMITIVE_INUTUITYPE = 'GET_PRIMITIVE_INUTUITYPE'
export const GET_MONITOR_INFO = 'GET_MONITOR_INFO'
export const GET_PRIMITIVE_BASEMAPIMG = 'GET_PRIMITIVE_BASEMAPIMG'
export const GET_PRIMITIVE_UPDATEBASEMAP = 'GET_PRIMITIVE_UPDATEBASEMAP'
export const GET_PRIMITIVE_UPLOAD = 'GET_PRIMITIVE_UPLOAD'
export const GET_PRIMITIVE_EDITDEVICEINFOPO = 'GET_PRIMITIVE_EDITDEVICEINFOPO'
export const GET_PRIMITIVE_SHOWDEVICEINFO = 'GET_PRIMITIVE_SHOWDEVICEINFO'
export const GET_PRIMITIVE_REMOVEDEVICEINFOBYID = 'GET_PRIMITIVE_REMOVEDEVICEINFOBYID'
export const GET_SINGAL_CONTROL = 'GET_SINGAL_CONTROL'
export const GET_PRIMITIVE_SHOWUILIST = 'GET_PRIMITIVE_SHOWUILIST'
export const GET_PRIMITIVE_EDITDEVICEINFO = 'GET_PRIMITIVE_EDITDEVICEINFO'
export const GET_PRIMITIVE_REMOVEDEVICEINFO = 'GET_PRIMITIVE_REMOVEDEVICEINFO'
export const GET_TIME_TABLE = 'GET_TIME_TABLE'
export const GET_TIMETABLE_ACTIONS = 'GET_TIMETABLE_ACTIONS'
export const GET_TIMETABLE_SAVE = 'GET_TIMETABLE_SAVE'
export const GET_PHASE_LIST = 'GET_PHASE_LIST'
export const GET_TIMING_PLAN = 'GET_TIMING_PLAN'
export const GET_ROAD_LIST = 'GET_ROAD_LIST'
export const GET_PHASE_GETDLNAME = 'GET_PHASE_GETDLNAME'
export const GET_TIMEPLAN_INFO = 'GET_TIMEPLAN_INFO'
export const GET_CHANNLE_LIST = 'GET_CHANNLE_LIST'
export const GET_FLOW_DIRECTION = 'GET_FLOW_DIRECTION'
export const GET_BASE_ACTION = 'GET_BASE_ACTION'
export const GET_ADD_TIMINGPLAN = 'GET_ADD_TIMINGPLAN'
export const GET_ACTION_NO = 'GET_ACTION_NO'
export const GET_PLAN_NOLIST = 'GET_PLAN_NOLIST'
export const GET_DIRECTION_LIST = 'GET_DIRECTION_LIST'
export const GET_DIRECTION_FORLANE = 'GET_DIRECTION_FORLANE'
export const GET_ROAD_TYPE = 'GET_ROAD_TYPE'
export const GET_FLOW_PHASE = 'GET_FLOW_PHASE'
export const GET_PHASENO_LIST = 'GET_PHASENO_LIST'
export const GET_SCHEDULE_LIST = 'GET_SCHEDULE_LIST'
export const GET_LOADMANAGEMENT = 'GET_LOADMANAGEMENT'
export const GET_VALIDATE = 'GET_VALIDATE'
export const GET_LOADUNITNAME = 'GET_LOADUNITNAME'
export const GET_LOADUNITNAMES = 'GET_LOADUNITNAMES'
export const GET_SAVEORUPDATEFORM = 'GET_SAVEORUPDATEFORM'
export const GET_LOADPLANTREE = 'GET_LOADPLANTREE'
export const GET_EDITDISTRICTINFOTHING = 'GET_EDITDISTRICTINFOTHING'
export const GET_DELETEDISTRICT = 'GET_DELETEDISTRICT'
export const GET_TIMGINTERVAL_LIST = 'GET_TIMGINTERVAL_LIST'
export const GET_SCHEDULENO_LIST = 'GET_SCHEDULENO_LIST'
export const GET_FAULTLOG_LIST = 'GET_FAULTLOG_LIST'
export const GET_LOAD_PLANTREE = 'GET_LOAD_PLANTREE'
export const GET_LOAD_PLANLOAD = 'GET_LOAD_PLANLOAD'
export const GET_LOAD_CHILDTREE = 'GET_LOAD_CHILDTREE'
export const GET_AREA_LIST = 'GET_AREA_LIST'
export const GET_FLOW_NEWCHILDREE = 'GET_FLOW_NEWCHILDREE' // 区域列表更改筛选
export const GET_PLANSTAGE_LIST = 'GET_PLANSTAGE_LIST'
export const GET_MONITORTYPE = 'GET_MONITORTYPE'
export const GET_GLOBALMONITOR = 'GET_GLOBALMONITOR'
export const GET_GLOBALUNITINFO = 'GET_GLOBALUNITINFO'

// 特勤任务
export const GET_VIP_ROUTE = 'GET_VIP_ROUTE'
export const GET_VIP_ROUTE_CHILD = 'GET_VIP_ROUTE_CHILD'
export const GET_VIP_ADD_UNITSIFRAM = 'GET_VIP_ADD_UNITSIFRAM'
export const GET_VIP_DELETE_UNITIFRAM = 'GET_VIP_DELETE_UNITIFRAM'
export const GET_VIP_DELETE_VIPROAD = 'GET_VIP_DELETE_VIPROAD'
export const GET_VIP_FIND_ROADBYVIPID = 'GET_VIP_FIND_ROADBYVIPID'
export const GET_VIP_FIND_LIST = 'GET_VIP_FIND_LIST'
export const POST_VIP_INITROAD = 'POST_VIP_INITROAD'
export const GET_VIP_LOADUNIT_STAGES = 'GET_VIP_LOADUNIT_STAGES'
export const GET_VIP_SAVEVIPROAD = 'GET_VIP_SAVEVIPROAD'
export const GET_VIP_SAVEUNITRUNSTAGE = 'GET_VIP_SAVEUNITRUNSTAGE'
// 子区域管理
export const GET_SUB_DELETEDISTRICT = 'GET_SUB_DELETEDISTRICT'
export const GET_SUB_EDITDISTRICTINFOTHING = 'GET_SUB_EDITDISTRICTINFOTHING'
export const GET_SUB_LOADUNITNAME = 'GET_SUB_LOADUNITNAME'
export const GET_SUB_LOADUNITNAMES = 'GET_SUB_LOADUNITNAMES'
export const GET_SUB_SAVEORUPDATEFORM = 'GET_SUB_SAVEORUPDATEFORM'
export const GET_SUB_VALIDATE = 'GET_SUB_VALIDATE'
export const GET_SUB_NEWCHILDREE = 'GET_SUB_NEWCHILDREE' // 子区域列表更改筛选
export const GET_LOAD_PLANLOADCHILD = 'GET_LOAD_PLANLOADCHILD'
// 配时管理
export const GET_TIM_GETTIMINGINFO = 'GET_TIM_GETTIMINGINFO'
export const GET_TIM_GETTIMINGINFOBYEXCEL = 'GET_TIM_GETTIMINGINFOBYEXCEL'
export const GET_TIM_LOADMORE = 'GET_TIM_LOADMORE'
export const GET_TIM_SAVEORUPDATEFORM = 'GET_TIM_SAVEORUPDATEFORM'
export const GET_TIM_TEST = 'GET_TIM_TEST'
export const GET_TIM_CODE = 'GET_TIM_CODE'
export const GET_TIM_CFGIMGS = 'GET_TIM_CFGIMGS'
