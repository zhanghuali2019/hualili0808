<template>
  <div id="app">
    <Header></Header>
    <tab></tab>
    <keep-alive>  <!--将DOM缓存到内存中-->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/header/header'
import Tab from 'components/tab/tab'
export default{
  components: {
    Header,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
