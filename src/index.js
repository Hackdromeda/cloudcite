import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import './index.css';
const App = lazy(() => import("./App.js"));
const Projects = lazy(() => import('./Projects/Projects.js'));

function loadingComponent(Component) {
    return props => (
      <Suspense fallback={<div></div>}>
        <Component {...props} />
      </Suspense>
    );
}

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <Switch>
                <Route path="/" exact component={loadingComponent(App)} />
                <Route path="/projects" component={loadingComponent(Projects)}/>
            </Switch>
        </Router>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
