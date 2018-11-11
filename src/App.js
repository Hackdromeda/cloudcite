import React, { Component, Suspense } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
const Bibliography = React.lazy(() => import('./components/Bibliography/Bibliography'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy/PrivacyPolicy'));

const Home = () => (
  <Suspense fallback={<div></div>}>
    <Bibliography></Bibliography>
  </Suspense>
)

const PrivacyPolicyPage = () => (
  <Suspense fallback={<div></div>}>
    <PrivacyPolicy></PrivacyPolicy>
  </Suspense>
)

class App extends Component {
  render() {
    return (
      <div className="CloudCite">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <Route exact={true} path="/" component={Home}/>
        <Route exact={true} path="/privacy" component={PrivacyPolicyPage}/>
      </div>
    );
  }
}

export default App;
