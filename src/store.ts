import Vue from 'vue';
import Vuex from 'vuex';
import { State } from '@/models/state.model';
import { Project } from '@/models/project.model';
import { Locale } from '@/models/locale.model';
import { Style } from '@/models/style.model';
import { Citation } from '@/models/citation.model';
import localForage from "localforage";
const crypto = require('crypto');

Vue.use(Vuex)

export const localState = localForage.createInstance({
  name: 'cloudcite',
  version: 1.0,
  driver: localForage.INDEXEDDB
});

let projectId: string = crypto.randomBytes(20).toString('hex');

export default new Vuex.Store({
  state: <State> {
    selectedProject: projectId,
    locale: {
      key: "English (US)",
      text: "English (US)",
      value: "locales-en-US"
    },
    editingCitation: null,
    favoriteStyles: [
      {"key":"modern-language-association","text":"Modern Language Association 8th edition (MLA)","value":"modern-language-association"},
      {"key": "apa","text": "American Psychological Association 6th edition (APA)","value": "apa"},
      {"key":"chicago-note-bibliography","text":"Chicago Manual of Style 17th edition (note)","value":"chicago-note-bibliography"},
      {"key":"turabian-fullnote-bibliography","text":"Turabian 8th edition (full note)","value":"turabian-fullnote-bibliography"},
      {"key":"ieee","text":"IEEE","value":"ieee"},
      {"key":"elsevier-harvard","text":"Elsevier - Harvard (with titles)","value":"elsevier-harvard"},
      {"key":"american-medical-association","value":"american-medical-association","text":"American Medical Association (AMA)"},
      {"key":"american-sociological-association","text":"American Sociological Association (ASA)","value":"american-sociological-association"},
      {"key":"vancouver","text":"Vancouver","value":"vancouver"}
    ],
    message: {
      "type": null,
      "description": null
    },
    projects: [
      {
        "id": projectId,
        "title": "New Project",
        "citations": [],
        "style": {
          "key":"modern-language-association",
          "text":"Modern Language Association 8th edition (MLA)",
          "value":"modern-language-association"},
      }
    ]
  },
  mutations: {
    setMessage(state: State, payload: any) {
      state.message = Object.assign(state.message, {type: payload.type, description: payload.description});
    },
    addCitation(state: State, payload: Citation) {
      //@ts-ignore
      state.projects.find((project: Project) => project.id == state.selectedProject).citations = state.projects.find((project: Project) => project.id == state.selectedProject).citations.filter((citation: Citation) => citation.id !== payload.id);
      //@ts-ignore
      state.projects.find((project: Project) => project.id == state.selectedProject).citations.push(payload);
    },
    removeCitation(state: State, payload: string) {
      //@ts-ignore
      state.projects.find((project: Project) => project.id == state.selectedProject).citations = state.projects.find((project: Project) => project.id == state.selectedProject).citations.filter((citation: Citation) => citation.id !== payload);
    },
    resetCitations(state: State, payload: string) {
      //@ts-ignore
      state.projects.find((project: Project) => project.id == payload).citations = [];
    },
    resetProject(state: State, payload: string) {
      let project = state.projects.find((project: Project) => project.id == payload);
      project = {
        "id": payload,
        "title": "New Project",
        "citations": [],
        "style": state.favoriteStyles[0]
      };
    },
    resetProjects(state: State) {
      let projectId: string = crypto.randomBytes(10).toString('hex');
      state.projects = [
        {
          "id": projectId,
          "title": "New Project",
          "citations": [],
          "style": state.favoriteStyles[0]
        }
      ];
      state.selectedProject = projectId;
    },
    setLocale(state: State, payload: Locale) {
      state.locale = payload;
    },
    addProject(state: State, payload: Project) {
      if (state.projects.find((project: Project) => project.id == payload.id)) {
        //@ts-ignore
        state.projects.find((project: Project) => project.id == payload.id).title = payload.title;
        //@ts-ignore
        state.projects.find((project: Project) => project.id == payload.id).citations = payload.citations;
        //@ts-ignore
        state.projects.find((project: Project) => project.id == payload.id).style = payload.style;
      }
      else {
        state.projects.push(Object.assign(payload, {id: crypto.randomBytes(20).toString('hex')}));
      }
    },
    removeProject(state: State, payload: string) {
      if (state.projects.length > 1) {
        if (state.selectedProject == payload) {
          //@ts-ignore
          state.selectedProject = state.projects.find((project: Project) => project.id !== payload).id;
        }
        state.projects = state.projects.filter((project: Project) => project.id !== payload);
      }
    },
    selectProject(state: State, payload: string) {
      state.selectedProject = payload;
    },
    setEditingCitation(state: State, payload: Citation) {
      state.editingCitation = payload;
    },
    setProjectTitle(state: State, payload: string) {
      //@ts-ignore
      state.projects.find((project: Project) => project.id == state.selectedProject).title = payload;
    },
    setProjectStyle(state: State, payload: Style) {
      //@ts-ignore
      state.projects.find((project: Project) => project.id == state.selectedProject).style = payload;
    },
    setProjects(state: State, payload: Project[]) {
      state.projects = payload;
    },
    addFavoriteStyle(state: State, payload: Style) {
      state.favoriteStyles = state.favoriteStyles.filter((style: Style) => style.value !== payload.value);
      state.favoriteStyles = state.favoriteStyles.filter((style: Style) => style.value !== payload.value).concat([payload]);
    },
    removeFavoriteStyle(state: State, payload: string) {
      state.favoriteStyles = state.favoriteStyles.filter((style: Style) => style.value !== payload);
    }
  },
  actions: {
    saveState({state}) {
      localState.setItem('state', state)
      .catch(function (error) {
        if (process.env.NODE_ENV == 'dev') {
          console.log(error);
        }
      });
    },
    setMessage(context: any, payload: any) {
      context.commit('setMessage', payload);
    },
    addCitation(context: any, payload: Citation) {
      context.commit('addCitation', payload);
      context.dispatch('saveState');
    },
    removeCitation(context: any, payload: string) {
      context.commit('removeCitation', payload);
      context.dispatch('saveState');
    },
    resetCitations(context: any, payload: string) {
      context.commit('resetCitations', payload);
      context.dispatch('saveState');
    },
    setLocale(context: any, payload: Locale) {
      context.commit('setLocale', payload);
      context.dispatch('saveState');
    },
    addProject(context: any, payload: Project) {
      context.commit('addProject', payload);
      context.dispatch('saveState');
    },
    removeProject(context: any, payload: string) {
      context.commit('removeProject', payload);
      context.dispatch('saveState');
    },
    selectProject(context: any, payload: string) {
      context.commit('selectProject', payload);
      context.dispatch('saveState');
    },
    setProjects(context: any, payload: Project[]) {
      context.commit('setProjects');
    },
    setEditingCitation(context: any, payload: Citation) {
      context.commit('setEditingCitation', payload);
    },
    setProjectTitle(context: any, payload: string) {
      context.commit('setProjectTitle', payload);
      context.dispatch('saveState');
    },
    setProjectStyle(context: any, payload: Style) {
      context.commit('setProjectStyle', payload);
      context.dispatch('saveState');
    },
    addFavoriteStyle(context: any, payload: Style) {
      context.commit('addFavoriteStyle', payload);
      context.dispatch('saveState');
    },
    removeFavoriteStyle(context: any, payload: string) {
      context.commit('removeFavoriteStyle', payload);
      context.dispatch('saveState');
    },
    resetProjects(context: any) {
      context.commit('resetProjects');
      context.dispatch('saveState');
    },
    resetProject(context: any, payload: string) {
      context.commit('resetProjects', payload);
      context.dispatch('saveState');
    },
  },
  getters: {
    getMessage(state: State) {
      return state.message;
    },
    getEditingCitation(state: State) {
      return state.editingCitation;
    },
    getProjects(state: State) {
      return state.projects;
    },
    getProjectById: (state: State) => (id: string) => {
      return state.projects.find((project: Project) => project.id == id);
    },
    getFavoriteStyles(state: State) {
      return state.favoriteStyles;
    },
    getSelectedProject(state: State) {
      return state.projects.find((project: Project) => project.id == state.selectedProject);
    },
    getLocale(state: State) {
      return state.locale;
    },
    getProjectStyle(state: State) {
      //@ts-ignore
      return state.projects.find((project: Project) => project.id == state.selectedProject).style;
    },
    getProjectCitations(state: State) {
      //@ts-ignore
      return state.projects.find((project: Project) => project.id == state.selectedProject).citations;
    }
  }
})
