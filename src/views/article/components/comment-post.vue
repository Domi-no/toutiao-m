<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onAddComment"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Object, Number, String],
      default: null
    }
  },
  data () {
    return {
      message: '', // 输入框内容
      isDis: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onAddComment () {
      try {
        console.log(this.target, '------' + this.articleId)
        const res = await addComment({
          target: this.target.toString(),
          content: this.message,
          //   不能给null toString
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })
        console.log(res)
        this.$emit('postSuccess', res)
      } catch (error) {

      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
