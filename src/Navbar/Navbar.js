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
        {/* <Link className="settingsLink" to="/settings" onClick={() => setTimeout(() => setShowPull(!showPull), 300)}><Icon id="settingsIcon" name="cog" /></Link> */}
          <a className="settingsLink" onClick={() => this.state.showPull ? this.setShowPull(!this.state.showPull) : setTimeout(() => this.setShowPull(!this.state.showPull), 300)}><Icon id="settingsIcon" name="cog" /></a>
          {/* FIXME: Bibliography re-renders when pullTab is toggled?! */}
          <PullTab visible={this.state.showPull} />
          <div className={this.state.showPull ? "pullMenu" : "pullMenu active"}></div>
          <div className={this.state.showPull ? "darkness active" : "darkness"}></div>
      </div>
    );
  }
}

export default withRouter(Navbar);