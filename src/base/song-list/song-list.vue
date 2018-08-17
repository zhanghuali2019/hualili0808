<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" v-for="(song, index) in songs" :key="index" class="item">
        <div class="content">
          <p class="name">{{song.name}}</p>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    songs: {
      type: Array,
      default: null
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer}.${song.album}`
    },
    selectItem(item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height:auto
      padding-bottom: 1vw
      font-size:$font-size-medium
      .content
        flex: 1
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
          margin:0;
          font-size:$font-size-small
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
          font-size:$font-size-small
</style>
