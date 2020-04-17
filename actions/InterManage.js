/**
 * @file 路口管理发出的action
 */

import * as types from '../constants/InterManageTypes'
import RestUtil from '../utils/RestUtil'
import { API_UINTINTER_INFO } from '../constants/interManageAPI'

export const getUnitInterInfo = (id) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_UINTINTER_INFO}${id}`)
      if (result.data.code === 200) {
        dispatch({ type: types.GET_UNITINTER_INFO, payload: result.data.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
