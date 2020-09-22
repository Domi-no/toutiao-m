import Vue from 'vue'
import Vuex from 'vuex' // 使用$store的条件就是导入vuex
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN = 'TOUTIAO_USER'
export default new Vuex.Store({
  // state状态  在这里定义数据用来监控
  state: {
    // 一个对象 存储当前登陆用户信息
    // 获取本地数据
    user: getItem(TOKEN)
  },
  // mutations转变/改变 用于变更state中的数据
  // 只有mutation才有权修改state里面的数据
  mutations: {
    setUser (state, data) {
      console.log(state.user)
      state.user = data
      // 保存本地数据
      setItem(TOKEN, state.user)
    }
  },
  // 在actions中不能直接修改state中的数据
  // 必须通过context.commit 触发某个mutations才行
  actions: {
  },
  modules: {
  },
  // 包装
  getters: {

  }
})
