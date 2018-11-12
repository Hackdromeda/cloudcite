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
      alias: '/index.html',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        title: 'CloudCite · The Best Automatic Bibliography Generator'
      }
    },
    {
      path: '/settings/',
      alias: '/settings/index.html',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      meta: {
        title: 'CloudCite · Settings'
      }
    },
    {
      path: '/projects/',
      alias: '/projects/index.html',
      name: 'projects',
      component: () => import('./views/Projects.vue'),
      meta: {
        title: 'CloudCite · Projects'
      }
    },
    {
      path: '/about/',
      alias: '/about/index.html',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: {
        title: 'CloudCite · About'
      }
    },
    {
      path: '/callback/',
      alias: '/callback/index.html',
      name: 'LoadingPage',
      component: () => import('./views/LoadingPage.vue'),
      meta: {
        title: 'CloudCite · Log In'
      }
    },
    {
      path: '/pricing/',
      alias: '/pricing/index.html',
      name: 'pricing',
      component: () => import('./views/Pricing.vue'),
      meta: {
        title: 'CloudCite · Pricing'
      }
    },
    {
      path: '/contribute/',
      alias: '/contribute/index.html',
      name: 'contribute',
      component: () => import('./views/Contribute.vue'),
      meta: {
        title: 'CloudCite · Contribute'
      }
    },
    {
      path: '/install/',
      alias: '/install/index.html',
      name: 'install',
      component: () => import('./views/Install.vue'),
      meta: {
        title: 'CloudCite · Install'
      }
    },
    {
      path: '/status/',
      alias: '/status/index.html',
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
      alias: '/api/index.html',
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
      alias: '/support/index.html',
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
      path: '/feedback/',
      alias: '/feedback/index.html',
      name: 'feedback',
      beforeEnter(to, from, next) {
          window.location.href = "/";
          window.open('https://feedback.cloudcite.net','_blank');
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
      alias: '/privacy/index.html',
      name: 'privacypolicy',
      component: () => import('./views/PrivacyPolicy.vue'),
      meta: {
        title: 'CloudCite · Privacy'
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
      alias: '/edit/website/index.html',
      name: 'websiteform',
      component: () => import('./views/CitationForms/WebsiteForm.vue'),
      meta: {
        title: 'CloudCite · Edit Website Citation'
      }
    },
    {
      path: '/edit/book/',
      alias: '/edit/book/index.html',
      name: 'bookform',
      component: () => import('./views/CitationForms/BookForm.vue'),
      meta: {
        title: 'CloudCite · Edit Book Citation'
      }
    },
    {
      path: '/edit/film/',
      alias: '/edit/film/index.html',
      name: 'filmform',
      component: () => import('./views/CitationForms/FilmForm.vue'),
      meta: {
        title: 'CloudCite · Edit Film Citation'
      }
    },
    {
      path: '/cite/website/',
      alias: '/cite/website/index.html',
      name: 'citewebsite',
      component: () => import('./views/CiteWebsite.vue'),
      meta: {
        title: 'CloudCite · Cite a Website'
      }
    },
    {
      path: '/cite/book/',
      alias: '/cite/book/index.html',
      name: 'citebook',
      component: () => import('./views/CiteBook.vue'),
      meta: {
        title: 'CloudCite · Cite a Book'
      }
    },
    {
      path: '/cite/film/',
      alias: '/cite/film/index.html',
      name: 'citefilm',
      component: () => import('./views/CiteFilm.vue'),
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
});