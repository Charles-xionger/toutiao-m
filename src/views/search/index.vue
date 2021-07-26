<template>
  <div class="search-container">
    <!-- 搜索栏-start -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
     -->
    <form
      class="search-form"
      action="/"
    >
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>
    <!-- 搜索栏-end -->

    <!-- 搜索结果-start -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 搜索结果-end -->

    <!-- 联想建议-start -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 联想建议-end -->

    <!-- 历史记录-start -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories=[]"
      @search="onSearch"
    ></search-history>
    <!-- 历史记录-end -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  props: {
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 搜索结果的展示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索历史记录
    }
  },
  computed: {},
  watch: {
    // 监听搜索结果，本地存储
    searchHistories (val) {
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
    }
  },
  created () { },
  mounted () { },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        // 如果存在，删除，并添加
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
