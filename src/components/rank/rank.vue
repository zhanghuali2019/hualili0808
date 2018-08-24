<template>
  <div class="rank">
    <scroll class="toplist" :data="topList">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="(item, index) in topList" :key="index">
          <div class="icon">
            <img style="width:22vw;height:22vw" v-lazy="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {mapMutations} from 'vuex'
export default {
  created() {
    this._getTopList()
  },
  data() {
    return {
      topList: []
    }
  },
  methods: {
    _getTopList() {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    },
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
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

  .rank
    position: fixed
    width: 100%
    top: 25vw
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      padding:0 20px
      ul
        padding:0
        margin:0
      .item
        display: flex
        height: 22vw
        margin-bottom: 20px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 22vw
          width: 22vw
          height: 22vw
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          height: 22vw
          padding-left:20px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
