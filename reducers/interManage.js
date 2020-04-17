/**
 * @file 路口管理 reducer
 */

import * as types from '../constants/InterManageTypes'

const interManage = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_UNITINTER_INFO:
      return Object.assign({}, state, { unitInterInfo: payload })
    default:
      return state
  }
}

export default interManage

