<template>
  <div>
    <!-- 子路由出口 -->
    <router-view></router-view>

    <!-- 底部tab栏 -->
    <!-- route 开启路由模式 -->
    <van-tabbar v-model="active" route class="layout-tabbar">
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont iconshipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont iconwode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  props: [],
  data () {
    return {
      active: 0
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
