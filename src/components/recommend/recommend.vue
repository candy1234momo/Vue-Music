<template>
  <div class="recommend" ref="recommend">
    <div ref="scroll" class="recommend-content">
      <div>
        <div class="slider-wrapper" v-if="recommends.length" ref="sliderWrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item">
              <div class="icon">
                <img width="60" height="60" >
              </div>
              <div class="text">
                <h2 class="name"></h2>
                <p class="desc"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container">
        
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'

export default{
	data(){
		return{
			recommends:[],
			discList:[]
		}
	},
	created(){
		this._getRecommend()
		this._getDiscList()
	},
	components:{
		Slider
	},
	methods:{
		_getRecommend(){
			getRecommend().then((res)=>{
				if(res.code === ERR_OK){
					this.recommends=res.data.slider
				}
			})
		},
		_getDiscList() {
	        getDiscList().then((res) => {
	          if (res.code === ERR_OK) {
	            this.discList = res.data.list
	            console.log(res.data.list);
	          }
	        })
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