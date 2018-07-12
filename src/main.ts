import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Buefy from 'buefy'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('vue-render-event'))
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
