<template>
  <div class="home-container">
    <!-- 导航栏 Nav -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
    >
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 Nav -->

    <!-- 频道列表 -->
    <!-- swipeable 滑动效果 ，默认限于内容区域 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable
    >
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
        <!-- /文章列表 -->

      </van-tab>
      <div
        slot="nav-right"
        class="placeholder"
      ></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- /频道列表 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :myChannels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false // 控制编辑频道弹出层的显示状态
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () { },
  methods: {
    async loadChannels () {
      try {
        let channels = []

        if (this.user) {
          // 已登录，请求获取用户频道列表
          const { data: res } = await getUserChannels()
          channels = res.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            // 有，拿来用
            channels = localChannels
          } else {
            // 没有，请求获取默认频道列表
            const { data: res } = await getUserChannels()
            channels = res.data.channels
          }
        }
        this.channels = channels
      } catch (error) {
        this.$toast('获取用户频道失败')
      }
    },

    onUpdateActive (index, isChannelEditShow = true) {
      // 更新激活的频道
      this.active = index

      // 关闭编辑频道弹层
      this.isChannelEditShow = isChannelEditShow
    }
  },
  // 在页面离开时记录滚动位置
  beforeRouteLeave (to, from, next) {
    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    next()
  },

  // 进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter (to, from, next) {
    next(vm => {
      document.body.scrollTop = vm.scrollTop
    })
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
