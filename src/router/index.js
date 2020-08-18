import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../views/login.vue'
import Home from '../views/home/home.vue'
  const routes = [
    {
      path:'/',
      component:Login
    },
    {
      path:'/login',
      component:Login
    },
  {
    path:'/home',
    component:Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
//to将要访问的路径
//from代表从哪个路径跳转而来
//next代表一个函数，表示放行
//    next() 放行   next('/login') 强制跳转
if(to.path==='/login') {
     return  next()
}
//获取token
const token = window.sessionStorage.getItem('token')
if(!token){
  return next('./login')
}else  next()
  
})
export default router
