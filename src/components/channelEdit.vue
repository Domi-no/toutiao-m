<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false" class="title-text">
      <van-button size="mini" round type="danger" plain @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item class="grid-item" v-for="(value,index) in myChannels" :key="index" @click="channeL(value,index)">
        <van-icon class="clearicon" slot="icon" name="clear" v-show="isEdit && value.id!==0"></van-icon>
        <span slot="text" :class="{active:index===active}" class="text">{{value.name}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="(value,index) in recommendChannels"
        :key="index"
        :text="value.name"
        icon="add"
        @click="onChannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deletUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  props: ['myChannels', 'active'],
  data () {
    return {
      allChannel: [], // 全部频道
      isEdit: false // 控制编辑显示
    }
  },
  created () {
    //   获取数据
    this.getAllChannel()
  },
  methods: {
    //   获取频道
    async getAllChannel () {
      const { data } = await getAllChannels()
      this.allChannel = data.data.channels
      //   console.log(this.allChannel)
    },
    // 点击添加到我的频道
    async  onChannel (value) {
      this.myChannels.push(value)
      if (this.user) {
        try {
          await addUserChannel({
            id: value.id, // 频道id
            seq: this.myChannels.length // 频道序号 当点击添加会刷新我的频道里面length的长度
          })
        } catch (error) {
          this.$toast('数据存储失败')
        }
      } else {
        //   本地存储我的频道
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },

    // 利用子传父改变父组件的active
    channeL (value, index) {
      // 如果是按钮显示的是编辑那么点击方块跳转相应标签
      if (!this.isEdit) {
        this.$emit('chan', index)
      } else if (this.isEdit && index !== 0) {
        //   根据索引删除对应值
        this.myChannels.splice(index, 1)
        // 点击按钮删除频道
        if (index <= this.active) {
          this.$emit('remove', this.active - 1)
        }
        this.deleteChannel(value)// 单独封装删除函数并调用
      }
    },
    async deleteChannel (value) {
      if (this.user) {
        await deletUserChannel(value.id)
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }

  },
  //   计算属性会观测内部数据的变化 如果依赖的数据发生变化 则计算属性会重新执行
  computed: {
    ...mapState(['user']),
    //   计算属性 加载一次会暂存到内存 提高性能 浪费内存
    recommendChannels () {
      // 数组的filter方法:遍历数组 把符合条件的元素存储到新数组
      return this.allChannel.filter((changnel) => {
        //   数组的find方法 遍历数组 把符合条件的第一个元素返回
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === changnel.id
        })
      })

      //   const channels = []
      //   this.allChannel.forEach(channel => {
      //     // find遍历数组 找到满足条件的元素项
      //     const ret = this.myChannels.find(myChannel => {
      //       return myChannel.id === channel.id
      //     })
      //     // 如果我的频道中不包括该频道项 则手机到推荐频道中
      //     if (!ret) {
      //       channels.push(channel)
      //     }
      //   })
      //   return channels
    }
  }
}
</script>

<style lang="less" scoped>
// 盒子主题
// .channel-edit {
//   margin-top: 80px;
//   white-space: nowrap;
//   //   我的频道小方块样式
//   .channel-item {
//     position: relative;
//     height: 86px;
//     min-width: 182px;
//     .channeltext {
//       font-size: 26px;
//     }
//     .active {
//       color: red;
//     }
//     // 推荐频道小方块样式
//     /deep/ .van-grid-item__content {
//       background-color: #f5f5f6;
//       max-width: 160px;
//       flex-direction: row;
//       .van-grid-item__text {
//         color: #222;
//         font-size: 26px;
//         margin-top: 0;
//       }
//       //   给图标设置样式
//       .van-icon {
//         font-size: 24px;
//         color: rgb(119, 112, 100);
//       }
//       // 删除图标
//     }
//     .van-icon-add {
//       font-size: 14px;
//     }
//     .clearicon {
//       font-size: 12px;
//       position: absolute;
//       top: -50px;
//       right: -90px;
//       z-index: 2;
//       color: rgb(119, 112, 100);
//     }
//   }
// }

.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-add {
          font-size: 16px;
          margin-right: 6px;
          color: wheat;
        }
      }
    }
  }
}
</style>
