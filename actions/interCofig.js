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
  // API_PRIMITIVE_UICONFIG,
  API_PRIMITIVE_UPDATEBASEMAP,
  API_PRIMITIVE_EDITDEVICEINFOPO,
  API_PRIMITIVE_UPLOAD,
  API_PRIMITIVE_SHOWDEVICEINFO,

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
// export const getuiConfig = (interId) => {
//   return async (dispatch) => {
//     try {
//       const result = await RestUtil.get(`${API_PRIMITIVE_UICONFIG}?unitId=${interId}`)
//       if (result.data.code === 200) {
//         dispatch({ type: types.GET_PRIMITIVE_UICONFIG, payload: result.data.data })
//       } else {
//         console.error(result.data.message)
//       }
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }

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
  return (dispatch) => {
    try {
      const promises = new Promise((resolve) => {
        const result = RestUtil.get(`${API_PRIMITIVE_EDITDEVICEINFOPO}?pLeft=${pLeft}&pTop=${pTop}&uiId=${interId}`)
        resolve(result)
      })
      dispatch({ type: types.GET_PRIMITIVE_EDITDEVICEINFOPO, payload: promises })
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
        dispatch({ type: types.GET_PRIMITIVE_SHOWDEVICEINFO, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
// // 未调试
// export const getuiConfig = (interId) => {
//   return async (dispatch) => {
//     try {
//       const result = await RestUtil.get(`${API_PRIMITIVE_UPLOAD}?unitId=${interId}`)
//       if (result.data.code === 200) {
//         dispatch({ type: types.GET_PRIMITIVE_UPLOAD, payload: result.data.data })
//       } else {
//         console.error(result.data.message)
//       }
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }

