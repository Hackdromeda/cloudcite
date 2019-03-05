import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './_navbar.scss';

class Navbar extends Component {

  navigateTo(url) {
    this.props.history.push(url);
  }

  render() {
    return (
      <div id="navbar" className="nav">
        <a className="page closeHam current" onClick={() => this.navigateTo('/')}>CloudCite</a>
        <a className="page closeHam" onClick={() => this.navigateTo('/projects')}>Projects</a>
        <a href="https://api.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">API</a>
        <a href="https://cloudcite.net/blog" target="_blank" className="closeHam" rel="noopener noreferrer">Blog</a>
        <a href="https://status.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">Status</a>
        <a href="https://help.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">Help</a>
        <a href="https://feedback.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">Feedback</a>
        <a href="https://github.com/Hackdromeda/cloudcite/" target="_blank" className="closeHam" rel="noopener noreferrer">Contribute</a>
        <a className="page closeHam" onClick={() => this.navigateTo('/settings')}>Settings</a>
        <a id="burger"><Icon className="hamMenu bars" /></a>
      </div>
    );
  }
}

export default withRouter(Navbar);