import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import Navbar from "./Navbar/Navbar";

ReactDOM.render(
    <Provider store={store}>
        <Navbar/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();