import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'

import { API_PRIMITIVE_EDITDEVICEINFOPO } from '../constants/API'

export const geteditDeviceInfoPo = (interId, pLeft, pTop) => async (dispatch) => {
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
