import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/VantopUpload',
    name: 'layout',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/VantopUpload',
    component: () => import('@/views/VantopUpload/index.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
