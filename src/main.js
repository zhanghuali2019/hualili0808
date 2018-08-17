import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import vueLazyload from 'vue-lazyload'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(vueLazyload, {
  loading: require('common/image/logo@2x.jpg')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
