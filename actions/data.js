/**
 * @file actions
 */

import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'
import { API_PLAN_INFO } from '../constants/API'

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

