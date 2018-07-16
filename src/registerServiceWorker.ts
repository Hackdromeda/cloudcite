/* eslint-disable no-console */

import { register } from 'register-service-worker';
const store = require('./store').default;
const PouchDB = require('pouchdb').default;

  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )     
      var db = new PouchDB('cloudcite')

      db.get('state').then(function (doc: any) {
        console.log('SERVICE WORKER SET STATE TO: ')
        console.log(doc)
        store.dispatch('setState', doc)
      }).catch(function (err: any) {
        if (err.name == 'not_found') {
          db.put({
            _id: 'state',
            state: {
              selectedProject: 0,
              projects: [
                {
                  citations: [],
                  style: "modern-language-association",
                  locale: "locales-en-US",
                  csl: {}
                }
              ]
            }
          })
        }
      });
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
