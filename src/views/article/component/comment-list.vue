<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，请重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a' // 普通类型指定默认值
    }

  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loading = true // 手动加载loading效果
    this.onLoad()
  },
  mounted () { },
  methods: {
    async onLoad () {
      try {
        // 获取文章的评论和获取评论的回复是同一个接口
        // 唯一的区别是接口参数不一样
        // type  a-对文章(article)的评论，c-对评论(comment)的回复
        // source 源id，文章id或评论id
        // 1.请求获取数据
        const params = {
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        }
        const { data: res } = await getComments(params)
        // console.log('111', res)
        // 2. 请求数据添加到列表
        const { results } = res.data
        this.list.push(...results)

        // 把文章的总数量传递给父组件
        this.$emit('onload-success', res.data)

        // 3. 将 loading 设置为 false
        this.loading = false
        // 4. 判断是否还要数据
        if (results.length) {
          //    有就更新获取数据下一页的数据页码
          this.offset = res.data.last_id
        } else {
          //    没有就将 finished设置成结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
