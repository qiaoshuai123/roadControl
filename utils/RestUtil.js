/**
 * @file Http request
 */

import axios from 'axios'

function createInstance() {
  const instance = axios.create({
    baseURL: 'http://192.168.1.230:26001',
  })
  instance.get = (url, params) => {
    return axios({
      url,
      method: 'get',
      params,
    })
  }
  instance.post = (url, params) => {
    return axios({
      url,
      method: 'post',
      params,
    })
  }
  // 添加请求拦截器
  axios.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    return config
  }, (error) => {
    return Promise.reject(error)
  })
  return instance
}

export default createInstance()
