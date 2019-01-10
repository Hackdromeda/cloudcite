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

export const SET_STYLE = (PROJECT_ID, STYLE) => dispatch => {
   dispatch({
      type: 'SET_STYLE',
      payload: {
         id: PROJECT_ID,
         style: STYLE
      }
   });
}



