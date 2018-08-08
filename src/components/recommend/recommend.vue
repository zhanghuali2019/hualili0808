<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="(item,index) in recommends" :key="index" class="slider-item">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  data() {
    return {
      recommends: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.list)
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend{
    position: fixed;
    width: 100%;
    top:24vw;
    bottom: 0
  }
  .recommend-content{
    height: auto
    overflow : hidden
  }
  .slider-wrapper{
    position: relative;
    width: 100%;
    overflow: hidden
  }
  .list-title{
    height:5vh;
    line-height:5vh;
    text-align:center;
    font-size: $font-size-medium;
    color: $color-theme;
  }
  .item{
    display: flex;
    box-sizing border-box;
    align-items: center;
    padding:0 20px 20px 20px;
  .icon{
    flex: 0 0 60px;
    width: 60px;
    padding-right:20px;
  }
    .text{
      display: flex;
      flex-direction :column;
      justify-content :centre;
      flex: 1;
      line-height: 20px;
      overflow : hidden
      font-size: $font-size-medium
    }
    .name{
      margin-bottom: 10px;
      color: $color-text;
    }
    .desc{
      color: $color-text-d;
    }
    .loading-container{
      position:absolute;
      width: 100%;
      top: 50%;
      transform :translateY(-50%);
    }
  }
</style>
