<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" :error.sync="error" finished-text="没有更多了" error-text="加载失败，请点击重试" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" >
         <span slot="title" v-html="heightlight(item.title)"></span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search.js'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  created () {},
  methods: {
    async onLoad () {
      try {
        // 获取数据
        const { data } = await getSearch({
          page: this.page, // 页码
          per_page: this.perPage, // 每页数目
          q: this.searchText
        })
        console.log(data)
        const { results } = data.data
        //   将数据用扩展运算符添加到列表
        this.list.push(...results)
        //   3.设置加载状态结束
        this.loading = false
        //   4.判断数据是否加载完毕
        if (results.length) {
          this.page++ // 更新下一页数据的页码
        } else {
          this.finished = true // 没有数据了 将加载状态设置结束 不再onload
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    heightlight (text) {
      const heightlightstr = `<span style="color:#3296fa">${this.searchText}</span>`
      // 正则 g 全局 i 忽略大小写
      // RegExp正则表达式构造函数
      // 参数1:匹配模式字符串，它会根据这个字符串创建正则对象
      // 参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      // text.replace(/匹配的内容/gi,heightlightstr)
      return text.replace(reg, heightlightstr)
    }

  }

}
</script>

<style lang="less" scoped>
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
