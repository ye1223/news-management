import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus,{Table} from 'element-plus'
import 'element-plus/dist/index.css'

import Particles from 'vue3-particles'

import '@/util/axios.config' //!引入axios工具包

/* // 解决 ElTable 自动宽度高度导致的「ResizeObserver loop limit exceeded」问题
const fixElTableErr = table => {
    const oldResizeListener = table.methods.resizeListener
    table.methods.resizeListener = function () {
      window.requestAnimationFrame(oldResizeListener.bind(this))
    }
  }
  
  // 一定要在Vue.use之前执行此函数
  fixElTableErr(Table) */


createApp(App)
.use(store)
.use(ElementPlus)
.use(router)
.use(Particles)
.mount('#app')
