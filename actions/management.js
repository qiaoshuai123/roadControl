import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'

import { API_LOADMANAGEMENT, API_VALIDATE, API_LOADUNITNAME, API_SAVEORUPDATEFORM } from '../constants/API'

export const getloadManageMent = () => async (dispatch) => {
  try {
    const result = await RestUtil.get(`${API_LOADMANAGEMENT}`)
    if (result.data.code === 200) {
      dispatch({ type: types.GET_LOADMANAGEMENT, payload: result.data.data })
    } else {
      console.error(result.data.message)
    }
  } catch (e) {
    console.log(e)
  }
}
export const getvalidate = num => async (dispatch) => {
  try {
    const result = await RestUtil.get(`${API_VALIDATE}/${num}`)
    if (result.data.code === 200) {
      dispatch({ type: types.GET_VALIDATE, payload: result.data.data })
    } else {
      console.error(result.data.message)
    }
  } catch (e) {
    console.log(e)
  }
}
export const getloadUnitName = id => async (dispatch) => {
  try {
    const result = await RestUtil.get(`${API_LOADUNITNAME}/${id}`)
    if (result.data.code === 200) {
      dispatch({ type: types.GET_LOADUNITNAME, payload: result.data.data })
    } else {
      console.error(result.data.message)
    }
  } catch (e) {
    console.log(e)
  }
}
export const getsaveOrUpdateForm = (params) => {
  return async () => {
    const result = await RestUtil.post(API_SAVEORUPDATEFORM, params)
    return result
  }
}
