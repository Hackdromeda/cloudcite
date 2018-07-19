import Vue from 'vue'
import Vuex from 'vuex'
//@ts-ignore
import * as _ from 'lodash';
const PouchDB = require('pouchdb').default;

Vue.use(Vuex)

var db = new PouchDB('cloudcite')

export default new Vuex.Store({
  state: {
    "_id": "state",
    "_rev": 0,
    "selectedProject": 0,
    "projects": [
      {
        "citations": [],
        "style": "modern-language-association",
        "locale": "locales-en-US",
        "csl": {}
      }
    ],
    "editing": null
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
      state = Object.assign(payload.state, "_rev", payload._rev)
    },
    setStyle(state: any, payload: string) {
      state.projects[state.selectedProject].style = payload
    },
    selectProject(state: any, payload: number) {
      state.selectedProject = payload
    },
    setEditing(state: any, payload: any) {
      state.editing = payload
    }
  },
  actions: {
    addCitation(context: any, payload: object) {
      context.commit('addCitation', payload)
      db.get('state').then(function (doc: any) {
        db.put({
          "_id": 'state',
          "_rev": doc._rev,
          "state": {
            "selectedProject": context.state.selectedProject,
            "projects": [
              {
                "citations": context.state.projects[context.state.selectedProject].citations,
                "style": context.state.projects[context.state.selectedProject].style,
                "locale": context.state.projects[context.state.selectedProject].locale,
                "csl": context.state.projects[context.state.selectedProject].csl
              }
            ]
          }
        })
      }).catch(function (err: any) {
        console.log(err)
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
    removeCitation(context: any, payload: number) {
      context.commit('removeCitation', payload)
      db.get('state').then(function (doc: any) {
        db.put({
          "_id": 'state',
          "_rev": doc._rev,
          "state": {
            "selectedProject": context.state.selectedProject,
            "projects": [
              {
                "citations": context.state.projects[context.state.selectedProject].citations,
                "style": context.state.projects[context.state.selectedProject].style,
                "locale": context.state.projects[context.state.selectedProject].locale,
                "csl": context.state.projects[context.state.selectedProject].csl
              }
            ]
          }
        })
      }).catch(function (err: any) {
        console.log(err)
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
    removeCitationById(context: any, payload: string) {
      context.commit('removeCitationById', payload)
      db.get('state').then(function (doc: any) {
        db.put({
          "_id": 'state',
          "_rev": doc._rev,
          "state": {
            "selectedProject": context.state.selectedProject,
            "projects": [
              {
                "citations": context.state.projects[context.state.selectedProject].citations,
                "style": context.state.projects[context.state.selectedProject].style,
                "locale": context.state.projects[context.state.selectedProject].locale,
                "csl": context.state.projects[context.state.selectedProject].csl
              }
            ]
          }
        })
      }).catch(function (err: any) {
        console.log(err)
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
    setCitations(context: any, payload: any[]) {
      context.commit('setCitations', payload)
      db.get('state').then(function (doc: any) {
        db.put({
          "_id": 'state',
          "_rev": doc._rev,
          "state": {
            "selectedProject": context.state.selectedProject,
            "projects": [
              {
                "citations": context.state.projects[context.state.selectedProject].citations,
                "style": context.state.projects[context.state.selectedProject].style,
                "locale": context.state.projects[context.state.selectedProject].locale,
                "csl": context.state.projects[context.state.selectedProject].csl
              }
            ]
          }
        })
      }).catch(function (err: any) {
        console.log(err)
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
    setState(context: any, payload: any) {
      context.commit('setState', payload)
    },
    setStyle(context: any, payload: string) {
      context.commit('setStyle', payload)
      db.get('state').then(function (doc: any) {
        db.put({
          "_id": 'state',
          "_rev": doc._rev,
          "state": {
            "selectedProject": context.state.selectedProject,
            "projects": [
              {
                "citations": context.state.projects[context.state.selectedProject].citations,
                "style": context.state.projects[context.state.selectedProject].style,
                "locale": context.state.projects[context.state.selectedProject].locale,
                "csl": context.state.projects[context.state.selectedProject].csl
              }
            ]
          }
        })
      }).catch(function (err: any) {
        console.log(err)
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
    selectProject(context: any, payload: number) {
      context.commit('selectProject', payload)
      db.get('state').then(function (doc: any) {
        db.put({
          "_id": 'state',
          "_rev": doc._rev,
          "state": {
            "selectedProject": context.state.selectedProject,
            "projects": [
              {
                "citations": context.state.projects[context.state.selectedProject].citations,
                "style": context.state.projects[context.state.selectedProject].style,
                "locale": context.state.projects[context.state.selectedProject].locale,
                "csl": context.state.projects[context.state.selectedProject].csl
              }
            ]
          }
        })
      }).catch(function (err: any) {
        console.log(err)
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
    setEditing(context: any, payload: any) {
      context.commit('setEditing', payload)
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
    },
    getEditing(state: any) {
      return state.editing
    },
    getState(state: any) {
      return state
    }
  }
})
