<template>
 <div class="header">
   <div class="text">团子音乐</div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  import "~common/stylus/variable"
  import "~common/stylus/mixin"
  .header{
    position: relative
    height:8vh
    text-align: center
  }
  .text{
    display: table
    vertical-align: top
    line-height: 13vw
    font-size: $font-size-large-x
    margin: 0 auto
    color: $color-theme
  }
  .mine{
    position:absolute
    top:0
    right:0
  }
  .icon-mine{
    display:block
    padding:12px
    font-size:20px
    color:$color-theme
  }
</style>
