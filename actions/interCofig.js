/**
 * @file actions
 */

import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'
import {
  API_ISSIGNALING,
  API_SINGALINFO,
  API_PLAN_STAGE,
  API_PRIMITIVE_INUTUITYPE,
  API_MONITOR_INFO,
  API_PRIMITIVE_BASEMAPIMG,
  API_PRIMITIVE_UPDATEBASEMAP,
  API_PRIMITIVE_EDITDEVICEINFOPO,
  API_PRIMITIVE_SHOWDEVICEINFO,
  API_SINGAL_CONTROL,
  API_PRIMITIVE_SHOWUILIST,

} from '../constants/API'

export const getInterdetailIsSignalling = (interId) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_ISSIGNALING}?unitId=${interId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_ISSIGNALING, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getSingalInfo = (interId) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_SINGALINFO}/${interId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_SINGAL_INFO, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getPlanStage = (interId) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_PLAN_STAGE}/${interId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_PLAN_STAGE, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
export const getprimitiveInutuitype = () => { // 获取设备配置
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_PRIMITIVE_INUTUITYPE}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_PRIMITIVE_INUTUITYPE, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getMonitorInfo = (interId) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_MONITOR_INFO}/${interId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_MONITOR_INFO, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
export const getbasemapImg = () => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_PRIMITIVE_BASEMAPIMG}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_PRIMITIVE_BASEMAPIMG, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getupdatebasemap = (interId, imgname) => {
  return (dispatch) => {
    try {
      const promises = new Promise((resolve) => {
        const result = RestUtil.post(`${API_PRIMITIVE_UPDATEBASEMAP}?unitId=${interId}&unitbackgroundimg=${imgname}`)
        resolve(result)
      })
      dispatch({ type: types.GET_PRIMITIVE_UPDATEBASEMAP, payload: promises })
    } catch (e) {
      console.log(e)
    }
  }
}

export const geteditDeviceInfoPo = (interId, pLeft, pTop) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_PRIMITIVE_EDITDEVICEINFOPO}?pLeft=${pLeft}&pTop=${pTop}&uiId=${interId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_PRIMITIVE_EDITDEVICEINFOPO, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getshowDeviceInfo = (uiId, unitId) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_PRIMITIVE_SHOWDEVICEINFO}?uiId=${uiId}&unitId=${unitId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_PRIMITIVE_SHOWDEVICEINFO, payload: result.data }) // 接收唯一编号message
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
export const getshowUiList = (interId) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.get(`${API_PRIMITIVE_SHOWUILIST}?uiType=${interId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_PRIMITIVE_SHOWUILIST, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getSingalController = (interId) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_SINGAL_CONTROL}?unitId=${interId}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_SINGAL_CONTROL, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

