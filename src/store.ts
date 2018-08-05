import Vue from 'vue';
import Vuex from 'vuex';
//@ts-ignore
import * as _ from 'lodash';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "selectedProject": 0,
    "editingProject": null,
    "projects": [
      {
        "id": "Project-0",
        "title": "Project 1",
        "citations": [],
        "previewsHTMLCache": [],
        "style": "modern-language-association",
        "locale": "locales-en-US"
      }
    ],
  },
  mutations: {
    addCitation(state: any, payload: any) {
      //@ts-ignore
      if (state.projects[state.selectedProject].citations.filter(c => c.id === payload.id).length > 0) {
        for (var i = 0; i < state.projects[state.selectedProject].citations.length; i++) {
          //@ts-ignore
          if (state.projects[state.selectedProject].citations[i].id == payload.id) {
            //@ts-ignore
            state.projects[state.selectedProject].citations[i] = payload
          }
        }
      } else {
        state.projects[state.selectedProject].citations.push(payload)
      }
    },
    removeCitation(state: any, payload: number) {
      state.projects[state.selectedProject].citations = state.projects[state.selectedProject].citations.splice(payload, 1)
    },
    removeCitationById(state: any, payload: string) {
      //@ts-ignore
      state.projects[state.selectedProject].citations = state.projects[state.selectedProject].citations.filter(citation => citation.id !== payload)
    },
    setCitations(state: any, payload: any[]) {
      state.projects[state.selectedProject].citations = payload;
    },
    setState(state: any) {
      var dbRequest = indexedDB.open("cloudcite");

      dbRequest.onupgradeneeded = function() {
        var db = dbRequest.result;
        var store = db.createObjectStore("cloudcite", {keypath: "id"})
        var selectedProjectIndex = store.createIndex("by_selectedProject", "selectedProject")
        var citationsIndex = store.createIndex("by_projects", "projects")
        store.put({selectedProject: state.selectedProject, projects: state.projects}, 0)
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
    saveState(state: any) {
      var dbRequest = indexedDB.open("cloudcite");

      dbRequest.onupgradeneeded = function() {
        var db = dbRequest.result;
        var store = db.createObjectStore("cloudcite", {autoIncrement: true})
        var selectedProjectIndex = store.createIndex("by_selectedProject", "selectedProject")
        var citationsIndex = store.createIndex("by_projects", "projects")
        store.put({selectedProject: state.selectedProject, projects: state.projects}, 0)
      };

      dbRequest.onsuccess = function() {
        var db = dbRequest.result;
        var tx = db.transaction("cloudcite", "readwrite");
        var store = tx.objectStore("cloudcite");
        store.put(state, 0);
      };
    },
    setEditingProject(state: any, payload: any) {
      state.editingProject = payload
    },
    setProjectStyle(state: any, payload: any) {
      for (let i=0; i < state.projects.length; i++) {
        if (state.projects[i].id == payload.id && payload.style != '' && payload.style != null) {
          state.projects[i].style = payload.style
        }
      }
    },
    setProject(state: any, payload: any) {
      for (let i=0; i < state.projects.length; i++) {
        //@ts-ignore
        if (state.projects[i].id == payload.id) {
          state.projects[i] = payload
        }
      }
    },
    createProject(state: any, payload: any) {
      state.projects.push(payload)
    },
    editProject(state: any, payload: any) {
      for (let i=0; i < state.projects.length; i++) {
        if (state.projects[i].id == payload.id) {
          state.projects[i] = payload
        }
      }
    },
    cachePreview(state: any, payload: any) {
      //@ts-ignore
      if (state.projects[state.selectedProject].previewsHTMLCache.filter(preview => preview.id == payload.id).length > 0) {
        for (let i=0; i < state.projects[state.selectedProject].previewsHTMLCache.length; i++) {
          if (state.projects[state.selectedProject].previewsHTMLCache[i].id == payload.id) {
            state.projects[state.selectedProject].previewsHTMLCache[i] = payload
          }
        }
      } else {
        state.projects[state.selectedProject].previewsHTMLCache.push(payload)
      }
      //@ts-ignore
      if (payload.delete && state.projects[state.selectedProject].previewsHTMLCache.filter(preview => preview.id == payload.id).length > 0) {
        //@ts-ignore
        state.projects[state.selectedProject].previewsHTMLCache = state.projects[state.selectedProject].previewsHTMLCache.filter(preview => preview.id != payload.id)
      }
    }
  },
  actions: {
    addCitation(context: any, payload: any) {
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
      context.commit('saveState')
    },
    setEditingProject(context: any, payload: any) {
      context.commit('setEditingProject', payload)
    },
    setProjectStyle(context: any, payload: any) {
      context.commit('setProjectStyle', payload)
      context.commit('saveState')
    },
    setProject(context: any, payload: any) {
      context.commit('setProject', payload)
      context.commit('saveState')
    },
    createProject(context: any, payload: any) {
      context.commit('createProject', payload)
      context.commit('saveState')
    },
    editProject(context: any, payload: any) {
      context.commit('editProject', payload)
      context.commit('saveState')
    },
    cachePreview(context: any, payload: any) {
      context.commit('cachePreview', payload)
      context.commit('saveState')
    }
  },
  getters: {
    getEditingProject(state: any) {
      return state.editingProject
    },
    getProjects(state: any) {
      return state.projects
    },
    getState(state: any) {
      return state
    },
    getCitations(state: any) {
      return state.projects[state.selectedProject].citations
    },
    getPreviewsCache(state: any) {
      return state.projects[state.selectedProject].previewsHTMLCache
    }
  }
})
