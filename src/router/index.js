import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Game.vue')
  },
  {
    path: '/Level1',
    name: 'Level1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Level1.vue')
  },
  {
    path: '/Level2',
    name: 'Level2',
    component: () => import('../views/Level2.vue')
  },
  {
    path: '/gamel',
    name: 'gamel',
    component: () => import('../views/gamel.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
