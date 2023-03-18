import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Particles from "vue3-particles";

createApp(App)
.use(store)
.use(router)
.use(ElementPlus)
.use(Particles)
.mount('#app')
