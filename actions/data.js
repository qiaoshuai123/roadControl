/**
 * @file actions
 */

import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'
import { API_PLAN_INFO, API_INTER_LIST, API_CONTROL_ROAD, API_CONTROL_COUNT } from '../constants/API'

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
        console.log(result.data.message)
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
        console.log(result.data.message)
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
        console.log(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

