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
    case types.GET_CONTROL_STATUS:
      return Object.assign({}, state, { controlStatus: payload })
    case types.GET_REAL_STATUS:
      return Object.assign({}, state, { realTimeStatus: payload })
    case types.GET_FAULT_STATISTICS:
      return Object.assign({}, state, { faultStatistics: payload })
    case types.GET_INTER_INFO:
      return Object.assign({}, state, { basicInterInfo: payload })
    case types.GET_LOAD_PLANTREE:
      return Object.assign({}, state, { loadPlanTree: payload })
    case types.GET_LOAD_CHILDTREE:
      return Object.assign({}, state, { loadChildTree: payload })
    default:
      return state
  }
}
export default data
