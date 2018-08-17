<template>
  <div id="app">
    <Header></Header>
    <tab></tab>
    <keep-alive>  <!--将DOM缓存到内存中-->
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/header/header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
export default{
  components: {
    Header,
    Tab,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
