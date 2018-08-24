<template>
<scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest" :beforeScroll="beforeScroll" @beforeScroll="listScroll">
  <ul class="suggest-list">
    <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result" :key="index">
      <div class="icon">
        <i :class="getIconCls(item)"></i>
      </div>
      <div class="name">
        <p class="text" v-html="getDisplayName(item)"></p>
      </div>
    </li>
    <loading v-show="hasMore" title=""></loading>
  </ul>
  <div class="no-result-wrapper" v-show="!result.length && !hasMore">
    <span>没有搜索结果</span>
  </div>
</scroll>
</template>

<script type="text/ecmascript-6">
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {mapMutations, mapActions} from 'vuex'
const TYPE_SINGER = 'singer'
const perpage = 20
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  methods: {
    search() {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
        }
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data))
          this._checkMore(res.data)
        }
      })
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.zhida_singer.singerName
      } else {
        return `${item.name}-${(item.singer)}`
      }
    },
    selectItem(item) {
      console.log(this.result)
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.zhida_singer.singerID,
          name: item.zhida_singer.singerName,
          avatar: item.zhida_singer.singerPic
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select', item)
    },
    refresh() {
      this.$refs.suggest.refresh()
    },
    listScroll() {
      this.$emit('listScroll')
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
        this.hasMore = false
      }
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.zhida_singer && this.page === 1) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(this._normalizSongs(data.song.list))
      }
      return ret
    },
    _normalizSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query() {
      this.search()
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
      text-align: center
  li{
    padding: 0
    margin: 0
  }
</style>
