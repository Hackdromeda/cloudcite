import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import * as serviceWorker from './serviceWorker';
import './styles.scss';
import Navbar from "./Navbar/Navbar";

const App = lazy(() => import("./App.js"));
const Projects = lazy(() => import('./Projects/Projects.js'));
const CiteForm = lazy(() => import('./CiteForm/CiteForm.js'));
const EditForm = lazy(() => import('./EditForm/EditForm.js'));
const WebsiteAutofill = lazy(() => import('./WebsiteAutofill/WebsiteAutofill.js'));
const BooksAutofill = lazy(() => import('./BooksAutofill/BooksAutofill.js'));
const FilmsAutofill = lazy(() => import('./FilmsAutofill/FilmsAutofill.js'));

function loadingComponent(Component) {
  return props => (
    <Suspense fallback={<div />}>
      <Component {...props} />
    </Suspense>
  );
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
        	<div>
	        	<Navbar/>
	        	<Switch>
		            <Route exact path="/" component={loadingComponent(App)} />
		            <Route path="/projects" component={loadingComponent(Projects)} />
		            <Route path="/cite" component={loadingComponent(CiteForm)} />
		            <Route path="/edit" component={loadingComponent(EditForm)} />
		            <Route path="/website" component={loadingComponent(WebsiteAutofill)} />
                <Route path="/books" component={loadingComponent(BooksAutofill)} />
                <Route path="/films" component={loadingComponent(FilmsAutofill)} />
	         	</Switch>
         	</div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();