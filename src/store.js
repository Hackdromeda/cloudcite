import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const saveState = (state) => {
  localStorage.setItem('cloudcite_state', JSON.stringify(state));
}

const loadState = localStorage.getItem('cloudcite_state') ? JSON.parse(localStorage.getItem('cloudcite_state')) : {};



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