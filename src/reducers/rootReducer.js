import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import localeReducer from './localeReducer';
import favoriteStylesReducer from './favoriteStylesReducer';
import creatorsTypesReducer from './creatorsTypesReducer';
import userPreferencesReducer from './userPreferencesReducer';

export default combineReducers({
    projectsReducer,
    localeReducer, 
    favoriteStylesReducer,
    creatorsTypesReducer,
    userPreferencesReducer
});