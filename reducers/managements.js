import * as types from '../constants/ActionTypes'

const managements = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_LOADMANAGEMENT:
      return Object.assign({}, state, { loadManageMent: payload })
    case types.GET_VALIDATE:
      return Object.assign({}, state, { validate: payload })
    case types.GET_LOADUNITNAME:
      return Object.assign({}, state, { loadUnitName: payload })
    case types.GET_LOADUNITNAMES:
      return Object.assign({}, state, { loadUnitNames: payload })
    case types.GET_SAVEORUPDATEFORM:
      return Object.assign({}, state, { saveOrUpdateForm: payload })
    case types.GET_LOADPLANTREE:
      return Object.assign({}, state, { loadPlanTree: payload })
    case types.GET_DELETEDISTRICT:
      return Object.assign({}, state, { deleteDistrict: payload })
    default:
      return state
  }
}

export default managements
