<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
     <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @input="isRsultShow=false"
      />
    </form>
     <!-- 搜索结果 -->
    <search-result v-if="isRsultShow"  :searchText="searchText"></search-result>
    <!-- 联想建议 -->
    <search-suggestion :searchText="searchText" v-else-if="searchText" @search="onSearch"></search-suggestion>
    <!-- 历史记录 -->
    <search-history :searchHistorise="searchHistorise" @clear-earch-istorise="searchHistorise=[]" @search="onSearch" v-else></search-history>

  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchResult from './components//search-result'
import searchSuggestion from './components/search-suggestion'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'searchIndex',
  props: [],
  components: {
    searchSuggestion,
    searchResult,
    searchHistory
  },
  data () {
    return {
      searchText: '',
      isRsultShow: false,
      searchHistorise: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  created () {},
  methods: {
    onSearch (val) {
      // 更新输入框内容
      this.searchText = val
      console.log(val)
      // 存储历史记录
      // 要求不要有重复的历史记录 最新的排在最上边
      // 查看数组是否有重复的一项
      const index = this.searchHistorise.indexOf(val)
      // 如果有重复的一项 那么删除数组那一项
      if (index !== -1) {
        this.searchHistorise.splice(index, 1)
      }
      // 把数据添加到最前面
      this.searchHistorise.unshift(val)
      console.log(this.searchHistorise)
      // 方式2 利用new Set 删除重复项
      // this.searchHistorise.unshift(val)
      // this.searchHistorise = new Set(this.searchHistorise)
      // 显示渲染搜索结果
      if (this.searchText.trim() === '') {
        this.isRsultShow = false
      }
      this.isRsultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    // 监听历史记录数据
    searchHistorise (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  }
}
</script>

<style lang="less" scoped>
// .van-search__action{
//     color: #fff;
// }
.search {
    padding-top: 106px;
    .van-search {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
    .van-search__action {
        color: #fff;
    }
}
</style>
