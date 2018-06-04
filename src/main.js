// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import {store} from './store'
import App from './App'
import router from './router'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
