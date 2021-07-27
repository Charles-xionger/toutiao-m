/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// const jsonStr = '{ "art_id": 1245953273786007552 }'

// console.log(JSON.parse(jsonStr))
// JSON.parse()
// JSON.stringify()

// console.log(JSONBig.parse(jsonStr))
// JSONBig 可以处理数据中超出 JavaScript 安全整数范围的问题
// JSONBig.parse() 把 JSON 格式的字符串转为 JavaScript 对象
// JSONBig.stringify() 把 JavaScript 对象转为 JSON 格式字符串

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基础路径

  // 自定义后端返回的原始数据
  // data :后端返回的原始数据， JSON格式的字符串
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
    // axios 默认会在内部这样来处理后端的返回的数据
    // return JSON.parse(data)
  }]
})

// 请求拦截器
// 添加一个请求拦截器 add a request interceptor
request.interceptors.request.use(function (config) {
  // 在请求发出之前进行一些信息设置
  // config 本次请求的配置对象
  // console.log(config)
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
