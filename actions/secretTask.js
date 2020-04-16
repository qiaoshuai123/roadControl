import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'

import { API_VIP_ROUTE } from '../constants/API'

export const getVipRoute = (id, searchWord) => async (dispatch) => {
  try {
    const result = await RestUtil.get(`${API_VIP_ROUTE}/${id}/${searchWord}`)
    if (result.data.code === 200) {
      dispatch({ type: types.GET_VIP_ROUTE, payload: result.data.data })
    } else {
      console.error(result.data.message)
    }
  } catch (e) {
    console.log(e)
  }
}
