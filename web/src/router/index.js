import { createRouter, createWebHashHistory } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '../views/Home.vue'
import NewsCenter from '../views/NewsCenter.vue'
import News from '../views/News.vue'
import Product from '../views/Product.vue'

const routes = [
  {
    name:'home',
    path:'/',
    component:Home
  },
  {
    name:'news-center',
    path:'/news-center',
    component:NewsCenter
  },
  {
    name:'news',
    path:'/news/:newsid',
    component:News
  },
  {
    name:'product',
    path:'/product',
    component:Product
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  NProgress.start()
  next()
})

router.afterEach((to,from)=>{
  NProgress.done() 
})


export default router
