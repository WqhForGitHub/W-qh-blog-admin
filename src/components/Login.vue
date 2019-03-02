<template>
  <div class="beijing">
     <a-card class="Login">
       <div class="Avatar">
         <img src="/static/admin.png" />
       </div>
      <a-input class="userinput" placeholder="username" v-model="username">
        <a-icon class="user" slot="prefix" type="user"/>
      </a-input>
      <a-input class="passwordinput" placeholder=" password" v-model="passwordname">
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
        console.log(res)
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
.beijing {
  width:100vw;
  height:100vh;
  background-color: #f0f0f0;
  .Login {
    width: 400px;
    height:350px;
    left:50%;
    top:50%;
    margin-left:-200px;
    margin-top:-175px;
    position:absolute;
    .Avatar {
      width:80px;
      height:80px;
      margin: 0 auto;
      img {
        width:100%;
        height:100%;
      }
    }
    .userinput {
      width:76%;
      height:20px;
      margin-top:10%;
      margin-left:12%;
      .user {
        font-size:20px;
        margin-top:10px;
        margin-left:-5px;
      }
    }
    .passwordinput {
      width:76%;
      height:20px;
      margin-top:10%;
      margin-left:12%;
      .password {
        font-size:20px;
        margin-top:10px;
        margin-left:-5px;
      }
    }
    .buttom {
      width:60%;
      margin-left:70px;
      margin-top:25px;
    }
  }
}
</style>
