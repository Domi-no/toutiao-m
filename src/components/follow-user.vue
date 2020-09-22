<template>
  <van-button
    v-if="!isF"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow()"
  >关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow()"
  >已关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'userFollow',
  props: {
    isFollow: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isF: this.isFollow,
      loading: false
    }
  },
  created () {},
  methods: {
    // 关注取消关注用户
    async onFollow () {
      this.loading = true
      try {
        if (this.isF) {
          await addFollow(this.userId)
        } else {
          await deleteFollow(this.userId)
        }
        this.isF = !this.isF
      } catch (error) {
        let message = '数据请求失败'
        if (error.response && error.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }

  }
}
</script>

<style lang="less" scoped>
</style>
