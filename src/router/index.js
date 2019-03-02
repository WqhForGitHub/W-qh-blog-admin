import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import main from '../main/main'
import blogList from '../blogList/blogList'
import blogging from '../blogging/blogging'
import tag from '../tag/tag'
import classify from '../classify/classify'
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
