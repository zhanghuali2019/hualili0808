<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(it, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 2000)
    window.addEventListener('resize', () => {
      if (!this.silder) {
        return
      }
      this._setSliderWidth(true)
      this.silder.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex = pageIndex - 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex = pageIndex + 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slider {
    position: relative
    height: 26vh
    min-height:1px;
    overflow: hidden
  }
  .slider-group{
    overflow :hidden;
    white-space: nowrap;
    height:100%;
  }
  .slider-item{
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    height:100%;
  }
  a{
     display:block;
     width:100%;
     height:100%;
     overflow:hidden;
     text-decoration: none
  }
  img{
      display: block;
      width:100%;
      height:100%;
    }
  .dots{
    position:relative;
    right:0;
    left:0;
    bottom:5vh;
    text-align:center;
    font-size:0;
    }
  .dot{
    display: inline-block;
    width:2vw;
    height:2vw;
    border-radius 50%;
    background: rgba(255,255,255,0.5);
    margin:  0 1vw;
  }
  .dot.active{
    width:6vw;
    border-radius: 1vw;
    background: $color-theme
  }
</style>
