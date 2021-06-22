import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn' // ES 2015

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用 relativeTime 插件
dayjs.extend(relativeTime)

// dayjs默认语言是英文， 我们这里配置中文
dayjs.locale('zh-cn') // 全局使用

// 定义一个全局过滤器 （仅供模板字符串使用）
// 参数1: 过滤器名称
// 参数2：过滤器函数
// 使用方式： {{ 表达式| 过滤器名称 }}
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

// dayjs() 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))
// dayjs().from(dayjs('1990-01-01')) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()
