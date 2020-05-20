/**
 * @file
 */

import RestUtil from '../utils/RestUtil'
import {
    API_TREEDATA,
    API_INTERFLOW,
    API_INTERQUEUE,
    API_INTERSATURATION,
    API_INTERSTOPNUM,
    API_INTERRATIO,
    API_INTERPHASEODDS,
    API_INTERCIRCULAR,
} from '../constants/EvaluAPI'

export const getInterDataTree = () => {
    return async() => {
        const result = await RestUtil.post(API_TREEDATA)
        return result
    }
}

export const getInterFlow = (params) => {
    return async() => {
        const result = await RestUtil.post(`${API_INTERFLOW}${params}`) // 
        return result
    }
}

export const getInterQueue = (params) => {
    return async() => {
        const result = await RestUtil.post(`${API_INTERQUEUE}${params}`)
        return result
    }
}

export const getInterSaturation = (params) => {
    return async() => {
        const result = await RestUtil.post(`${API_INTERSATURATION}${params}`)
        return result
    }
}

export const getInterStopNum = (params) => {
    return async() => {
        const result = await RestUtil.post(`${API_INTERSTOPNUM}${params}`)
        return result
    }
}

export const getInterRatio = (params) => {
    return async() => {
        const result = await RestUtil.post(`${API_INTERRATIO}${params}`)
        return result
    }
}

export const getInterPhaseOdd = (params) => {
    return async() => {
        const result = await RestUtil.post(`${API_INTERPHASEODDS}${params}`)
        return result
    }
}
export const getInterCircular = (params) => {
    return async() => {
        const result = await RestUtil.post(`${API_INTERCIRCULAR}${params}`)
        return result
    }
}