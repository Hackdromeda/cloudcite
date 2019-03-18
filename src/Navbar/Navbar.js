import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PullTab from '../Settings/PullTab'
import './_navbar.scss';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPull: false
    }
  }

  setShowPull(value) {
    this.setState({showPull: value});
  }

  navigateTo(url) {
    this.props.history.push(url);
  }

  render() {
    return (
      <div>
        <div id="navbar" className="nav">
          <a id="nav-logo" className="page closeHam current" onClick={() => this.navigateTo('/')}>CloudCite</a>
          <a id="projects-link" className="page closeHam" onClick={() => this.navigateTo('/projects')}>Projects</a>
          <a href="https://api.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">API</a>
          <a href="https://cloudcite.net/blog" target="_blank" className="closeHam" rel="noopener noreferrer">Blog</a>
          <a href="https://status.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">Status</a>
          <a href="https://help.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">Help</a>
          <a href="https://feedback.cloudcite.net/" target="_blank" className="closeHam" rel="noopener noreferrer">Feedback</a>
          <a href="https://github.com/Hackdromeda/cloudcite/" target="_blank" className="closeHam" rel="noopener noreferrer">Contribute</a>
          <a id="quick-settings" className={this.state.showPull ? "nav-right active" : "nav-right"} onClick={() => this.state.showPull ? this.setShowPull(!this.state.showPull) : this.setShowPull(!this.state.showPull)}><Icon className="cog" /></a>
          <a id="burger" className="nav-right"><Icon className="hamMenu bars" /></a>
        </div>
          <PullTab visible={this.state.showPull} />
          <div className={this.state.showPull ? "darkness active" : "darkness"}></div>
      </div>
    );
  }
}

export default withRouter(Navbar);