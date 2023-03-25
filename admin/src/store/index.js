import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    
    isGetAllRouters:false,//路由是否全部加载进页面
    isCollapsed:false ,//Side页是否收回
    userInfo:{},

  }, 
  getters: {
  },
  mutations: {
    changeGetAllRouters(state,value){
      state.isGetAllRouters = value
    },
    //控制侧边栏收缩/展开
    changeCollapse(state){
      state.isCollapsed = !state.isCollapsed
    },
    changeUserInfo(state,value){
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state){
      // delete state.userInfo
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ['isCollapsed','userInfo'] //控制持久化元素
  })]
})
