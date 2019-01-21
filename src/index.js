import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
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
    <Provider store={configureStore()}>
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

/**
 <Menu>
    <Menu.Item
    name='API'
    active={window.location.href.includes('api')}
    onClick={() => window.open('https://api.cloudcite.net/', '_blank')}
    />
    <Menu.Item
    name='Blog'
    active={window.location.href.includes('blog')}
    onClick={() => window.open('https://cloudcite.net/blog', '_blank')}
    />
    <Menu.Item
    name='Status'
    active={window.location.href.includes('status')}
    onClick={() => window.open('https://status.cloudcite.net/', '_blank')}
    />
    <Menu.Item
    name='Help'
    active={window.location.href.includes('help')}
    onClick={() => window.open('https://help.cloudcite.net/', '_blank')}
    />
    <Menu.Item
    name='Feedback'
    active={window.location.href.includes('feedback')}
    onClick={() => window.open('https://feedback.cloudcite.net/', '_blank')}
    />
    <Menu.Item
    name='Contribute'
    active={window.location.href.includes('contribute')}
    onClick={() => window.open('https://github.com/Hackdromeda/cloudcite/', '_blank')}
    />
</Menu>
 */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
