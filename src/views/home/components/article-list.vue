<template>
  <div class="article-list">
    <!-- PullRefresh 下拉刷新 包裹需要刷新的区域 -->
    <van-pull-refresh v-model="isreFreshLoading"
      :success-text="refreshSuccessText" @refresh="onRefresh"
      :success-duration="1500">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了"
        :error.sync="error" @load="onLoad">
        <article-item v-for="(article, index) in list" :key="index"
          :article="article" />
        <!-- <van-cell v-for="(article, index) in list" :key="index"
          :title="article.title"> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的 时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功'
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    async onLoad() {
      try {
        // 1. 请求数据
        const { data: res } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          // 时间戳 timestamp ,可以简单的理解为请求数据的页码
          //  请求第一页数据，当前最新时间戳 Date.now()
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你pre_timestamp
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 2.把请求结果数据放到 list 数组中
        const { results } = res.data
        // 数组展开操作符，它会把数组元素一个个拿出来
        this.list.push(...results)

        // 3.本次数据加载结束后，要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = res.data.pre_timestamp
        } else {
          // 没有数据，将finished 设置为 true ，不再加载数据
          this.finished = true
        }
      } catch (error) {
        // vant-list 错误提示 若列表数据加载失败，将 error 设置成 true 即可显示错误提示，用户点击错误提示后会重新触发 load 事件。
        console.log(error)
        // 请求失败，loading 需要关闭
        this.loading = false
        // 展示错误提示
        this.error = true
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      try {
        // 请求获取数据
        const { data: res } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          // 时间戳 timestamp ,可以简单的理解为请求数据的页码
          //  请求第一页数据，当前最新时间戳 Date.now()
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你pre_timestamp
          timestamp: Date.now(),
          with_top: 1
        })
        // // 模拟随机数失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('sddffff')
        // }
        const { results } = res.data
        // 将数据追加到列表的顶部
        this.list.unshift(...res.data.results)
        // 关闭下拉刷新的loading 状态
        this.isreFreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}

</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
