import Vue from 'vue'
import Vuex from 'vuex'
//@ts-ignore
import * as _ from 'lodash';
const PouchDB = require('pouchdb').default;

Vue.use(Vuex)

var db = new PouchDB('cloudcite')

export default new Vuex.Store({
  state: {
    citations: [],
    style: "modern-language-association",
    locale: "locales-en-US",
    csl: {}
  },
  mutations: {
    addCitation(state: any, payload: object) {
      state.citations.push(payload)
      //@ts-ignore
      state.csl = _.set(state.csl, Object.keys(payload)[0], payload[Object.keys(payload)[0]])
    },
    removeCitation(state: any, payload: number) {
      state.csl = _.omit(state.csl, [Object.keys(state.citations[payload])[0]])
      state.citations = state.citations.splice(payload, 1)
    },
    removeCitationById(state: any, payload: string) {
      state.csl = _.omit(state.csl, payload)
      //@ts-ignore
      state.citations = state.citations.filter(citation => Object.keys(citation)[0] !== payload)
    },
    setCitations(state: any, payload: any[]) {
      state.citations = payload;
      state.csl = {};
      for (let i=0; i<state.citations.length; i++) {
        state.csl = _.set(state.csl, Object.keys(payload)[i], state.citations[i][Object.keys(state.citations[i])[0]])
      }
    },
    setState(state: any, payload: any) {
      state.citations = payload.citations
      state.style = payload.style
      state.locale = payload.locale
      state.csl = payload.csl
    }
  },
  actions: {
    addCitation(context: any, payload: object) {
      context.commit('addCitation', payload)
      db.get('citationStore').then(function (response: any) {
        db.put({"_id": "citationStore", "_rev": response._rev, "state": context.state})
          .catch(function (err: any) {
            console.log(err)
          });
      }).catch(function (err: any) {
        console.log(err)
      });
    },
    removeCitation(context: any, payload: number) {
      context.commit('removeCitation', payload)
      db.get('citationStore').then(function (response: any) {
        db.put({"_id": "citationStore", "_rev": response._rev, "state": context.state})
          .catch(function (err: any) {
            console.log(err)
          });
      }).catch(function (err: any) {
        console.log(err)
      });
    },
    removeCitationById(context: any, payload: string) {
      context.commit('removeCitationById', payload)
      db.get('citationStore').then(function (response: any) {
        db.put({"_id": "citationStore", "_rev": response._rev, "state": context.state})
          .catch(function (err: any) {
            console.log(err)
          });
      }).catch(function (err: any) {
        console.log(err)
      });
    },
    setCitations(context: any, payload: any[]) {
      context.commit('setCitations', payload)
      db.get('citationStore').then(function (response: any) {
        db.put({"_id": "citationStore", "_rev": response._rev, "state": context.state})
          .catch(function (err: any) {
            console.log(err)
          });
      }).catch(function (err: any) {
        console.log(err)
      });
    },
    setState(context: any, payload: any) {
      context.commit('setState', payload)
    }
  },
  getters: {
    getCitations(state: any) {
      return state.citations
    },
    getStyle(state: any) {
      return state.style
    },
    getLocale(state: any) {
      return state.locale
    }
  }
})
