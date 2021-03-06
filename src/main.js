// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/common.css'
import './assets/css/iconfont.css'
import './assets/js/iconfont.js'

Vue.use(VueAxios, axios)
Vue.use(MintUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
