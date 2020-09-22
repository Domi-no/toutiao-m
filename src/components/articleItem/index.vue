<template>
  <div>
    <!-- :to="'/article/'+article.art_id" -->
    <!-- to属性和VueRouter中的RouterLink组件的to属性用法是一样的 -->
    <van-cell class="article-item" :to="{
      //根据路由名称进行跳转
      name:'article',
      //传递路由动态参数
      params:{
        //属性名：路由路径中设计的动态参数名称
        articleId:article.art_id
      }
    }">
      <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <div slot="label">
        <div v-if="article.cover.images.length===3" class="cover-warp">
          <div v-for="(img,index) in article.cover.images" :key="index" class="cover-item">
            <van-image slot="default" :src="img" fit="cover" class="cover-item-img" />
          </div>
        </div>
        <div class="label-info-wrap">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate|relativeTimevalue}}</span>
        </div>
      </div>
      <van-image
        v-if="article.cover.images.length===1"
        fit="cover"
        slot="default"
        :src="article.cover.images[0]"
        class="right-cover"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: { article: { type: Object, required: true } },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
// .cover-item {
//   display: inline-block;
// }
// 标题
.title {
  font-size: 32px;
  color: #3a3a3a;
}
// 包裹右边图片的容器
.van-cell__value {
  flex: unset;
  width: 232px;
  height: 146px;
}
// 右边单张图片
.right-cover {
  width: 232px;
  height: 146px;
}
// 三张图片的情况下设置样式
// 包裹图片容器
.label-info-wrap span {
  font-size: 10px;
  color: #b4b4b4;
  margin-right: 25px;
}
// flex布局 变成一行 给上下设置30内边距
.cover-item {
  display: inline-block;
  padding: 30px 0;
  // 给包裹图片的三个盒子设置flex布局
  .cover-wrap {
    height: 146px;
    // 不包含最后一个子元素
    &:not(:last-child) {
      padding-right: 10px;
    }
    // 给图片设置宽度和高度
  }
  .cover-item-img {
    width: 146px;
    height: 146px;
  }
}
</style>
