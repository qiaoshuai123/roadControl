/**
 * @file Http request
 */

import axios from 'axios'

function createInstance() {
  if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://192.168.1.230:8888'
  } else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'http://39.100.128.220:7002'
  }
  // 添加请求拦截器
  axios.interceptors.request.use((config) => {
    return config
  }, (error) => {
    console.log(error)
    return Promise.reject(error)
  })
  return axios
}
export default createInstance()
