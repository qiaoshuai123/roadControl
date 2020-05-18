import RestUtil from '../utils/RestUtil'
import { API_TREEDATA } from '../constants/EvaluAPI'

export const getInterDataTree = () => {
  return async () => {
    const result = await RestUtil.post(API_TREEDATA)
    return result
  }
}

