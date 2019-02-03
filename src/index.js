import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import * as serviceWorker from './serviceWorker';
import { Menu } from 'semantic-ui-react'
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
    <Provider store={store}>
        <Router>
            <div>
                <Menu>
                    <Link to="/">
                        <Menu.Item header>
                            <div className="navbar-title">CloudCite</div>
                        </Menu.Item>
                    </Link>
                    <Link to="/projects" className="navbar-link">
                        <Menu.Item name='Projects'/>
                    </Link>
                    <a href="https://api.cloudcite.net/" target="_blank" className="navbar-link" rel="noopener noreferrer">
                        <Menu.Item name='API'/>
                    </a>
                    <a href="https://cloudcite.net/blog" target="_blank" className="navbar-link" rel="noopener noreferrer">
                        <Menu.Item name='Blog'/>
                    </a>
                    <a href="https://status.cloudcite.net/" target="_blank" className="navbar-link" rel="noopener noreferrer">
                        <Menu.Item name='Status'/>
                    </a>
                    <a href="https://help.cloudcite.net/" target="_blank" className="navbar-link" rel="noopener noreferrer">
                        <Menu.Item name='Help'/>
                    </a>
                    <a href="https://feedback.cloudcite.net/" target="_blank" className="navbar-link" rel="noopener noreferrer">
                        <Menu.Item name='Feedback'/>
                    </a>
                    <a href="https://github.com/Hackdromeda/cloudcite/" target="_blank" className="navbar-link" rel="noopener noreferrer">
                        <Menu.Item name='Contribute'/>
                    </a>
                </Menu>
                <Switch>
                    <Route path="/" exact component={loadingComponent(App)} />
                    <Route path="/projects" component={loadingComponent(Projects)}/>
                </Switch>
            </div>
        </Router>
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.register();
