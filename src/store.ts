import Vue from 'vue'
import Vuex from 'vuex'
//@ts-ignore
import * as _ from 'lodash';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "selectedProject": 0,
    "projects": [
      {
        "title": "New Project",
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
    setState(state: any) {
      var dbRequest = indexedDB.open("cloudcite");

      dbRequest.onupgradeneeded = function() {
        var db = dbRequest.result;
        var store = db.createObjectStore("cloudcite", {keypath: "id"})
        var selectedProjectIndex = store.createIndex("by_selectedProject", "selectedProject")
        var citationsIndex = store.createIndex("by_projects", "projects")
        var editingIndex = store.createIndex("by_editing", "style")
        store.put({selectedProject: state.selectedProject, projects: state.projects, editing: state.editing}, 0)
      };

      dbRequest.onsuccess = function() {
        var db = dbRequest.result;
        var tx = db.transaction("cloudcite", "readonly");
        var store = tx.objectStore("cloudcite");
        if ('getAll' in store) {
          store.getAll().onsuccess = function(event: any) {
            if (event.target.result && event.target.result.length > 0) {
              state.selectedProject = event.target.result[0].selectedProject
              state.projects = event.target.result[0].projects
              state.editing = event.target.result[0].editing
            }
          }
        }
      };
    },
    setStyle(state: any, payload: string) {
      state.projects[state.selectedProject].style = payload
    },
    selectProject(state: any, payload: number) {
      state.selectedProject = payload
    },
    setEditing(state: any, payload: any) {
      state.editing = payload
    },
    saveState(state: any) {
      var dbRequest = indexedDB.open("cloudcite");

      dbRequest.onupgradeneeded = function() {
        var db = dbRequest.result;
        var store = db.createObjectStore("cloudcite", {autoIncrement: true})
        var selectedProjectIndex = store.createIndex("by_selectedProject", "selectedProject")
        var citationsIndex = store.createIndex("by_projects", "projects")
        var editingIndex = store.createIndex("by_editing", "style")
        store.put({selectedProject: state.selectedProject, projects: state.projects, editing: state.editing}, 0)
      };

      dbRequest.onsuccess = function() {
        var db = dbRequest.result;
        var tx = db.transaction("cloudcite", "readwrite");
        var store = tx.objectStore("cloudcite");
        store.put(state, 0);
      };
    }
  },
  actions: {
    addCitation(context: any, payload: object) {
      context.commit('addCitation', payload)
      context.commit('saveState')
    },
    removeCitation(context: any, payload: number) {
      context.commit('removeCitation', payload)
      context.commit('saveState')
    },
    removeCitationById(context: any, payload: string) {
      context.commit('removeCitationById', payload)
      context.commit('saveState')
    },
    setCitations(context: any, payload: any[]) {
      context.commit('setCitations', payload)
      context.commit('saveState')
    },
    setState(context: any) {
      context.commit('setState')
    },
    saveState(context: any) {
      context.commit('saveState')
    },
    setStyle(context: any, payload: string) {
      context.commit('setStyle', payload)
      context.commit('saveState')
    },
    selectProject(context: any, payload: number) {
      context.commit('selectProject', payload)
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
