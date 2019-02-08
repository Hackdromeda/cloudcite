import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import * as serviceWorker from './serviceWorker';
// import { Menu } from 'semantic-ui-react'
import './index.scss';
import Navbar from "./Navbar/Navbar";

ReactDOM.render(
    <Provider store={store}>
        <Navbar/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();