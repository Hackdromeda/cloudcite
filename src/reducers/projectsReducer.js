const crypto = require('crypto');
let projectId = crypto.randomBytes(20).toString('hex');

const initialState = {
    selectedProject: projectId,
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

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            return { ...state, projects: state.projects.concat(action.payload) };
        case 'DELETE_PROJECT':
            return { ...state, projects: state.projects.filter(project => project.id !== action.payload) };
        case 'SELECT_PROJECT':
            return { ...state, selectedProject: action.payload };
        case 'RESET_PROJECTS':
            let projectId = crypto.randomBytes(20).toString('hex');
            return { 
                ...state, 
                selectedProject: projectId, 
                projects: [
                    {
                        "id": projectId,
                        "title": "New Project",
                        "citations": [],
                        "style": state.favoriteStyles[0]
                    }
                ]
            };
        case 'ADD_CITATION':
            return { 
                ...state, projects: state.projects.filter(project => project.id !== state.selectedProject).concat({...state.projects.find(project => project.id === action.payload.id), citations: state.projects.find(project => project.id === action.payload.id).citations.concat(action.payload.citation)})
            };
        case 'SET_STYLE':
            return { ...state, projects: state.projects.filter(project => project.id !== state.selectedProject).concat([Object.assign(state.projects.find(project => project.id === action.payload.id), {style: action.payload.style})])};
        
    default:
        return state
    }
}