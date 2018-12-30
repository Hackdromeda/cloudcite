import * as StoreActions from '../actions/projects.actions';
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
    key: "locales-en-US",
    value: "English (US)",
  },
  editingCitation: null,
  favoriteStyles: [
    {"key":"modern-language-association","value":"Modern Language Association 8th edition (MLA)"},
    {"key": "apa","value": "American Psychological Association 6th edition (APA)"},
    {"key":"chicago-note-bibliography","value":"Chicago Manual of Style 17th edition (note)"},
    {"key":"turabian-fullnote-bibliography","value":"Turabian 8th edition (full note)"},
    {"key":"ieee","value":"IEEE"},
    {"key":"elsevier-harvard","value":"Elsevier - Harvard (with titles)"},
    {"key":"american-medical-association","value":"American Medical Association (AMA)"},
    {"key":"american-sociological-association","value":"American Sociological Association (ASA)"},
    {"key":"vancouver","value":"Vancouver"}
  ],
  projects: [
    {
      "id": projectId,
      "title": "Starter Project",
      "citations": [],
      "style": {
        "key":"modern-language-association",
        "value":"Modern Language Association 8th edition (MLA)"
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
    case StoreActions.ADD_FAVORITE_STYLE:
      return Object.assign(state, {favoriteStyles: state.favoriteStyles.filter(style => style.key !== action.payload.key).concat([action.payload])});
    case StoreActions.REMOVE_FAVORITE_STYLE:
      return Object.assign(state, {favoriteStyles: state.favoriteStyles.filter(style => style.key !== action.payload.key)});
    default:
      return state;
  }
}