import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
//@ts-ignore
import VueScript from 'vue-script2'
//@ts-ignore
import Ads from 'vue-google-adsense'
//@ts-ignore
import SuiVue from 'semantic-ui-vue';

Vue.use(VueScript)
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
Vue.use(SuiVue)

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
//@ts-ignore
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
