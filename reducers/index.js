/**
 * @file combinReducers reducers
 */

import { combineReducers } from 'redux'

import data from './data'
import interConfig from './interConfig'
import secretTask from './secretTask'
import managements from './managements'
import interManage from './interManage'
import logManagement from './logManagement'

const rootReducer = combineReducers({
  managements,
  data,
  interConfig,
  secretTask,
  interManage,
  logManagement,
})

export default rootReducer
