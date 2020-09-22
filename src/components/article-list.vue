<template>
  <div>
    <van-pull-refresh success-duration="1000" :success-text="refreshSuccessText" v-model="refreshing" @refresh="onRefresh">
      <van-list
      class="artcile-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell /> -->
        <article-item v-for="(item,index) in list" :title="item.aut_name"  :key="index" :article="item">
        </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/articleItem/index.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 获取的数据列表
      loading: false, // 加载数据状态
      finished: false, // 数据加载完成没有其它数据的状态
      timestamp: null, // 时间戳
      error: false, // 是否加载失败
      refreshing: false, // 控制下拉刷新加载
      refreshSuccessText: '刷新成功'// 下拉刷新成功提示文本
    }
  },
  created () {},
  methods: {
    // onLoad () {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 本次数据加载结束之后加载状态结束
    //     // loading关闭以后才能触发下一次的加载更多
    //     this.loading = false

    //     // 判断数据是否全部加载完成
    //     if (this.list.length >= 40) {
    //       // 如果没有数据了把finised设置为true 之后不会再触发onload
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          timestamp: this.timestamp || Date.now(),
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1
        })
        // 制造错误 模拟数据加载错误
        // if (Math.random() >= 0.5) {
        //   JSON.parse('asdafsas')
        // }
        // 获取文章数据
        const { results } = data.data
        // 2. 把数据添加到 list 数组中
        // 数组扩展运算符 推送之后会更改数据本身
        this.list.push(...results)
        this.loading = false // 关闭loading效果
        // 4. 判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        // 是否加载失败，加载失败后点击错误提示可以重新触发load事件，必须使用sync修饰符
        this.error = true
        this.$toast('获取数据失败')
      }
    },
    // 下拉刷新数据
    async onRefresh () {
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          timestamp: Date.now(), // 下拉获取最新数据
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1
        })
        // 2. 将数据追加到列表的顶部
        this.list.unshift(...data.data.results)
        // 3. 关闭下拉刷新的 loading 状态
        this.refreshing = false
        // 提示成功
        this.refreshSuccessText = `刷新成功，更新了${data.data.results.length}条数据`
      } catch (error) {
        this.$toast('获取数据失败')
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.artcile-list {
  height: 79vh;
  overflow: hidden;
  overflow-y: auto;
}
</style>
