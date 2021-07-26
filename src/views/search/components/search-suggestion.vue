<template>
  <div class="search-suggestion">
    <van-cell
      :title="text"
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div
        slot="title"
        v-html="highlight(text,searchText)"
      ></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
// 按需加载函数
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当 searchText 发生改变的时候会调用 hander 函数
      // 注意： handler 函数名称是固定的
      // handler (value) {
      //   this.loadSearchSuggestion(value)
      // },
      // debounce 函数
      // 参数1：函数
      // 参数2：防抖时间
      // 返回值：防抖之后的函数，和参数1功能是一样的
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value)
      }, 200),
      immediate: true // 你可以传入回调数组，它们会被逐一调用
    }
  },
  created () { },
  mounted () { },
  methods: {
    async loadSearchSuggestion (q) {
      try {
        const { data: res } = await getSearchSuggestion(q)
        this.suggestions = res.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    // 参数 source: 原始字符串
    // 参数 keyword: 需要高亮的关键词
    // 返回值：替换之后的高亮字符串
    highlight (source, keyword) {
      const highlightStr = `<span style="color: #3296fa">${keyword}</span>`
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(keyword, 'gi')
      return source.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less"></style>
