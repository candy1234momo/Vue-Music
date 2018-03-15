<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="recommends.length" ref="sliderWrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
         <loading></loading>
      </div>
    </scroll>

  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend,getRecommends,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default{
	data(){
		return{
			recommends:[],
			discList:[]
		}
	},
	created(){
		//this._getRecommend()
    this._getRecommends()
		this._getDiscList()
	},
	components:{
		Slider,
		Scroll,
		Loading
	},
	methods:{
		_getRecommend(){
			getRecommend().then((res)=>{
				if(res.code === ERR_OK){
					this.recommends=res.data.slider
				}
			})
		},
    _getRecommends(){
      getRecommends().then((res)=>{
        if(res.code === ERR_OK){
          this.recommends=res.data.slider
        }
      })
    },
		_getDiscList() {
	        getDiscList().then((res) => {
	          if (res.code === ERR_OK) {
	            this.discList = res.data.list
	          }
	        })
	    },
	    loadImage(){
	    	if(!this.checkLoaded){
          /**

          ④子组件索引 简单来说：就是可以直接从索引获取到子组件，然后就可以调用各个子组件的方法了。
          添加索引方法是：在标签里添加v-ref:索引名

          调用组件方法是：vm.$ref.索引名

          也可以直接在父组件中使用this.$ref.索引名

          这个时候，就可以获得组件了，然后通过组件可以调用他的方法，或者是使用其数据。*/
	    		this.$refs.scroll.refresh()
	    		this.checkLoaded = true
	    	}
	    	
	    }
	}
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>