import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import localeReducer from './localeReducer';
import favoriteStylesReducer from './favoriteStylesReducer';
import citationSaveModeReducer from './citationSaveModeReducer';

export default combineReducers({
    projectsReducer,
    localeReducer, 
    favoriteStylesReducer,
    citationSaveModeReducer
});