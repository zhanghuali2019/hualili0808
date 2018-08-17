<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div >
        <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="(item,index) in recommends" :key="index" class="slider-item">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" @load="loadImage" class="needsclick">
            </a>
          </div>
        </slider>
      </div>
        <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li @click="selectItem(item)" v-for="(item, index) in discList" :key="index" class="item">
            <div class="icon">
              <img v-lazy="item.imgurl" width="60vw"  height="60vw">
            </div>
            <div class="text">
              <p class="name" v-html="item.creator.name"></p>
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
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
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
          this.discList = res.data.list
          console.log(res.data)
        }
      })
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend{
    position: fixed;
    width: 100%;
    top:24.5vw;
    bottom: 0
  }
  .recommend-content{
    height: 100%
    overflow : hidden
  }
  .slider-wrapper{
    position: relative;
    width: 100%;
    overflow:hidden;
  }
  .sider-content{
    position:align-content ;
    top:0;
    left:0;
    width:100%;
    height:100%
  }
  .list-title{
    height:5vh;
    line-height:5vh;
    text-align:center;
    font-size: $font-size-medium;
    color: $color-theme;
  }
  ul{
    padding-left:2vw
  }
  .item {
    display: flex;
    box-sizing border-box;
    align-items: center;
    padding: 0 0 10px 10px;
    .icon {
      flex: 0 0 16vw;
      width: 60vw;
      hieght: 60vw;
      padding-right: 6vw;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: centre;
      flex: 1;
      line-height: 20px;
      overflow: hidden
      font-size: $font-size-medium
    }
    .name {
      color: $color-text;
      margin-bottom: 0
      font-size: $font-size-medium;
    }
    .desc {
      color: $color-text-d;
      font-size: $font-size-small;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
}
</style>
