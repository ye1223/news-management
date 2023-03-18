import { createStore } from 'vuex'

export default createStore({
  state: {
    
    isGetAllRouters:false,//路由是否全部加载进页面

  }, 
  getters: {
  },
  mutations: {
    changeGetAllRouters(state,value){
      state.isGetAllRouters = value
    }
  },
  actions: {
  },
  modules: {
  }
})
