<template>
<!-- 评论数据列表 -->
  <div>
    <van-list :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
     <commentItem  v-for="(item,index) in list" :key="index" :item="item"/>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import commentItem from './comment-item.vue'
export default {
  props: {
    source: { // 文章id/评论id
      type: [Number, String, Object],
      required: true
    },
    list: { // 评论组件的评论传值给父组件再给评论列表组件
      type: Array,
      default: () => [] // 默认返回一个空数组
    },
    type: {
      type: String,
      // 自定义Prop数据验证
      validator (value) {
        return ['a', 'c'].includes(value)// 返回一个布尔值
      },
      default: 'a'

    }
  },
  components: {
    commentItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      total: 0,
      lastId: 0,
      error: false
    }
  },
  created () {
    //   当你手动初始onload的话 他不会自动开始初始的loading 所以我们要手动开启loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    async  onLoad () {
      try {
        const { data } = await getComments({
          type: this.type, // 评论类型
          //   axios会把params 对象转为键值对 的格式放在url
          source: this.source.toString(), // 文章id或评论id
          offset: this.offset, // 获取下一页数据的标记
          limit: this.limit // 获取评论的数量
        })
        const { results } = data.data
        // 传递文章总数量
        this.$emit('onLoadSuccess', data.data)
        this.list.push(...results)
        this.loading = false// 结束加载状态
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        // this.error = true
        this.$toast('数据加载失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
</style>
