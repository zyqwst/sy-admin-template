'use strict'
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '../store'

axios.defaults.baseURL = process.env.BASE_API
axios.defaults.timeout = 5000

axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    config.headers['Authorization'] = getToken()
    return config
  }
)
axios.interceptors.response.use(response => {
  let result = response.data
  console.info(result)
  if (!result) {
    result = {
      code: '500',
      msg: '服务器数据异常'
    }
  }
  if (result.code === 200) {
    return result
  }
  const err = new Error(result.msg)
  err.data = result
  err.response = response
  throw err
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.msg = err.response.data.msg || '请求错误'
        err.code = 400
        break

      case 401:
        err.msg = err.response.data.msg || '未授权或授权过期，请重新登录'
        err.code = 401
        break

      case 403:
        err.msg = '拒绝访问'
        err.code = 403
        break

      case 404:
        err.msg = `请求地址出错: ${err.response.config.url}`
        err.code = 404
        break

      case 408:
        err.msg = '请求超时'
        err.code = 408
        break
      case 429:
        err.msg = '您的请求太频繁了，服务器受不了了(〒︿〒)'
        err.code = 429
        break
      case 500:
        err.msg = err.response.data.msg || '服务器内部错误'
        err.code = 500
        break

      case 501:
        err.msg = '服务未实现'
        err.code = 501
        break

      case 502:
        err.msg = '网关错误'
        err.code = 501
        break

      case 503:
        err.msg = '服务不可用'
        err.code = 503
        break

      case 504:
        err.msg = '网关超时'
        err.status = 504
        break

      case 505:
        err.msg = 'HTTP版本不受支持'
        err.code = 505
        break

      default:
        err.msg = '未知错误'
        err.code = 500
    }
  }
  Message({
    message: err.msg || '请求异常',
    type: 'error',
    duration: 3 * 1000
  })
  if (err.status === 401) {
    store.dispatch('logout')
  }
  return Promise.reject(err)
})

const $http = {
  get(url, params = null) {
    return axios.get(url, { params })
  },
  post(url, params) {
    return axios.post(url, params)
  }
}
export default $http
