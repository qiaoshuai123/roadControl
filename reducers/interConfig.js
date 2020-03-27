/**
 * @file actions dispatch reducer
 */
import * as types from '../constants/ActionTypes'

const interConfig = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_ISSIGNALING:
      return Object.assign({}, state, { issignaling: payload })
    case types.GET_SINGAL_INFO:
      return Object.assign({}, state, { sinaglInfo: payload })
    case types.GET_PLAN_STAGE:
      return Object.assign({}, state, { planStage: payload })
    case types.GET_PRIMITIVE_INUTUITYPE:
      return Object.assign({}, state, { primitiveInutuitype: payload })
    case types.GET_MONITOR_INFO:
      return Object.assign({}, state, { monitorInfo: payload })
    case types.GET_PRIMITIVE_BASEMAPIMG:
      return Object.assign({}, state, { basemapImg: payload })
    case types.GET_PRIMITIVE_UICONFIG:
      return Object.assign({}, state, { uiConfig: payload })
    case types.GET_PRIMITIVE_UPDATEBASEMAP:
      return Object.assign({}, state, { updatebasemap: payload })
    case types.GET_PRIMITIVE_UPLOAD:
      return Object.assign({}, state, { upload: payload })
    default:
      return state
  }
}

export default interConfig
