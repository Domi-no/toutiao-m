<template>
    <!-- 联想建议 -->
    <div class="search-suggestion">
      <!-- 渲染联想建议 -->
      <van-cell v-for="(text,index) in suggestions"  :key="index" icon="search" @click="$emit('search',text)">
        <span slot="title" v-html="heightlight(text)"></span>
      </van-cell>
    </div>
     <!-- 双花括号绑定会直接输出纯文本内容 -->
    <!-- <div>{{ htmlStr }}</div> -->

    <!-- 使用 v-html 指令可以绑定渲染带有 HTML 标签的字符串 -->
    <!-- <div v-html="htmlStr"></div> -->
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
// 按需导入防抖lodash
import { debounce } from 'lodash'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: ''
    }
  },
  created () {},
  methods: {
    async getSearchText (q) {
      try {
        // 获取接口 并传值 请求数据 并赋值
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取数据失败')
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
  },
  watch: {
    searchText: {
      // 当searchText发生改变的时候就会调用handler函数
      // 注意：handler函数名称是固定的
      // debounce 函数
      // 参数1:一个函数
      // 参数2:延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        // 每次输入都会调用函数 并传入输入的值
        this.getSearchText(value)
      }, 300),
      //   该回调函数会在侦听开始之后被立即调用
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
