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
      db.get('citationStore').then(function (response: any) {
        if (response.state) {
          store.dispatch('setState', response.state)
        }
      }).catch(function (err: any) {
        db.put({"_id": "citationStore", "state": {
            citations: [],
            style: "modern-language-association",
            locale: "locales-en-US",
            csl: {}
          }
        })
          .catch(function (err: any) {
            console.log(err)
          });
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
