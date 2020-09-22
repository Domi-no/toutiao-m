<template>
  <div class="user-profile">
    <!-- 导航栏  回退功能-->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <!-- 头像 -->
     <input type="file" hidden ref="file" @change="onFileChange">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="userProfile.photo" />
    </van-cell>
    <van-cell title="昵称" :value="userProfile.name" is-link  @click="isShowUpdateName=true"/>
    <van-cell title="性别" :value="userProfile.gender===1?'女':'男'" is-link  @click="isShowGenter=true"/>
    <van-cell title="生日" :value="userProfile.birthday" @click="isShowBirthday=true" is-link />
    <!-- 编辑昵称弹层  position弹出方式-->
    <van-popup round v-model="isShowUpdateName" style="height: 90%" position="bottom"><updataName v-if="isShowUpdateName" v-model="userProfile.name" @close="isShowUpdateName=false"></updataName></van-popup>
    <!-- 编辑昵称弹层 -->
    <!-- 编辑性别弹出层 -->
    <van-popup  v-model="isShowGenter" position="bottom"><updateGenter v-model="userProfile.gender" @close="isShowGenter=false" v-if="isShowGenter" /></van-popup>
    <!-- 编辑生日弹出层 -->
    <van-popup  v-model="isShowBirthday" position="bottom"><updateBirthday v-model="userProfile.birthday" v-if="isShowBirthday" @close="isShowBirthday=false" /></van-popup>
    <!-- 修改头像 -->
      <van-popup  v-model="isShowAvatar" position="bottom" style="height: 100%"><updateAvatar v-if="isShowAvatar" v-model="img" @close="isShowAvatar=false" @updateAvatar="userProfile.photo=$event" /></van-popup>

  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updataName from './components/update-name'
import updateGenter from './components//update-genter'
import updateBirthday from './components/update-birthday.vue'
import updateAvatar from './components/update-avatar'
export default {
  data () {
    return {
      userProfile: {},
      isShowUpdateName: false,
      isShowGenter: false,
      isShowBirthday: false,
      isShowAvatar: false,
      img: null
    }
  },
  components: {
    updataName,
    updateGenter,
    updateBirthday,
    updateAvatar
  },

  created () {
    this.loadUserProfile()
  },

  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.userProfile = data.data
        console.log(this.userProfile)
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    onFileChange () {
      // 获取文件dom对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      const data = window.URL.createObjectURL(file)
      console.log(data)
      this.img = data
      this.isShowAvatar = true
      //   file-input 如果选中同一张图片那么不会触发change事件
      // 解决办法就是每次使用完毕 把它的value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang='less'>
.van-image {
  height: 100%;
}
</style>
