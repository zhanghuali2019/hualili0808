<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li @click="selectItem(item)" class="search-item" v-for="(item, index) in searches" :key="index">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    searches: {
      type: Array,
      default: () => { return [] }
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    deleteOne (item) {
      this.$emit('delete', item)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search-list
    .search-item
      display: flex
      align-items: center
      overflow: hidden
      margin-bottom: 10px
      &.list-enter-active, &.list-leave-active
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        flex: 1
        color: $color-text-l
        font-size: $font-size-small-s
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small-s
          color: $color-text-d
  ul{
    padding:0
  }
</style>
