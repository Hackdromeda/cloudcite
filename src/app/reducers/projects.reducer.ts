import * as StoreActions from '../actions/projects.actions';
import { Action } from '@ngrx/store';
import { State } from '../models/projectState.model';
//import * as localForage from 'localforage';

let projectId: string = window.crypto.getRandomValues(new Uint32Array(3)).join('');
/*export const localState = localForage.createInstance({
  name: 'cloudcite',
  version: 1.0,
  driver: localForage.INDEXEDDB
});*/

export const initialState: State = {
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
  projects: [
    {
      "id": projectId,
      "title": "Starter Project",
      "citations": [],
      "style": {
        "key":"modern-language-association",
        "text":"Modern Language Association 8th edition (MLA)",
        "value":"modern-language-association"
      }
    }
  ]
};

export function projectsReducer(state = initialState, action: StoreActions.Actions) {
  switch (action.type) {
    case StoreActions.SELECT_PROJECT:
      return Object.assign(state, {selectedProject: action.payload});
    case StoreActions.CREATE_PROJECT:
      return Object.assign(state, {projects: state.projects.concat([action.payload])});
    case StoreActions.DELETE_PROJECT:
      return Object.assign(state, {projects: state.projects.filter(project => project.id !== action.payload)});
    case StoreActions.RESET_PROJECTS:
      let projectId: string = window.crypto.getRandomValues(new Uint32Array(3)).join('');
      return Object.assign(state, {selectedProject: projectId, projects: [
        {
          "id": projectId,
          "title": "New Project",
          "citations": [],
          "style": state.favoriteStyles[0]
        }
      ]});
    case StoreActions.SET_STYLE:
      return Object.assign(state, {projects: state.projects.filter(project => project.id !== state.selectedProject).concat([Object.assign(state.projects.find(project => project.id == action.id), {style: action.style})])});
    case StoreActions.SET_LOCALE:
      return Object.assign(state, {locale: action.payload});
    default:
      return state;
  }
}