import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Particles from 'vue3-particles'

import '@/util/axios.config' //!引入axios工具包

createApp(App)
.use(store)
.use(ElementPlus)
.use(router)
.use(Particles)
.mount('#app')
