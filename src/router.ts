import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const About = () => import('./views/About.vue')
const Pricing = () => import('./views/Pricing.vue')
const LoadingPage = () => import('./views/LoadingPage.vue')
const EditWebsite = () => import('./views/EditWebsite.vue')
const EditBook = () => import('./views/EditBook.vue')
const EditFilm = () => import('./views/EditFilm.vue')
const PrivacyPolicy = () => import('./views/PrivacyPolicy.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'CloudCite · The Best Automatic Bibliography Generator'
      }
    },
    {
      path: '/about/',
      name: 'about',
      component: About,
      meta: {
        title: 'CloudCite · About'
      }
    },
    {
      path: '/callback/',
      name: 'LoadingPage',
      component: LoadingPage,
      meta: {
        title: 'CloudCite · Log In'
      }
    },
    {
      path: '/pricing/',
      name: 'pricing',
      component: Pricing,
      meta: {
        title: 'CloudCite · Pricing'
      }
    },
    {
      path: '/status/',
      name: 'status',
      beforeEnter(to: any, from: any, next: any) {
          window.location.href = "/";
          window.open('https://status.cloudcite.net','_blank');
      },
      meta: {
        title: 'CloudCite · The Best Automatic Bibliography Generator'
      }
    },
    {
      path: '/support/',
      name: 'support',
      beforeEnter(to: any, from: any, next: any) {
          window.location.href = "/";
          window.open('https://help.cloudcite.net','_blank');
      },
      meta: {
        title: 'CloudCite · The Best Automatic Bibliography Generator'
      }
    },
    {
      path: '*',
      name: 'error',
      beforeEnter(to: any, from: any, next: any) {
        window.location.href = "/error/";
      },
      meta: {
        title: 'CloudCite · Error'
      }
    },
    {
      path: '/privacy/',
      name: 'privacypolicy',
      component: PrivacyPolicy,
      meta: {
        title: 'CloudCite · Privacy'
      }
    },
    {
      path: '/edit/format/website/',
      name: 'editwebsite',
      component: EditWebsite,
      meta: {
        title: 'CloudCite · Cite a Website'
      }
    },
    {
      path: '/edit/format/book/',
      name: 'editbook',
      component: EditBook,
      meta: {
        title: 'CloudCite · Cite a Book'
      }
    },
    {
      path: '/edit/format/film/',
      name: 'editfilm',
      component: EditFilm,
      meta: {
        title: 'CloudCite · Cite a Film'
      }
    }
  ]
})