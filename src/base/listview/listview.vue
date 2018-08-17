<template>
  <scroll class="listview" :data="data" ref="listview" :listenScroll = "listenScroll" @scroll = "scroll" :probeType="probeType">
    <ul>
      <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
        <p class="list-group-title" ref="listgrouptitle">{{group.title}}</p>
        <ul>
          <li @click="selectItem(item)" v-for="(item, index) in group.items" :key="index" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchstart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul ref="itemList">
        <li v-for="(item, index) in shortcutList" :key="index" class="item" :class="{'current': currentIndex === index }" :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <p class="fixed-title">{{fixedTitle}}</p>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
import Loading from 'base/loading/loading'
export default {
  created() {
    this.touch = {}
    this.ANCHOR_WEIDHT = 0
    this.TITLE_HEIGHT = 0
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substring(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    onShortcutTouchstart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / this.ANCHOR_WEIDHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    refresh () {
      this.$refs.listview.refresh()
    },
    _scrollTo(index) {
      if (index !== 0 && !index) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _caculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let ele = list[i]
        height += ele.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._caculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < this.TITLE_HEIGHT) ? newVal - this.TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.ANCHOR_WEIDHT = parseInt(parseInt(this.$refs.itemList.clientHeight) / this.data.length) - 0.5
        this.TITLE_HEIGHT = this.$refs.listgrouptitle[0].clientHeight
      }, 1000)
    })
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang = 'stylus' rel="stylesheet/stylus">
@import "~common/stylus/variable"
.listview{
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
}
ul{
  padding: 0;
  margin: 0;
}
li{
  list-style: none;
  margin:0;
  padding:0;
}
p{
  padding:0
  margin:0
  height: 8vw
  line-height:8vw
  font-size:4vw
}
.list-group{
  padding-bottom:30px;
}
.list-group-title {
  height:8vw;
  line-height: 8vw;
  padding-left: 20px;
  font-size: $font-size-small;
  color: $color-text-l;
  background: $color-highlight-background;

}
.list-group-item{
  display: flex;
  align-items: center;
  padding: 20px 0 0 30px
}
.avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.name{
  margin-left: 20px;
  color:$color-text-l;
  font-size:$font-size-medium
}
.list-shortcut{
  position: absolute;
  z-index: 30;
  right:0;
  top: 50%;
  transform: translateY(-50%);
  width: 6vw;
  padding:20px 0;
  border-radius:10vw;
  text-align:center;
  background: $color-background-d
  font-family: Helvetica
}
.item{
  padding:2px;
  line-height:1;
  color: $color-text-l
  font-size: $font-size-small-s;
}
.current{
  color: $color-theme;
}
.list-fixed{
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  margin:0
  padding:0
}
.fixed-title{
  height:8vw;
  line-height:8vw;
  padding-left:20px;
  font-size:$font-size-small;
  color:$color-text-l;
  background: $color-highlight-background;
}
.loading-container{
  position: absolute
  width:100%;
  top:50%;
  transform translateY(-50%)
}
</style>
