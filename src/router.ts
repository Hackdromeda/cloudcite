import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
//@ts-ignore
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
    routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        title: 'CloudCite · The Best Automatic Bibliography Generator'
      }
    },
    {
      path: '/projects/',
      name: 'projects',
      component: () => import('./views/Projects.vue'),
      meta: {
        title: 'CloudCite · Projects'
      }
    },
    {
      path: '/about/',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: {
        title: 'CloudCite · About'
      }
    },
    {
      path: '/callback/',
      name: 'LoadingPage',
      component: () => import('./views/LoadingPage.vue'),
      meta: {
        title: 'CloudCite · Log In'
      }
    },
    {
      path: '/pricing/',
      name: 'pricing',
      component: () => import('./views/Pricing.vue'),
      meta: {
        title: 'CloudCite · Pricing'
      }
    },
    {
      path: '/contribute/',
      name: 'contribute',
      component: () => import('./views/Contribute.vue'),
      meta: {
        title: 'CloudCite · Contribute'
      }
    },
    {
      path: '/status/',
      name: 'status',
      beforeEnter(to, from, next) {
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
      beforeEnter(to, from, next) {
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
      beforeEnter(to, from, next) {
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
      component: () => import('./views/Error.vue'),
      meta: {
        title: 'CloudCite · Error'
      }
    },
    {
      path: '/privacy/',
      name: 'privacypolicy',
      component: () => import('./views/PrivacyPolicy.vue'),
      meta: {
        title: 'CloudCite · Privacy'
      }
    },
    {
      path: '/create/project/',
      name: 'createproject',
      component: () => import('./views/CreateProject.vue'),
      meta: {
        title: 'CloudCite · Create Project'
      }
    },
    {
      path: '/projects/edit/:id/',
      name: 'editproject',
      component: () => import('./views/EditProject.vue'),
      meta: {
        title: 'CloudCite · Edit Project'
      }
    },
    {
      path: '/edit/website/',
      name: 'websiteform',
      component: () => import('./views/CitationForms/WebsiteForm.vue'),
      meta: {
        title: 'CloudCite · Edit Website Citation'
      }
    },
    {
      path: '/edit/book/',
      name: 'bookform',
      component: () => import('./views/CitationForms/BookForm.vue'),
      meta: {
        title: 'CloudCite · Edit Book Citation'
      }
    },
    {
      path: '/edit/film/',
      name: 'filmform',
      component: () => import('./views/CitationForms/FilmForm.vue'),
      meta: {
        title: 'CloudCite · Edit Film Citation'
      }
    },
    {
      path: '/cite/website/',
      name: 'citewebsite',
      component: () => import('./views/CiteWebsite.vue'),
      meta: {
        title: 'CloudCite · Cite a Website'
      }
    },
    {
      path: '/cite/book/',
      name: 'citebook',
      component: () => import('./views/CiteBook.vue'),
      meta: {
        title: 'CloudCite · Cite a Book'
      }
    },
    {
      path: '/cite/film/',
      name: 'citefilm',
      component: () => import('./views/CiteFilm.vue'),
      meta: {
        title: 'CloudCite · Cite a Film'
      }
    }
  ],
});