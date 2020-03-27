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

