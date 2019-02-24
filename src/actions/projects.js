export const CREATE_PROJECT = (PROJECT) => dispatch => {
   dispatch({
      type: 'CREATE_PROJECT',
      payload: PROJECT
   });
}

export const DELETE_PROJECT = (PROJECT_ID) => dispatch => {
   dispatch({
      type: 'DELETE_PROJECT',
      payload: PROJECT_ID
   });
}

export const SELECT_PROJECT = (PROJECT_ID) => dispatch => {
   dispatch({
      type: 'SELECT_PROJECT',
      payload: PROJECT_ID
   });
}

export const RESET_PROJECTS = () => dispatch => {
   dispatch({
      type: 'RESET_PROJECTS',
      payload: null
   });
}

export const ADD_CITATION = (PROJECT_ID, CITATION) => dispatch => {
   dispatch({
      type: 'ADD_CITATION',
      payload: {
         project_id: PROJECT_ID,
         citation: CITATION
      }
   });
}

export const EDIT_CITATION = (PROJECT_ID, CITATION_ID) => dispatch => {
   dispatch({
      type: 'EDIT_CITATION',
      payload: {
         project_id: PROJECT_ID,
         citation_id: CITATION_ID
      }
   });
}

export const UPDATE_CITATION = (PROJECT_ID, CITATION) => dispatch => {
   dispatch({
      type: 'UPDATE_CITATION',
      payload: {
         project_id: PROJECT_ID,
         citation: CITATION
      }
   });
}

export const DELETE_CITATION = (PROJECT_ID, CITATION_ID) => dispatch => {
   dispatch({
      type: 'DELETE_CITATION',
      payload: {
         project_id: PROJECT_ID,
         citation_id: CITATION_ID
      }
   });
}

export const SET_STYLE = (PROJECT_ID, STYLE) => dispatch => {
   dispatch({
      type: 'SET_STYLE',
      payload: {
         id: PROJECT_ID,
         style: STYLE
      }
   });
}



