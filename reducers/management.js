import * as types from '../constants/ActionTypes'

const management = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_ISSIGNALING:
      return Object.assign({}, state, { issignaling: payload })
    default:
      return state
  }
}

export default management
