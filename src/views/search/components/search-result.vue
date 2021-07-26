<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      try {
        // 1. 请求数据
        const { data: res } = await getSearch({
          page: this.page, // 页码
          per_age: this.perPage, // 每页大小
          q: this.searchText
        })
        console.log(res)
        // // // 模拟随机数失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('sddffff')
        // }
        // 2. 将数据添加到数组列表中
        const { results } = res.data
        this.list.push(...results)
        // 3. 将本次加载的loading 关闭
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          this.page++ // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
