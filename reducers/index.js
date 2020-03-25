/**
 * @file combinReducers reducers
 */

import { combineReducers } from 'redux'

import data from './data'
import interConfig from './interConfig'

const rootReducer = combineReducers({
  data,
  interConfig,
})

export default rootReducer
