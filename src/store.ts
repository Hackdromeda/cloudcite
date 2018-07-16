import Vue from 'vue'
import Vuex from 'vuex'
//@ts-ignore
import * as _ from 'lodash';
const PouchDB = require('pouchdb').default;

Vue.use(Vuex)

var db = new PouchDB('cloudcite')

export default new Vuex.Store({
  state: {
    projects: [
      {
        citations: [],
        style: "modern-language-association",
        locale: "locales-en-US",
        csl: {}
      }
    ],
    selectedProject: 0
  },
  mutations: {
    addCitation(state: any, payload: object) {
      state.projects[state.selectedProject].citations.push(payload)
      //@ts-ignore
      state.projects[state.selectedProject].csl = _.set(state.projects[state.selectedProject].csl, Object.keys(payload)[0], payload[Object.keys(payload)[0]])
    },
    removeCitation(state: any, payload: number) {
      state.projects[state.selectedProject].csl = _.omit(state.projects[state.selectedProject].csl, [Object.keys(state.projects[state.selectedProject].citations[payload])[0]])
      state.projects[state.selectedProject].citations = state.projects[state.selectedProject].citations.splice(payload, 1)
    },
    removeCitationById(state: any, payload: string) {
      state.projects[state.selectedProject].csl = _.omit(state.projects[state.selectedProject].csl, payload)
      //@ts-ignore
      state.projects[state.selectedProject].citations = state.projects[state.selectedProject].citations.filter(citation => Object.keys(citation)[0] !== payload)
    },
    setCitations(state: any, payload: any[]) {
      state.projects[state.selectedProject].citations = payload;
      state.projects[state.selectedProject].csl = {};
      for (let i=0; i<state.projects[state.selectedProject].citations.length; i++) {
        state.projects[state.selectedProject].csl = _.set(state.projects[state.selectedProject].csl, Object.keys(payload)[i], state.projects[state.selectedProject].citations[i][Object.keys(state.projects[state.selectedProject].citations[i])[0]])
      }
    },
    setState(state: any, payload: any) {
      state.projects[state.selectedProject].citations = payload.citations
      state.projects[state.selectedProject].style = payload.style
      state.projects[state.selectedProject].locale = payload.locale
      state.projects[state.selectedProject].csl = payload.csl
    },
    setStyle(state: any, payload: string) {
      state.projects[state.selectedProject].style = payload
    },
    selectProject(state: any, payload: number) {
      state.selectedProject = payload
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
      db.get('citationStore').then(function (response: any) {
        db.put({"_id": "citationStore", "_rev": response._rev, "state": context.state})
          .catch(function (err: any) {
            console.log(err)
          });
      }).catch(function (err: any) {
        console.log(err)
      });
    },
    setStyle(context: any, payload: string) {
      context.commit('setStyle', payload)
      db.get('citationStore').then(function (response: any) {
        db.put({"_id": "citationStore", "_rev": response._rev, "state": context.state})
          .catch(function (err: any) {
            console.log(err)
          });
      }).catch(function (err: any) {
        console.log(err)
      });
    },
    selectProject(context: any, payload: number) {
      context.commit('selectProject', payload)
      db.get('citationStore').then(function (response: any) {
        db.put({"_id": "citationStore", "_rev": response._rev, "state": context.state})
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
      return state.projects[state.selectedProject].citations
    },
    getStyle(state: any) {
      return state.projects[state.selectedProject].style
    },
    getLocale(state: any) {
      return state.projects[state.selectedProject].locale
    },
    getProjects(state: any) {
      return state.projects
    }
  }
})
