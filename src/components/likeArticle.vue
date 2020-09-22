<template>
    <van-icon
    :color="value === 1 ? 'red' : ''"
    :name="value === 1?'good-job':'good-job-o'"
    @click="onLike"
    :loading="loading"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  created () {

  },
  methods: {
    async onLike () {
      try {
        let status = -1
        if (this.value === 1) {
          // 已收藏，取消收藏
          await addLike(this.articleId)
          // 更新视图
        } else {
          await deleteLike(this.articleId)
          // 更新视图
          status = 1
        }
        this.$emit('input', status)
        // 自定义事件修改数据不是立即的 所以下面要取反
        // this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast('数据请求失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
