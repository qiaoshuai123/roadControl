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
    case types.GET_LOAD_PLANLOAD:
      return Object.assign({}, state, { loadPlanLoad: payload })
    case types.GET_DELETEDISTRICT:
      return Object.assign({}, state, { deleteDistrict: payload })
    // 子区域管理
    case types.GET_SUB_DELETEDISTRICT:
      return Object.assign({}, state, { subdeleteDistrict: payload })
    case types.GET_SUB_VALIDATE:
      return Object.assign({}, state, { subvalidate: payload })
    case types.GET_SUB_LOADUNITNAME:
      return Object.assign({}, state, { subloadUnitName: payload })
    case types.GET_SUB_LOADUNITNAMES:
      return Object.assign({}, state, { subloadUnitNames: payload })
    case types.GET_SUB_SAVEORUPDATEFORM:
      return Object.assign({}, state, { subsaveOrUpdateForm: payload })
    case types.GET_SUB_EDITDISTRICTINFOTHING:
      return Object.assign({}, state, { subeditDistrictInfoThing: payload })
    default:
      return state
  }
}

export default managements
