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

#vue-music中使用stylus

##安装stylus、stylus-loader插件

npm install stylus stylus-loader --save

##配置别名common

resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'common': resolve('src/common')
    }
}

##复制src文件执行 npm run dev


# build for production and view the bundle analyzer report
npm run build --report

# run unit vue-music
npm run unit

# run e2e vue-music
npm run e2e

# run all vue-music
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
