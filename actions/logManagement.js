import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'

import {
  API_LOADMANAGEMENT,
} from '../constants/API'

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