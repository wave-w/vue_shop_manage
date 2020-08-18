import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/login.vue'
  const routes = [
    {
      path:'/',
      component:Login
    },
    {
      path:'/login',
      component:Login
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
