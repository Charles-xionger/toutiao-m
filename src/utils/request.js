/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 接口的基础路径
})

// 请求拦截器
// 添加一个请求拦截器 add a request interceptor
request.interceptors.request.use(function (config) {
  // 在请求发出之前进行一些信息设置
  // config 本次请求的配置对象
  console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意一定要返回config ,否则请求停在这里就出不去了
  return config
}, function (error) {
  // 处理响应的错误信息(请求本身出错)
  return Promise.reject(error)
})

// 响应拦截器

export default request
