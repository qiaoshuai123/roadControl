import * as types from '../constants/ActionTypes'

const logManagement = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_LOADMANAGEMENT:
      return Object.assign({}, state, { loadManageMent: payload })
    default:
      return state
  }
}

export default logManagement
