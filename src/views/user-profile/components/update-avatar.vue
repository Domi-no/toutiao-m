<template>
   <div class="update-photo">
    <img :src="value" ref="img">
    <div class="toobar">
        <div class="cancel" @click="$emit('close')">取消</div>
        <div class="confirm" @click="onClickRight">完成</div>
    </div>
   </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/user'
export default {
  props: {
    value: {
      type: [Object, String],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  created () {

  },
  methods: {
    onClickRight () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      // 后端剪切图片使用getData()获取数据
      // console.log(this.cropper.getData())
      //   如果是纯客户端的图片裁切 则使用getCroppedCanvas方法，该方法得到裁切之后的图片对象
      // 类似于URL.createObjectURL
      // 如果接口要求Content-Type是multipart/form-data 则你必须传递FormData对象
      try {
        this.cropper.getCroppedCanvas().toBlob(async blob => {
          console.log(1)
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await updateUserAvatar(formData)
          this.$emit('close')
          this.$emit('updateAvatar', data.data.photo)
        })
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景

    })
    console.log(this.cropper)
  }
}
</script>

<style lang="less" scoped>
.update-photo{
    background-color: #000;
    height: 100%;

.toobar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel, .confirm{
        width: 90px;
        height: 90px;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
         padding: 0 15px;
    }
}
}
img{
    display: block;
    width: 100%;
}

</style>
