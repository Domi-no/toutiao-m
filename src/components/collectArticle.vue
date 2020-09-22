<template>
    <van-icon
    :color="value ? '#ffa500' : ''"
    :name="value?'star':'star-o'"
    :loading="loading"
    @click="onCollect"/>
</template>

<script>
// props undefind报错 布局底部区域应该在文章内容里面 不应该一开始就预备好
import { addCollect, deleteCollect } from '@/api/article'
export default {
  props: {
    value: {
      type: Boolean,
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
    async onCollect () {
      try {
        if (this.value) {
          // 已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        // 自定义事件修改数据不是立即的 所以下面要取反
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast('数据请求失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
