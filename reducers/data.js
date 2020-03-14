/**
 * @file actions dispatch reducer
 */
import * as types from '../constants/ActionTypes'

const data = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_PLAN_INFO:
      return Object.assign({}, state, { planInfo: payload })
    default:
      return state
  }
}
export default data
