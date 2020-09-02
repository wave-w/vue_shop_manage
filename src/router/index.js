import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/login.vue')
// import Login from '../views/login.vue'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/home/home.vue')
// import Home from '../views/home/home.vue'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/home/welcome.vue')
// import Welcome from '../views/home/welcome.vue'
const user = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../views/users/user.vue')
// import user from '../views/users/user.vue'
const roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../views/power/roles.vue')
// import roles from '../views/power/roles.vue'
const rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../views/power/rights.vue')
// import rights from '../views/power/rights.vue'
const goods = () => import(/* webpackChunkName: "GoodsList_Add" */ '../views/goods/goods.vue')
// import goods from '../views/goods/goods.vue'
const categories = () => import(/* webpackChunkName: "Cate_Params" */ '../views/goods/categories.vue')
// import categories from '../views/goods/categories.vue'
const params = () => import(/* webpackChunkName: "Cate_Params" */ '../views/goods/params.vue')
// import params from '../views/goods/params.vue'
const addpage = () => import(/* webpackChunkName: "GoodsList_Add" */ '../views/goods/goodChildren/addpage.vue')
// import addpage from '../views/goods/goodChildren/addpage.vue'
const orders = () => import(/* webpackChunkName: "Order_Report" */ '../views/orders/orders.vue')
// import orders from '../views/orders/orders.vue'
const reports = () => import(/* webpackChunkName: "Order_Report" */ '../views/reports/reports.vue')
// import reports from '../views/reports/reports.vue'
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
    component:Home,
    children :[
      {path:'/',component:Welcome},
      {path:'/users',component:user},
      {path:'/roles',component:roles},
      {path:'/rights',component:rights},
      {path:'/goods',component:goods},
      {path:'/categories',component:categories},
      {path:'/params',component:params},
      {path:'/orders',component:orders},
      {path:'/reports',component:reports},
      {path:'/goods/addpage',component:addpage}
    ]
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
