/**
 * @file combinReducers reducers
 */

import { combineReducers } from 'redux'

import data from './data'

const rootReducer = combineReducers({
  data,
})

export default rootReducer
