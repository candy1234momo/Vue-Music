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
    {
      path:'/',
      redirect:'/rank'
    },



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

>第三张 轮播图实现

#jsonp使用方法

什么是jsonp？ 

就是利用<script>标签没有跨域限制的“漏洞”（历史遗迹啊）来达到与第三方通讯的目的。当需要通讯时，本站脚本创建一个<script>元素，地址指向第三方的API网址，形如：     <script src="http://www.example.net/api?param1=1&param2=2"></script>     并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。     第三方产生的响应为json数据的包装（故称之为jsonp，即json padding），形如：     callback({"name":"hax","gender":"Male"})     这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据。    补充：“历史遗迹”的意思就是，如果在今天重新设计的话，也许就不会允许这样简单的跨域了嘿，比如可能像XHR一样按照CORS规范要求服务器发送特定的http头。

可以直接理解为服务端输出JS代码：
客户端POST或GET请求都没关系重点在服务端输出的结果。
首先响应结果中Content-Type=text/javascript
然后前端代码直接以<script src="这里就是服务端Http的URL地址"/> 

jsonp就是一段js代码，使用script标签来引用的，因为这个名字，本来不是个问题也成了个问题  

1.安装jsonp

```
npm install jsonp --save
```

2.jsonp+promise封装

src/common/js/jsonp.js

```
import originJSONP from 'jsonp'

export dafault function jsonp(url,data,option){
	url+=(url.indexOf('?')<0?'?':'&')+param(data)
	
   return new Promise((resolve,reject)=>{
   	originJSONP(url,option,(err,data)=>{
   		if(!err){
   			resolve(data)
   		}else{
   			reject(err)
   		}
   	})
   })
}

function param(data){
	let url=''
	for(var k in data){
		let value = data[k]!==undefined?data[k]:''
		url+=`&${k}=${encodeURIComponent(value)}`
	}
	return url?url.substring(1):''
}
```
3.jsonp的使用-访问recommend界面数据

src/api/recommend.js

```
import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'

export function getRecommend(){
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

	const data = Object.assign({},commonParams,{
		platform:'h5',
		uin:0,
		needNewCode:1
	})

	return jsonp(url,data,options)
}
```
src/componenents/recommend/recommend.vue

```
<script type="text/ecmascript-6">
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default{
	created(){
		this._getRecommend()
	},
	methods:{
		_getRecommend(){
			getRecommend().then((res)=>{
				if(res.code === ERR_OK){
					console.log(res.data.slider)
				}
			})
		}
	}
}

</script>
```
由此就可以回去到数据





















作者：贺师俊
链接：https://www.zhihu.com/question/19966531/answer/13502030
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
