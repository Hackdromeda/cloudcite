import Vue from 'vue'
import Router from 'vue-router'
import CloudCite from '@/components/CloudCite'
const About = () => import('@/components/About')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CloudCite',
      component: CloudCite
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
