import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const saveState = (state) => {
  window.localStorage.setItem('cloudcite_state', JSON.stringify(state));
}

const loadState = window.localStorage.getItem('cloudcite_state') ? JSON.parse(window.localStorage.getItem('cloudcite_state')) : {};



export const store = createStore(
  rootReducer,
  loadState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
 );

store.subscribe(() => {
  saveState(store.getState());
});