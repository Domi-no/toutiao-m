import dayjs from 'dayjs'
import Vue from 'vue'

// dayjs默认语言是英文 我们配置为中文
import 'dayjs/locale/zh-cn'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用
// dayjs()获取当前时间
console.log(dayjs().format('YYYY-MM-DD'))

// 使用过滤器格式化时间
Vue.filter('relativeTimevalue', value => {
  return dayjs().to(value)
})
