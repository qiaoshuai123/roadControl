/**
 * @file actions dispatch reducer
 */
import * as types from '../constants/ActionTypes'

const data = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_PLAN_INFO:
      return Object.assign({}, state, { planInfo: payload })
    case types.GET_INTER_LIST:
      return Object.assign({}, state, { interList: payload })
    case types.GET_CONTROL_ROAD:
      return Object.assign({}, state, { controlRoads: payload })
    case types.GET_CONTROL_COUNT:
      return Object.assign({}, state, { controlCounts: payload })
    case types.GET_PLAN_TIME:
      return Object.assign({}, state, { planTimes: payload })
    default:
      return state
  }
}
export default data
