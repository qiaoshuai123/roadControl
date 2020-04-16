import * as types from '../constants/ActionTypes'

const secretTask = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_VIP_ROUTE:
      return Object.assign({}, state, { vipRouteList: payload })
    default:
      return state
  }
}

export default secretTask
