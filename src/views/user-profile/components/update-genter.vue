<template>
  <div>
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserName } from '@/api/user'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      localGenter: this.value,
      columns: ['男', '女']
    }
  },
  created () {},
  methods: {
    //   完成
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止加载中点击背景
        duration: 0
      })
      try {
        // if (this.message.trim() === '') return this.$toast('请输入昵称')
        await updateUserName({
          gender: this.localGenter
        })
        this.$emit('input', this.localGenter)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.localGenter = index
    }

  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
</style>
