<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
        liked: value === 1
    }"
    :loading="loading"
    @click="onCollect"
  ></van-button>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'LikeArticle',
  components: {},
  props: {
    value: {
      required: true
    },
    articleId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已经点赞，取消点赞
          await deleteLike(this.articleId)
          this.$toast('取消点赞')
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang='less'>
/deep/ .liked {
  .van-button__content {
    color: #e5645f;
  }
}
</style>
