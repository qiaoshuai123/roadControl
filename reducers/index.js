/**
 * @file combinReducers reducers
 */

import { combineReducers } from 'redux'

import data from './data'
import interConfig from './interConfig'
import management from './management'
import secretTask from './secretTask'

const rootReducer = combineReducers({
  data,
  interConfig,
  management,
  secretTask,
})

export default rootReducer
