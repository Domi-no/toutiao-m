import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/icon.less'
import Vant from 'vant' // Vant组件
import 'vant/lib/index.css' // Vant样式

// 注册使用Vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
