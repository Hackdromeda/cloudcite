import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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