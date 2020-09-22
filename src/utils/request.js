import axios from 'axios'
import store from '@/store'
// JSONBig 可以处理数据中超出javaScript安全整数范围的问题
// JSONBIG.parse() 把JSON格式的字符串转为javaScript对象
// JSONBig.stringify()把javaScript 对象转为JSON格式的字符串转回原来JSON格式字符串
// 使用的时候需要把BigNumber类型的数据转为字符串来使用
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return JSONBig.parse(data)
    } catch (error) {
      // 如果转换失败则包装为同一数据格式并返回
      return data
    }
  }]
})
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
