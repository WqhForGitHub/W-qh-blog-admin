import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login'
import main from '../view/main'
import blogList from '../view/blogList'
import blogging from '../view/blogging'
import tag from '../view/tag'
import classify from '../view/classify'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path:'/main',
      component:main
    },
    {
      path:'/bloglist',
      component:blogList
    },
    {
      path:'/blogging',
      component:blogging
    },
    {
      path:'/tag',
      component:tag
    },
    {
      path:'/classify',
      component:classify
    }
  ]
})
