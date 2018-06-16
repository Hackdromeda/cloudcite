import Vue from 'vue'
import Router from 'vue-router'
import CloudCite from '@/components/CloudCite'
const EditCitation = () => import('@/components/EditCitation')
const About = () => import('@/components/About')
const Pricing = () => import('@/components/Pricing')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CloudCite',
      component: CloudCite
    },
    {
      path: '/edit',
      name: 'EditCitation',
      component: EditCitation
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: Pricing
    },
    {
      path: '/status',
      beforeEnter(to, from, next) {
          window.open('https://status.cloudcite.net','_blank');
      }
    }  
  ]
})
