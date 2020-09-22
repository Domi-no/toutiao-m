import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // @ src绝对路径
  // { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('@/views/login/index.vue') },
  {
    path: '/',
    // name: 'layout', // 如果父路由有默认子路由 那么name没有意义
    component: () => import('@/views/layout/index.vue'),
    children: [{
      path: '', // 默认子路由
      name: 'home',
      component: () => import('@/views/home')
    }, {
      path: 'qa',
      name: 'qa',
      component: () => import('@/views/qa')
    }, {
      path: 'video',
      name: 'video',
      component: () => import('@/views/video')
    },
    {
      path: 'my',
      name: 'my',
      component: () => import('@/views/my')
    }]
  }, { path: '/search', name: 'search', component: () => import('@/search') },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // props开启路由传参
    props: true
  }, {
    path: '/user/profile',
    component: () => import('@/views/user-profile/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
