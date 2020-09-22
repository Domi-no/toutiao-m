<template>
  <div>
    <van-nav-bar
      title="编辑昵称"
      left-text="返回"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
   <div style="padding: 10px;">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserName } from '@/api/user'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  created () {},
  methods: {
    async onClickRight () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止加载中点击背景
        duration: 0
      })
      try {
        if (this.message.trim() === '') return this.$toast('请输入昵称')
        await updateUserName({
          name: this.message
        })
        this.$emit('input', this.message)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (err) {
        console.dir(err)
        if (err.response && err.response.status === 409) {
          return this.$toast('用户名已存在')
        }
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background: #f5f7f9;
}
</style>
