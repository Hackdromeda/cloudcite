import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const About = () => import('./views/About.vue')
const Pricing = () => import('./views/Pricing.vue')
const Contribute = () => import('./views/Contribute.vue')
const LoadingPage = () => import('./views/LoadingPage.vue')
const CiteWebsite = () => import('./views/CiteWebsite.vue')
const CiteBook = () => import('./views/CiteBook.vue')
const CiteFilm = () => import('./views/CiteFilm.vue')
const PrivacyPolicy = () => import('./views/PrivacyPolicy.vue')
const WebsiteForm = () => import('./views/CitationForms/WebsiteForm.vue')
const BookForm = () => import('./views/CitationForms/BookForm.vue')
const CreateProject = () => import('./views/CreateProject.vue')
const EditProject = () => import('./views/EditProject.vue')
const ErrorPage = () => import('./views/Error.vue')
const Projects = () => import('./views/Projects.vue')

Vue.use(Router)
//@ts-ignore
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
      path: '/projects/',
      name: 'projects',
      component: Projects,
      meta: {
        title: 'CloudCite · Projects'
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
      path: '/contribute/',
      name: 'contribute',
      component: Contribute,
      meta: {
        title: 'CloudCite · Contribute'
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
      path: '/api/',
      name: 'api',
      beforeEnter(to: any, from: any, next: any) {
          window.location.href = "/";
          window.open('https://api.cloudcite.net','_blank');
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
      component: ErrorPage,
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
      path: '/create/project/',
      name: 'createproject',
      component: CreateProject,
      meta: {
        title: 'CloudCite · Create Project'
      }
    },
    {
      path: '/projects/edit/:id/',
      name: 'editproject',
      component: EditProject,
      meta: {
        title: 'CloudCite · Edit Project'
      }
    },
    {
      path: '/edit/website/',
      name: 'websiteform',
      component: WebsiteForm,
      meta: {
        title: 'CloudCite · Edit Website Citation'
      }
    },
    {
      path: '/edit/book/',
      name: 'bookform',
      component: BookForm,
      meta: {
        title: 'CloudCite · Edit Book Citation'
      }
    },
    {
      path: '/cite/website/',
      name: 'citewebsite',
      component: CiteWebsite,
      meta: {
        title: 'CloudCite · Cite a Website'
      }
    },
    {
      path: '/cite/book/',
      name: 'citebook',
      component: CiteBook,
      meta: {
        title: 'CloudCite · Cite a Book'
      }
    },
    {
      path: '/cite/film/',
      name: 'citefilm',
      component: CiteFilm,
      meta: {
        title: 'CloudCite · Cite a Film'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    //@ts-ignore
    document.getElementById('app').scrollIntoView();
    return { x: 0, y: 0 }
  }
})