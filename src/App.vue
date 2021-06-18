<template>
  <div id="app">
    <!-- 路由的出口 -->
    <div>
      <i class="iconfont icon-dianzan"></i>
    </div>
    <van-button round type="primary">主要按钮</van-button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
</style>
