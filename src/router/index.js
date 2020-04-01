import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Priloj',
    component: () => import('../views/Priloj.vue')
  },
  // {
  //   path: '/Priloj',
  //   name: 'Priloj',
  //   component: () => import('../views/Priloj.vue')
  // },
  // {
  //   path: '/Level1',
  //   name: 'Level1',
  //   component: () => import('../views/Level1.vue')
  // },
  // {
  //   path: '/Level2',
  //   name: 'Level2',
  //   component: () => import('../views/Level2.vue')
  // },
  // {
  //   path: '/gamel',
  //   name: 'gamel',
  //   component: () => import('../views/gamel.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
