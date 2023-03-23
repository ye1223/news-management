import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/Login' //@指向src绝对路径
import MainBox from '../views/MainBox' //@指向src绝对路径
import routesConfig from './config'

import store from '../store/index'

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'mainbox',
    path: '/mainbox',
    component: MainBox
    //MainBox的嵌套路由，后面根据权限动态添加（比如，just Editor没有人员管理权限）
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//动态添加route
/* router.addRoute('mainbox',{
  path:'/index',
  component:Home
}) */

/* routesConfig.forEach(item=>{
  //!权限判断 
  router.addRoute('mainbox',item)
}) */
const checkPermission = (item) =>{
  // console.log(item)
  if(item.requireAdminAuth){
    return store.state.userInfo.role===1
  }
  return true
}

const ConfigRouter = () => {

  if(!router.hasRoute('mainbox')){
    router.addRoute({
      name: 'mainbox',
      path: '/mainbox',
      component: MainBox
    })
  }

  routesConfig.forEach(item => {
    //!权限判断 
    checkPermission(item)&& router.addRoute('mainbox', item)
    //已经加载完组件(改变为true)  

  })

  store.commit('changeGetAllRouters', true)
}

//路由拦截
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {

    //如果未授权--->重定向login
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
      //已经授权（已经登陆）-->next()放行
    } else {
      //第一次路由未没加载进来，需要next(指定路径)
      if (!store.state.isGetAllRouters) {

        //删除所有嵌套路由
        //!删除mainbox
        router.removeRoute('mainbox')

        ConfigRouter()
        next({
          path: to.fullPath
        })
        //其他时候，路由已经加载进页面，可以直接放行
      } else {
        next()
      }

    }

  }
})



export default router
