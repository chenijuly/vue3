/*
 * @Description: 
 * @Author: jdchen
 * @Date: 2023-12-27 21:51:05
 * @LastEditors: jdchen
 * @LastEditTime: 2023-12-27 22:34:21
 */

import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    console.log(config);
    const token_type="Bearer"
    config.headers.Authorization = token_type+ ' ' + sessionStorage.getItem('token')
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export function get(url, config) {
  return service({
    url,
    method: 'get',
    ...config
  })
}

export function post(url, config) {
  return service({
    url,
    method: 'post',
    ...config
  })
}

export function put(url, config) {
  return service({
    url,
    method: 'put',
    ...config
  })
}

export function del(url, config) {
  return service({
    url,
    method: 'delete',
    ...config
  })
}