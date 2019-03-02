import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    bloglist:[],    // 所有博客
    taglist:[],     // 所有标签
    classifylist:[] // 所有分类
  },
  mutations:{
    changebloglist(state,params) {
      state.bloglist = params.blogList
    },
    changetaglist(state, params) {
      state.taglist = params.tagList
    },
    changeclassifylist(state,params) {
      state.classifylist = params.tagList
    }
  }
});

new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
