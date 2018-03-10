# vue-music

> vue-music

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

# run unit vue-music
npm run unit

# run e2e vue-music
npm run e2e

# run all vue-music
npm test
```

> 第一章节 vue-music中使用stylus
```
## 运行安装stylus、stylus-loader插件

npm install stylus stylus-loader --save -dev

## 配置别名common

resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'common': resolve('src/common')
    }
}


## 复制src文件执行 npm run dev
````

> 第二章节 组件引入及路由的使用
```
## 运行babel-runtime fastclick插件

备注： babel-runtime:ES6的转译

fastclick:减轻移动端3s延时问题

npm install babel-runtime fastclick --save

## 开发babel-polyfill插件

babel-polyfill:api ES6 promise转译

npm install babel-polyfill --save -dev

## /components中放入使用的页面

## 页面组件使用 Tab Mheader

<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'

  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>



## vue-router使用

1.导入四个组件 rank singer search remmend


##router/index.js


import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/rank'
import Singer from '@/components/singer/singer'
import Search from '@/components/search/search'
import Recommend from '@/components/recommend/recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },{
      path: '/singer',
      name: 'Singer',
      component: Singer
    },{
      path: '/search',
      name: 'Search',
      component: Search
    },{
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    }
  ]
})

2./src/main.js中引入router/index.js文件
import router from './router'

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

import 'common/stylus/index.styl'
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

3./src/app.vue中显示router界面

<router-vue></router-vue>



知识点：

1.Tab界面VUE，关于导航列表样式切换（VUE Router：router-link-active）

当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active，所以你只需要在自己的STYLE文件中，写了.router-link-active的样式，列表选中后，系统就会自动去绑定这个样式。

2.默认根目录显示选中

router/index.js
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/rank'
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },{
      path: '/singer',
      name: 'Singer',
      component: Singer
    },{
      path: '/search',
      name: 'Search',
      component: Search
    },{
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    }
  ]
})



```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
