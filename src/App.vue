<template>
  <div id="app">
    <!-- 路由的出口 -->
    <!-- <router-view /> -->
    <!--<router-view/>-->
    <!--页面返回不刷新-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
/* 每个页面公共css */
@import '../src/assets/common.less';
</style>
