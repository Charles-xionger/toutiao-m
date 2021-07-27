<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
  >已关注</van-button>

  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
  >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  components: {},
  // 自定义 v-model 的属性和名称，默认value，input
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
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
    async onFollow () {
      this.loading = true // 展示关注按钮的 loading 状态
      try {
        if (this.isFollowed) {
          // 已关注，执行取消关注
          await deleteFollow(this.userId)
        } else {
          // 没有关注，执行关注
          await addFollow(this.userId)
        }

        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed
        // this.$emit('update-is_followed', !this.value)
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，请重试！'
        if (error.response && error.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.loading = false // 展示关注按钮的 loading 状态
    }
  }
}
</script>

<style scoped lang='less'></style>
