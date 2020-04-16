/**
 * @file combinReducers reducers
 */

import { combineReducers } from 'redux'

import data from './data'
import interConfig from './interConfig'
import secretTask from './secretTask'
import managements from './managements'

const rootReducer = combineReducers({
  managements,
  data,
  interConfig,
  secretTask,
})

export default rootReducer
