<template>
  <!-- 评论回复 -->
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close-reply')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项  当前组件渲染评论内容组件并传入组件必要数据-->
    <commentItem :item="comment" />
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表   当前组件渲染评论/回复列表数据-->
    <commentList :list="commentList" :source="comment.com_id" :type="'c'" />
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <div class="reply-bottom">
      <van-button class="write-btn" size="small" round @click="isPostShow = true">写评论</van-button>
    </div>
    <!-- /底部 -->
    <!-- 评论模块 -->
    <van-popup v-model="isPostShow" position="bottom">
      <!-- v-if渲染销毁  显示弹出层渲染评论回复组件加载数据 -->
      <commentPost @postSuccess="onPostSuccess" :target="comment.com_id"></commentPost>
    </van-popup>
  </div>
</template>

<script>
// 评论内容模块
import commentItem from './comment-item'
// 回复/评论列表数据
import commentList from './comment-list'
// 发布评论组件
import commentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    commentItem,
    commentList,
    commentPost
  },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []// 评论的回复列表
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log(this.comment)
  },
  mounted () {},
  methods: {
    onPostSuccess (data) {
      // 更新回复的数量
      this.comment.reply_count++
      //   关闭弹出层
      this.isPostShow = false
      // 将最新回复展示到列表的顶部
      this.commentList.unshift(data.data.data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
// 滚动条
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.reply-bottom {
  // 固定定位居中
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
