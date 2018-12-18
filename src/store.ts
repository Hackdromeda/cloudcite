import Vue from 'vue';
import Vuex from 'vuex';
import { State } from '@/models/state.model';
import { Project } from '@/models/project.model';
import { Locale } from '@/models/locale.model';
import { Style } from '@/models/style.model';
import { Citation } from '@/models/citation.model';
const crypto = require('crypto');

Vue.use(Vuex)

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
      state.projects = state.projects.filter((project: Project) => project.id != state.selectedProject).concat([Object.assign(state.projects.find((project: Project) => project.id == state.selectedProject), {citations: payload})]);
    },
    removeCitation(state: State, payload: string) {
      //@ts-ignore
      state.projects = state.projects.filter((project: Project) => project.id != state.selectedProject).concat([Object.assign(state.projects.find((project: Project) => project.id == state.selectedProject), {citations: state.projects.find((project: Project) => project.id == state.selectedProject).citations.filter((citation: Citation) => citation.id !== payload)})]);
    },
    resetCitations(state: State) {
      state.projects = state.projects.filter((project: Project) => project.id != state.selectedProject).concat([Object.assign(state.projects.find((project: Project) => project.id == state.selectedProject), {citations: []})]);
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
      state.projects = state.projects.concat([Object.assign(payload, {id: crypto.randomBytes(20).toString('hex')})]);
    },
    removeProject(state: State, payload: string) {
      state.projects = state.projects.filter((project: Project) => project.id !== payload);;
    },
    selectProject(state: State, payload: string) {
      state.selectedProject = payload;
    },
    setEditingCitation(state: State, payload: Citation) {
      state.editingCitation = payload
    },
    setProjectTitle(state: State, payload: string) {
      state.projects = state.projects.filter((project: Project) => project.id != state.selectedProject).concat([Object.assign(state.projects.filter((project: Project) => project.id == state.selectedProject)[0], {title: payload})]);
    },
    setProjectStyle(state: State, payload: Style) {
      state.projects = state.projects.filter((project: Project) => project.id != state.selectedProject).concat([Object.assign(state.projects.filter((project: Project) => project.id == state.selectedProject)[0], {style: payload})]);
    },
    addFavoriteStyle(state: State, payload: Style) {
      state.favoriteStyles = state.favoriteStyles.concat([payload]);
    },
    removeFavoriteStyle(state: State, payload: string) {
      state.favoriteStyles = state.favoriteStyles.filter((style: Style) => style.value !== payload)
    }
  },
  actions: {
    setMessage(context: any, payload: any) {
      context.commit('setMessage', payload);
    },
    addCitation(context: any, payload: Citation) {
      context.commit('addCitation', payload);
    },
    removeCitation(context: any, payload: string) {
      context.commit('removeCitation', payload);
    },
    resetCitations(context: any) {
      context.commit('setCitations');
    },
    setLocale(context: any, payload: Locale) {
      context.commit('setLocale', payload);
    },
    addProject(context: any, payload: Project) {
      context.commit('addProject', payload);
    },
    removeProject(context: any, payload: string) {
      context.commit('removeProject', payload);
    },
    selectProject(context: any, payload: string) {
      context.commit('selectProject', payload);
    },
    setEditingCitation(context: any, payload: Citation) {
      context.commit('setEditingCitation', payload);
    },
    setProjectTitle(context: any, payload: string) {
      context.commit('setProjectTitle', payload);
    },
    setProjectStyle(context: any, payload: Style) {
      context.commit('setProjectStyle', payload);
    },
    addFavoriteStyle(context: any, payload: Style) {
      context.commit('addFavoriteStyle', payload);
    },
    removeFavoriteStyle(context: any, payload: string) {
      context.commit('removeFavoriteStyle', payload);
    }
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
