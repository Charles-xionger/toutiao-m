<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复' ">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>
    <!-- 滚动区域 -->
    <div class="scross-wrap">
      <comment-item :comment="comment" />

      <van-cell title="全部回复"></van-cell>
      <!-- 评论回复 -->
      <comment-list
        :list="commentList"
        :source="comment.com_id"
        type="c"
      />
      <!-- /评论回复 -->
    </div>
    <!-- 滚动区域 -->

    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button
        class="post-btn"
        size="small"
        round
        @click="isPostShow = true"
      >写评论</van-button>
    </div>
    <!-- /发布评论 -->

    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <comment-post
        :target="comment.com_id"
        @post-success="onPostSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: [] // 评论回复的列表
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onPostSuccess (data) {
      // 更新回复的数量
      this.comment.reply_count++
      // 关闭弹层
      this.isPostShow = false
      // 将最新回复的内容展示到列表顶部
      this.commentList.unshift(data.new_Obj)
    }
  }
}
</script>

<style scoped lang='less'>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1 solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
