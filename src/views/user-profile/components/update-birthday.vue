<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>

import { updateUserName } from '@/api/user'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      //   把字符串转成日期对象
      currentDate: new Date(this.value)
    }
  },
  created () {},
  methods: {
    async onConfirm () {
      console.log(1)
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止加载中点击背景
        duration: 0
      })
      try {
        // if (this.message.trim() === '') return this.$toast('请输入昵称')
        await updateUserName({
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
        this.$emit('close')
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
</style>
