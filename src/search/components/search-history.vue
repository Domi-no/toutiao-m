<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <!-- 处于删除状态 -->
      <div v-if="isDeleteShow">
        <!-- 点击全部删除清空数组 -->
        <span @click="$emit('clear-earch-istorise')">全部删除</span>
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <!-- 处于非删除状态 -->
      <van-icon name="delete" v-else @click="isDeleteShow=true" />
    </van-cell>
    <van-cell v-for="(item,index) in searchHistorise" :key="index" :title="item" @click="onSearchHistorise(item,index)">
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistorise: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  created () {},
  methods: {
    onSearchHistorise (item, index) {
      // 处于删除状态
      if (this.isDeleteShow) {
        this.searchHistorise.splice(index, 1)
      } else {
        // 不是处于删除状态那么把值赋值给输入框用于搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
