import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/icon.less' // 字体图标
import Vant from 'vant' // Vant组件
import 'vant/lib/index.css' // Vant样式
import './style/index.less' // 公共样式
// 动态设置rem基准值 动态的根据屏幕大小设置fontSize
import 'amfe-flexible'
// 格式化时间组件
import '@/utils/dayjs'
// 注册使用Vant组件
Vue.use(Vant)
// 声明了一个全局的eventBus
Vue.prototype.$bus = new Vue()
// 2.发布 @clicl="$bus.$emit('reply',item)"
// 3.订阅 this.$bus.$on('reply',function(obj){console.log(obj)})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
