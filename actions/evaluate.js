/**
 * @file
 */

import * as types from '../constants/EvaluateTypes'
import RestUtil from '../utils/RestUtil'
import {
  API_TREEDATA,
  API_INTERFLOW,
  API_INTERQUEUE,
  API_INTERSATURATION,
  API_INTERSTOPNUM,
  API_INTERRATIO,
  API_INTERPHASEODDS,
  API_TRUNKLINEDELAYTIME,
  API_TRUNKLINESPEED,
  API_TRUNKLINESTOPNUM,
  API_TRUNKLINETRAVEROUTE,
  API_INTERCIRCULAR,
} from '../constants/EvaluAPI'

export const getInterDataTree = () => {
  return async () => {
    const result = await RestUtil.post(API_TREEDATA)
    return result
  }
}

export const getInterFlow = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_INTERFLOW}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_INTERFLOW, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getInterQueue = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_INTERQUEUE}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_INTERQUEUE, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getInterSaturation = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_INTERSATURATION}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_INTERSATUATION, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getInterStopNum = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_INTERSTOPNUM}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_INTERSTOPNUM, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getInterRatio = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_INTERRATIO}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_INTERRATIO, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getInterPhaseOdd = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_INTERPHASEODDS}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_INTERPHASEODD, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getTrunklineDelayTime = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_TRUNKLINEDELAYTIME}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_TRUNKLINEDELAYTIME, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getTrunklineSpeed = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_TRUNKLINESPEED}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_TRUNKLINESPEED, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getTrunklineStopNum = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_TRUNKLINESTOPNUM}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_TRUNKLINESTOPNUM, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getTrunkLineTravelRoute = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestUtil.post(`${API_TRUNKLINETRAVEROUTE}${params}`)
      if (result.data.code === '1') {
        dispatch({ type: types.GET_TRUNKLINETRAVEROUTE, payload: result.data })
      } else {
        console.error(result.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getInterCircular = (params) => {
  return async() => {
    const result = await RestUtil.post(`${API_INTERCIRCULAR}${params}`)
    return result
  }
}
