/**
 * @file combinReducers reducers
 */

import { combineReducers } from 'redux'

import data from './data'
import interConfig from './interConfig'
import management from './management'

const rootReducer = combineReducers({
  data,
  interConfig,
  management,
})

export default rootReducer
