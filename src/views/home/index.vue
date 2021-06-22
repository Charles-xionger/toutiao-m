<template>
  <div class="home-container">
    <!-- 导航栏 Nav -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round
        icon="search">搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 Nav -->

    <!-- 频道列表 -->
    <!-- swipeable 滑动效果 ，默认限于内容区域 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels"
        :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
        <!-- /文章列表 -->

      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() { },
  methods: {
    async loadChannels() {
      try {
        const { data: res } = await getUserChannels()
        console.log(res)
        this.channels = res.data.channels
      } catch (error) {
        this.$toast('获取用户频道失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset; //最大宽度不设置
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      // 左右撑开
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: ' ';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>
