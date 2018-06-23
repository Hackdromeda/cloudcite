import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const About = () => import('./views/About.vue')
const Pricing = () => import('./views/Pricing.vue')
const EditWebsite = () => import('./views/EditWebsite.vue')
const LoadingPage = () => import('./views/LoadingPage.vue')

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
      path: '/callback',
      name: 'LoadingPage',
      component: LoadingPage
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: Pricing
    },
    {
      path: '/status',
      name: 'status',
      beforeEnter(to: any, from: any, next: any) {
          window.open('https://status.cloudcite.net','_blank');
      }
    },
    {
      path: '*',
      name: 'error',
      beforeEnter(to: any, from: any, next: any) {
        window.location.href = "/error.html";
      }
    },
    {
      path: '/editwebsite',
      name: 'editwebsite',
      component: EditWebsite
    }
  ]
})
