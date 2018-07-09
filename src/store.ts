import Vue from 'vue'
import Vuex from 'vuex'
const PouchDB = require('pouchdb').default;

Vue.use(Vuex)

var db = new PouchDB('cloudcite')

export default new Vuex.Store({
  state: {
    citations: []
  },
  mutations: {
    addCitation(state: any, payload: object) {
      state.citations.push(payload)
    },
    removeCitation(state: any, payload: number) {
      state.citations = state.citations.splice(payload, 1)
    },
    setCitations(state: any, payload: any[]) {
      state.citations = payload;
    }
  },
  actions: {
    addCitation(context: any, payload: object) {
      context.commit('addCitation', payload)
      db.get('citationStore').then(function (response: any) {
        db.put({"_id": "citationStore", "_rev": response._rev, "citations": context.getters.getCitations})
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
        db.put({"_id": "citationStore", "_rev": response._rev, "citations": context.getters.getCitations})
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
        db.put({"_id": "citationStore", "_rev": response._rev, "citations": context.getters.getCitations})
          .catch(function (err: any) {
            console.log(err)
          });
      }).catch(function (err: any) {
        console.log(err)
      });
    }
  },
  getters: {
    getCitations(state: any) {
      return state.citations
    }
  }
})
