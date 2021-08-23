import axios from 'axios'

export function request() {
  // 创建axios实例
  const instance = axios.create({
    // baseURL: 'http://127.0.0.1:8888/api/private/v1',
    // baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    // baseURL: 'http://106.53.73.30:8888/api/private/v1/',
    baseURL: 'https://lianghj.top:8888/api/private/v1/',
    timeout: 5000
  })
  // 请求拦截器
  instance.interceptors.request.use(config => {
    // 给 headers 请求头对象添加 token，才能获取数据
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // console.log(config)
    return config
  }, err => {
    console.log(err)
  })
  // 响应拦截
  // instance.interceptors.response.use(res => {
  //   return res.data
  // }, err => {
  //   console.log(err)
  // })
  // 返回这个promise对象
  return instance
}