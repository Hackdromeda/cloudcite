import React, { lazy, Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
// import './navbar.scss';

const App = lazy(() => import("../App.js"));
const Projects = lazy(() => import('../Projects/Projects.js'));
const CiteForm = lazy(() => import('../CiteForm/CiteForm.js'));
const EditForm = lazy(() => import('../EditForm/EditForm.js'));
const WebsiteAutofill = lazy(() => import('../WebsiteAutofill/WebsiteAutofill.js'));
const Settings = lazy(() => import('../Settings/Settings.js'));

function loadingComponent(Component) {
  return props => (
    <Suspense fallback={<div />}>
      <Component {...props} />
    </Suspense>
  );
}

function Navbar() {

  return (
    <Router>
      <Fragment>
        <div id="navbar" className="nav">
          <Link className="page closeHam current" to="/">CloudCite</Link>
          <Link className="page closeHam" to="/projects">Projects</Link>
          <a href="https://api.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">API</a>
          <a href="https://cloudcite.net/blog" target="_blank" className="closeHam" rel="noopener noreferrer">Blog</a>
          <a href="https://status.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">Status</a>
          <a href="https://help.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">Help</a>
          <a href="https://feedback.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">Feedback</a>
          <a href="https://github.com/Hackdromeda/cloudcite/" target="_blank" className="closeHam" rel="noopener noreferrer">Contribute</a>
          <Link className="page closeHam" to="/settings">Settings</Link>
          <a id="burger"><Icon className="hamMenu bars" /></a>
        </div>
        <Switch>
          <Route path="/" exact component={loadingComponent(App)} />
          <Route path="/projects" component={loadingComponent(Projects)} />
          <Route path="/cite" component={loadingComponent(CiteForm)} />
          <Route path="/edit" component={loadingComponent(EditForm)} />
          <Route path="/website" component={loadingComponent(WebsiteAutofill)} />
          <Route path="/settings" component={loadingComponent(Settings)} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default Navbar;