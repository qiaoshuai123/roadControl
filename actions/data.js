/**
 * @file actions
 */

import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'
import {
  API_PLAN_INFO,
  API_INTER_LIST,
  API_CONTROL_ROAD,
  API_CONTROL_COUNT,
  API_PLAN_TIME,
  API_CONTROL_STATUS,
  API_REAL_STATUS,
  API_FAULT_STATISTICS,
  API_INTER_INFO,
  API_LOAD_PLANTREE,
  API_VIP_ROUTE,
  API_VIP_ROUTE_CHILD,

} from '../constants/API'

export const getPlanInfo = () => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(API_PLAN_INFO)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_PLAN_INFO, payload: result.data.data })
      } else {
        console.log('发生错误！')
      }
    } catch (e) {
      console.log(e)
    }
  }
}
// 首页路口列表
export const getInterList = () => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(API_INTER_LIST)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_INTER_LIST, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getControlRoads = () => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(API_CONTROL_ROAD)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_CONTROL_ROAD, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getControlCount = () => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(API_CONTROL_COUNT)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_CONTROL_COUNT, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getPlanTime = () => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(API_PLAN_TIME)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_PLAN_TIME, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getControlStatus = () => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(API_CONTROL_STATUS)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_CONTROL_STATUS, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getRealTimeStatus = () => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(API_REAL_STATUS)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_REAL_STATUS, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getfaultStatistics = () => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(API_FAULT_STATISTICS)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_FAULT_STATISTICS, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getBasicInterInfo = (interId) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_INTER_INFO}/${interId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_INTER_INFO, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getLoadPlanTree = (id = '', keyword = '', type = 'district') => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_LOAD_PLANTREE}?id=${id}&searchWord=${keyword}&type=${type}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_LOAD_PLANTREE, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getLoadChildTree = (id = '', keyword = '', type = 'district') => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_LOAD_PLANTREE}?id=${id}&searchWord=${keyword}&type=${type}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_LOAD_CHILDTREE, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// 树形结构父级
export const getVipRoute = (id, searchWord) => async (dispatch) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_VIP_ROUTE}?id=${id}&searchWord=${searchWord}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_VIP_ROUTE, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// 树形结构二级子级
export const getVipRouteChild = (id, searchWord) => async (dispatch) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_VIP_ROUTE_CHILD}?id=${id}&searchWord=${searchWord}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_VIP_ROUTE_CHILD, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
