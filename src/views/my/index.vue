<template>
  <div class="my-container">
    <!-- 如果user为true  user是token值 从vuex容器获取token值  如果没有为null null=false 那么显示未登录 -->
       <!-- 未登录状态根据user 隐藏退出登陆 并清空token值 -->
       <!-- 如果已登陆那么发起请求获取数据 -->
    <div class="header" v-if="!user">
      <img src="~@/assets/mobile.png" class="mobile-img" @click="$router.push('/login')" alt />
      <div class="text">登陆/注册</div>
    </div>
    <!-- 已登陆 -->
    <div class="userInfo header" v-else>
      <!-- 基本信息 -->
      <div class="base">
        <!-- 左布局 -->
        <div class="left">
          <!-- fit图片填充方式  round圆角-->
          <van-image fit="cover" round class="avatar" :src="userInfo.photo" />
          <span class="name">{{userInfo.name}}</span>
        </div>

        <!-- 右布局 -->
        <div class="right">
          <van-button type="default" size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{userInfo.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{userInfo.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>

    <!-- 收藏历史 -->
    <van-grid :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont iconshoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont iconlishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell class="logout-cell" v-show="user" title="退出登录" center @click="outUser"  />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'my',
  props: [],
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.user) {
      console.log(this, this.user)
      this.loadUser()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 获取个人信息
    async loadUser () {
      // 调用接口获取个人信息
      try {
        const { data } = await getUserInfo()
        // 把数据赋值给userInfo
        this.userInfo = data.data
        console.log(data)
      } catch (error) {
        console.log(error)
        this.$toast('获取失败') // vant插件弹出框
      }
    },
    // 退出
    outUser () {
      // 退出提示
      // 在组件需要使用this.$dialog来调用弹框组件
      this.$dialog.confirm({
        title: '退出',
        message: '真的要退出吗'
      })
        .then(() => {
          // on confirm
          // 确认退出：清除登陆状态（容器中的user+本地存储中的user)
          // 在vue文件中用$store 其它用store
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 361px;
  background: url("~@/assets/banner.png") no-repeat;
  background-size: cover; //全部显示
  display: flex; //居中
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .mobile-img {
    width: 132px;
    height: 132px;
  }
  .text {
    margin-top: 12px;
    font-size: 34px;
    color: #fff;
  }
}
.grid-item {
  background: #fff;
  .iconfont {
    font-size: 45px;
  }
  .iconshoucang {
    color: #eb5253;
  }
  .iconlishi {
    color: #ff9d1d;
  }
  .text {
    color: #000;
    margin-top: 8px;
    font-size: 28px;
  }
}
.header {
  width: 750px;
  height: 401px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.userInfo {
  .base {
    width: 750px;
    height: 231px;
    padding: 76px 32px 23px;
    // background: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 2px solid #fff;
      }
      .name {
        font-size: 29px;
        margin-left: 22px;
      }
    }
  }
}

.data {
  width: 750px;
  display: flex;
  justify-content: space-around;
  .data-item {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    span:nth-child(1) {
      font-size: 36px;
      margin-bottom: 15px;
    }
    span:nth-child(2) {
      font-size: 23px;
    }
  }
}
.logout-cell {
  height: 100px;
  text-align: center;
  color: #eb5253;
  margin: 10px 0;
  font-size: 30px;
}
</style>
