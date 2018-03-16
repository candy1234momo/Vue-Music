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

说道这里，估计大家应该都会想到之前访问轮播组建数据是我们安装啦jsonp并对其进行promise封装。现在我们使用axios完全可以解决跨域问题，而且非常简单不需要之前那么复杂，下面就来给大家展示下吧

build/webpack.dev.conf.js
```
app.get('/api/getRecommend', function (req, res) {
        const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
        axios.get(url, {
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
```


src/api/recommend.js
```
//1.1.访问轮播图数据jsonp+promise封装
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
//1.2.访问轮播图数据axios直接访问
export function getRecommends() {
  const url = '/api/getRecommend'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
```

src/componentd/remmend/recommend.vue
执行该方法即可
```
_getRecommends(){
  getRecommends().then((res)=>{
    if(res.code === ERR_OK){
      this.recommends=res.data.slider
    }
  })
}
```





#扩展知识$ref
④子组件索引

简单来说：就是可以直接从索引获取到子组件，然后就可以调用各个子组件的方法了。

 

添加索引方法是：在标签里添加v-ref:索引名

调用组件方法是：vm.$ref.索引名

也可以直接在父组件中使用this.$ref.索引名

这个时候，就可以获得组件了，然后通过组件可以调用他的方法，或者是使用其数据。
```
<div id="app">  
    父组件：  
    <button @click="todo">触发子组件的事件</button>  
    <br/>  
    子组件1：  
    <!--绑定写在这里，可以多个绑定同一个，或者不同绑定不同的，但不能一个绑定多个-->  
    <children v-ref:child></children>  
</div>  
<script>  
    var vm = new Vue({  
        el: '#app',  
        methods: {  
            todo: function () {  
                this.$refs.child.fromParent();  //通过索引调用子组件的fromParent方法  
            }  
        },  
        components: {  
            children: {    //这个无返回值，不会继续派发  
                props: ['test'],  
                template: "<button>children1</button>",  
                methods: {  
                    fromParent: function () {  
                        console.log("happened fromParent by ref");  
                    }  
                }  
            }  
        }  
    });  
</script>  
```

```
// 为了得到有序列表，我们需要处理 map
  let ret = []
  let hot = []
  for (let key in map) {
    let val = map[key]
    if (val.title.match(/[a-zA-Z]/)) {
      ret.push(val)
    } else if (val.title === HOT_NAME) {
      hot.push(val)
    }
  }
  ret.sort((a, b) => {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  })
  return hot.concat(ret)

sort那个function的作用就是比较两个数的大小用的,然后返回结果的正负作为排序的依据.
这个函数是升序排序,如果想逆序排序改成return b-a;就行了.
它的排序原理是每2个数比较,然后根据正负更改数组内元素的位置.
比如第一次比较,a就是888,b就是2222然后返回888-2222 是负的 位置不变.
你可以在函数里面alert一下a和b的值看看.


charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
方法 charCodeAt() 与 charAt() 方法执行的操作相似，只不过前者返回的是位于指定位置的字符的编码，而后者返回的是字符子串。

match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。

```


```
$(':checkbox').map(function() {
  return this.id;
}).get().join(',');

map() 把每个元素通过函数传递到当前匹配集合中，生成包含返回值的新的 jQuery 对象。


$(selector).get(index)
get() 方法获得由选择器指定的 DOM 元素。


var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"

document.write(arr.join()) //George,John,Thomas
document.write(arr.join(".")) //George.John.Thomas
join() 方法用于把数组中的所有元素放入一个字符串。
元素是通过指定的分隔符进行分隔的。

```

```
target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。


<p id="p1"></p>

console.log(event.target.id); //p1
console.log(event.target.getAttribute(id)); //p1  当id是一个变量值时


export function getData(el , name , val){
     const prefix = 'data-'
     name = prefix + name
     if(val){
      return el.setAttribute(name,val)
     }else{
      return el.getAttribute(name)
     }
}
```
















作者：贺师俊
链接：https://www.zhihu.com/question/19966531/answer/13502030
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
