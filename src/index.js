import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Projects from './Projects/Projects';

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <div>
                <Route path="/" exact component={App} />
                <Route path="/projects" component={Projects}/>
            </div>
        </Router>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
