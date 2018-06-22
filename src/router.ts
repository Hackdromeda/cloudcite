import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Pricing from './views/Pricing.vue'
import EditWebsite from './views/EditWebsite.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: Pricing
    },
    {
      path: '/status',
      name: 'status',
      beforeEnter(to, from, next) {
          window.open('https://status.cloudcite.net','_blank');
      }
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/editwebsite',
      name: 'editwebsite',
      component: EditWebsite
    },
  ]
})
