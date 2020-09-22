<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button icon="search" slot="title" type="info" size="small" round class="search-btn" to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- tab标签页 -->
    <van-tabs class="channel-tabs" swipeable v-model="active" animated>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <artcile-list :channel="channel"></artcile-list>
      </van-tab>
      <!-- 填充盒子 使最后一个标签完全显示出来 -->
      <div class="placehander" slot="nav-right"></div>
      <!-- 汉堡更多选项栏 -->
      <div slot="nav-right" class="hamburger-btn" @click="showEditChannel">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup closeable close-icon-position="top-left" v-model="isChannelEditShow" position="bottom" :style="{ height: '100%' }" >
      <!-- 频道修改路由 -->
      <channel-edit @chan="AditChannel"  @remove="removeChannel" :myChannels="channels" :active="active"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArtcileList from '@/components/article-list.vue'
import ChannelEdit from '@/components/channelEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  props: [],
  components: {
    ArtcileList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: {},
      isChannelEditShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 获取频道列表
    async loadChannels () {
      try {
        // 获取本地数据
        if (this.user || !getItem('TOUTIAO_CHANNELS')) {
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        } else {
          this.channels = getItem('TOUTIAO_CHANNELS')
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    showEditChannel () {
      this.isChannelEditShow = true
    },
    AditChannel (index) {
      this.active = index
      this.isChannelEditShow = false
    },
    removeChannel (index) {
      this.active = index
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 97px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border: none;
  font-size: 28px;
  .van-icon {
    font-size: 32px;
  }
}

/deep/.channel-tabs {
  .van-tabs__warp {
    position:fixed;
    top: 92px;
    z-index: 2;
    left: 0;
    right: 0;
    height: 82px;

  }
  .van-tab {
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777777;
  }
  .van-tab--active {
    color: #333333;
  }
  .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  .placehander{
    // 不参与flex布局平分
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
}
</style>
