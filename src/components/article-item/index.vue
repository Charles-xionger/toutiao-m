<template>
  <!--
    van-cell to属性 和 VueRouter 中的 RouterLink 导航组件的 to 属性用法一样
    :to="'/article/' + article.articleId"
    :to="`/article/${article.art_id}`"
     -->
  <van-cell
    class="article-item"
    :to="{
    // 根据路由名称进行跳转
          name: 'article',

          // 传递路由动态参数
          params: {
            // 属性名： 路由路径种设计的动态参数名称
          articleId: article.art_id
          }
        }"
  >
    <div
      slot="title"
      class="title van-multi-ellipsis--l2"
    >{{article.title}}
    </div>
    <div slot="label">
      <div
        class="cover-wrap"
        v-if="article.cover.type === 2"
      >
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            v-if="article.cover.type === 1"
            slot="default"
            class="cover-item-image"
            :src="img"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding: left 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-image {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
