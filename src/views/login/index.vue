<template>
  <div>
    <van-nav-bar class="page-nav-bar" title="登陆" left-arrow >
        <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="手机号"
        :rules="userRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="验证码"
        :rules="userRules.code"
        type="number"
        maxlength="6"
      >
      <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down :time="1000*60" format="ss s" @finish="isCountDownShow=false" v-if="isCountDownShow"/>
          <van-button v-else class="send-sms-btn" round size="small" type="default" native-type="button" @click="onSend">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;" class="login-btn-warp">
        <van-button block type="info" native-type="submit" class="login-btn">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
export default {
  name: 'login',
  props: [],
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userRules: {
        mobile: [{ required: true, message: '请填写手机号码' }, { pattern: /^1[3|7|9]\d{9}$/, message: '手机号码格式错误' }],
        code: [{ required: true, message: '请填写验证码' }, { pattern: /^\d{6}/, message: '验证码格式错误' }]
      },
      isCountDownShow: false

    }
  },
  created () {},
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // .TODO: 2.验证表单
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true // 背景点击
      })
      // 3.提交表单验证请求
      try {
        // 请求成功返回数据token值
        const res = await login(user)
        // 将token值存储到本地
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登陆成功')
        console.log('登陆成功', res)
        this.$router.push('/')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('验证码错误')
          console.log('账号或验证码错误', error.config)
        }
      }
    },
    // 倒计时
    async onSend () {
      console.log('onSendSms')
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await getSmsCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont{
  font-size: 37px;
}
.send-sms-btn{
  width: 160px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 16px;
  color: #666;
}
.login-btn-warp{
  padding: 53px 33px;
  .login-btn{
    background-color: #6db4fb;
    border: none;
  }
}
</style>
