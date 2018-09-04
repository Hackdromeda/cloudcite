import Vue from 'vue';
import Vuex from 'vuex';
//@ts-ignore
import _ from 'lodash';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "selectedProject": 0,
    "editingCitation": null,
    "favoriteStyles": [{"key":"modern-language-association","text":"Modern Language Association 8th edition (MLA)","value":"modern-language-association"},{"key":"apa","text":"American Psychological Association 6th edition (APA)","value":"apa"},{"key":"chicago-note-bibliography","text":"Chicago Manual of Style 17th edition (note)","value":"chicago-note-bibliography"},{"key":"turabian-fullnote-bibliography","text":"Turabian 8th edition (full note)","value":"turabian-fullnote-bibliography"},{"key":"ieee","text":"IEEE","value":"ieee"},{"key":"elsevier-harvard","text":"Elsevier - Harvard (with titles)","value":"elsevier-harvard"},{"key":"american-medical-association","value":"american-medical-association","text":"American Medical Association (AMA)"},{"key":"american-sociological-association","text":"American Sociological Association (ASA)","value":"american-sociological-association"},{"key":"vancouver","text":"Vancouver","value":"vancouver"}],
    "message": {
      "type": null,
      "description": null
    },
    "themes": {
      "light": {
        "primaryColor": "color: #005eea;",
        "informationColor": "color: #000;",
        "backgroundColor": "background-color: #fff;",
        "button": {
          "backgroundColor": "background-color: #006dfc;",
          "textColor": "color: #fff;"
        },
        "secondary-button": {
          "backgroundColor": "background-color: #006dfc;",
          "textColor": "color: #fff;"
        },
        "tab-inactive": {
          "backgroundColor": "background-color: #f5f5f5;",
          "textColor": "color: #005eea;",
          "borderBottom": "border-bottom: 3px solid #0036b7;"
        },
        "tab-active": {
          "backgroundColor": "background-color: #f5f5f5;",
          "textColor": "color: #005eea;",
          "borderBottom": "border-bottom: 3px solid #fff;"
        },
        "section": {
          "backgroundColor": "background-color: #005eea;",
          "textColor": "color: #fff;"
        },
        "navbar": {
          "textColor": "color: #424242;",
          "backgroundColor": "background-color: #fff;"
        },
        "banner": {
          "textColor": "color: #fff;",
          "backgroundColor": "background-color: #0036b7;"
        },
        "title": {
          "textColor": "color: #005eea;",
          "fontSize": "font-size: 1.5rem;",
          "fontWeight": "font-weight: 600;",
        },
        "textColor": "color: #000;"
      },
      "dark": {
        "primaryColor": "color: #000;",
        "informationColor": "color: #000;",
        "backgroundColor": "background-color: #b0bec5;",
        "button": {
          "backgroundColor": "background-color: #4b636e;",
          "textColor": "color: #fff;"
        },
        "secondary-button": {
          "backgroundColor": "background-color: #4b636e;",
          "textColor": "color: #fff;"
        },
        "tab-inactive": {
          "backgroundColor": "background-color: #4b636e;",
          "textColor": "color: #fff;",
          "borderBottom": "border-bottom: 3px solid #f5f5f5;"
        },
        "tab-active": {
          "backgroundColor": "background-color: #4b636e;",
          "textColor": "color: #fff;",
          "borderBottom": "border-bottom: 3px solid #b0bec5;"
        },
        "section": {
          "backgroundColor": "background-color: #212121;",
          "textColor": "color: #fff;"
        },
        "navbar": {
          "textColor": "color: #757575;",
          "backgroundColor": "background-color: #1b1b1b;"
        },
        "banner": {
          "textColor": "color: #fff;",
          "backgroundColor": "background-color: #424242;"
        },
        "title": {
          "textColor": "color: #fff;",
          "fontSize": "font-size: 1.5rem;",
          "fontWeight": "font-weight: 600;"
        },
        "textColor": "color: #fff;"
      }
    },
    "selectedTheme": "light",
    "projects": [
      {
        "id": "Project-0",
        "title": "Project 1",
        "citations": [],
        "style": "modern-language-association",
        "locale": "locales-en-US",
        "cachedBibliography": {outdated: true}
      }
    ],
  },
  mutations: {
    setTheme(state: any, payload: any) {
      switch (payload) {
        case 'light':
          state.selectedTheme = 'light';
          break;
        case 'dark':
          state.selectedTheme = 'dark';
          break;
      }
    },
    changeTheme(state: any) {
      switch (state.selectedTheme) {
        case 'light':
          state.selectedTheme = 'dark';
          break;
        case 'dark':
          state.selectedTheme = 'light';
          break;
      }
    },
    setMessage(state: any, payload: any) {
      state.message = payload
    },
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
      //@ts-ignore
      var cloudciteStorageString: string = localStorage.getItem('cloudcite');
      if (cloudciteStorageString) {
        var cloudciteStorage = JSON.parse(cloudciteStorageString);
        state.selectedProject = cloudciteStorage.selectedProject;
        state.favoriteStyles = cloudciteStorage.favoriteStyles;
        state.projects = cloudciteStorage.projects;
        state.message = cloudciteStorage.message;
        state.themes = cloudciteStorage.themes;
        state.selectedTheme = cloudciteStorage.selectedTheme;
      }
    },
    setProjectLocale(state: any, payload: any) {
      for (let i=0; i < state.projects.length; i++) {
        if (state.projects[i].id == payload.id && payload.locale != '' && payload.locale != null) {
          state.projects[i].locale = payload.locale
        }
      }
    },
    selectProject(state: any, payload: number) {
      state.selectedProject = payload
    },
    removeProject(state: any, payload: number) {
      var firstProjects = state.projects.slice(0, payload)
      var lastProjects = state.projects.slice(payload + 1, state.projects.length)
      for (let i=0; i < lastProjects.length; i++) {
        lastProjects[i].id = "Project-" + (parseInt(lastProjects[i].id.substring((lastProjects[i].id.indexOf('-') + 1))) - 1)
      }
      state.projects = firstProjects.concat(lastProjects)
      if (state.selectedProject == payload) {
        state.selectedProject = 0
      }
    },
    saveState(state: any) {
      localStorage.setItem('cloudcite', JSON.stringify({selectedProject: state.selectedProject, projects: state.projects, favoriteStyles: state.favoriteStyles, message: state.message, themes: state.themes, selectedTheme: state.selectedTheme}));
    },
    setEditingCitation(state: any, payload: any) {
      state.editingCitation = payload
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
    cacheBibliography(state: any, payload: any) {
      state.projects[state.selectedProject].cachedBibliography = payload
    },
    addFavoriteStyle(state: any, payload: any) {
      state.favoriteStyles.unshift(payload)
    },
    removeFavoriteStyle(state: any, payload: any) {
      //@ts-ignore
      state.favoriteStyles = state.favoriteStyles.filter(style => style.key !== payload.key)
    }
  },
  actions: {
    changeTheme(context: any) {
      context.commit('changeTheme')
      context.commit('saveState')
    },
    setTheme(context: any, payload: any) {
      context.commit('setTheme', payload)
      context.commit('saveState')
    },
    setMessage(context: any, payload: any) {
      context.commit('setMessage', payload)
      context.commit('saveState')
    },
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
    setProjectLocale(context: any, payload: any) {
      context.commit('setProjectLocale', payload)
      context.commit('saveState')
    },
    selectProject(context: any, payload: number) {
      context.commit('selectProject', payload)
      context.commit('saveState')
    },
    removeProject(context: any, payload: number) {
      context.commit('removeProject', payload)
      context.commit('saveState')
    },
    setEditingCitation(context: any, payload: any) {
      context.commit('setEditingCitation', payload)
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
    cacheBibliography(context: any, payload: any) {
      context.commit('cacheBibliography', payload)
      context.commit('saveState')
    },
    addFavoriteStyle(context: any, payload: any) {
      context.commit('addFavoriteStyle', payload)
      context.commit('saveState')
    },
    removeFavoriteStyle(context: any, payload: any) {
      context.commit('removeFavoriteStyle', payload)
      context.commit('saveState')
    }
  },
  getters: {
    getEditingCitation(state: any) {
      return state.editingCitation
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
    getFavoriteStyles(state: any) {
      return state.favoriteStyles
    },
    getMessage(state: any) {
      return state.message
    },
    getTheme(state: any) {
      return state.themes[state.selectedTheme]
    }
  }
})
