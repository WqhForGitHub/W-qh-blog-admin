# 博客后台管理

博客前台的项目地址: [https://github.com/WqhForGitHub/W-qh-blog](https://github.com/WqhForGitHub/W-qh-blog)

## 前言

博客后台管理是基于 Vue + Antd 实现的，Antd 确实是非常适合中后台应用的开发，有非常多的组件可以使用，非常多的组件可以使用。

### 技术栈

* Vue
* ant-design-vue:  基于 Vue 的 UI 库
* fly:  异步请求库
* vue-router:  前端路由
* vuex:  管理应用数据
* async/await: 处理异步请求接口

### 实现的功能

- [x] 博客的增删改查
- [x] 分类、标签的增删
- [x] 写博客

### TODO

- [ ] markdown在线编辑器

### 预览

**登录界面**

![登录](https://w-qh-1257950569.cos.ap-guangzhou.myqcloud.com/Blog-admin/Login.png)

**首页**

![首页](https://w-qh-1257950569.cos.ap-guangzhou.myqcloud.com/Blog-admin/blogList.png)

**修改博客**

![修改博客](https://w-qh-1257950569.cos.ap-guangzhou.myqcloud.com/Blog-admin/modify.png)

**发布博客**

![发布博客](https://w-qh-1257950569.cos.ap-guangzhou.myqcloud.com/Blog-admin/writeblog.png)

**标签管理**

![标签管理](https://w-qh-1257950569.cos.ap-guangzhou.myqcloud.com/Blog-admin/tag.png)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
