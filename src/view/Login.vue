<template>
  <div class="beijing">
    <a-card class="Login">
      <div class="Avatar">
        <img src="/static/admin.png" />
      </div>
    <a-input type="text" class="userinput" placeholder="username" v-model="username">
      <a-icon class="user" slot="prefix" type="user"/>
    </a-input>
    <a-input type="password" class="passwordinput" placeholder=" password" v-model="passwordname">
      <a-icon class="password" slot="prefix" type="lock" />
    </a-input>
    <a-button type="primary" block class="buttom" @click="Login()">登录</a-button>
    </a-card>
  </div>
</template>

<script>
import { Login, gettoken } from '../api/index.js'
import { statusCode } from '../api/api.cfg.js'
import axios from 'axios'

require('../viewstyle/Login.scss')
export default {
  data () {
    return {
      username:'',
      passwordname: '',
      adminList:[]
    }
  },
  methods: {
    async Login() {
      const res = await Login({
        methods:'Login',
        username:this.username,
        passwordname:this.passwordname
      })
      if (res.status == statusCode.OK) {
        console.log(res)
      }
      this.getToken();
    },
    async getToken() {
      const res = await gettoken();
      if (res.status == statusCode.OK) {
        console.log(res.data)
        this.$store.commit({
          type:'getToken',
          token:res.data
        })
        // 有返回Token证明有登录成功
        if(res.data !== '') {
          this.$router.push('/main')
        } else{
           this.$notification['error']({
            message: '错误',
            description: '用户名或者密码错误，请重新输入',
          });
        }
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
