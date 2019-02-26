import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './App.scss';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
const Bibliography = React.lazy(() => import('./Bibliography/Bibliography.js'));

const mapStateToProps = state => ({
  selectedProject: state.projectsReducer.selectedProject,
  projects: state.projectsReducer.projects
});

const mapDispatchToProps = dispatch => ({

});

class App extends Component {

  cite(type) {
    switch (type) {
      case "webpage":
        this.props.history.push('/website');
        break;
      case "book":
        this.props.history.push('/book');
        break;
      case "other":
        this.props.history.push('/cite');
        break;
      default: this.props.history.push('/cite');
    }
  }
  citeOther() {
    this.props.history.push('/cite');
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ backgroundColor: 'rgb(0, 94, 234)', color: '#ffffff', minHeight: '35vh', marginBottom: '5vh' }}>
          <div className="container">
            <div style={{ paddingLeft: '5vh', paddingRight: '5vh', paddingTop: '10vh', paddingBottom: '10vh' }}>
              <h1>Welcome to CloudCite</h1>
              <p>CloudCite processes citations in the cloud so you never have to create citations manually again.</p>
              <div style={{ textAlign: 'center' }}>
                <Button id="citeButton" onClick={(e) => this.cite("webpage")}>Website</Button>
                <Button id="citeButton" onClick={(e) => this.cite("book")}>Book</Button>
                <Button id="citeButton">Film</Button>
                <Button id="citeButton" onClick={(e) => this.cite("other")}>Other</Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Bibliography citations={this.props.projects.find((project) => project.id === this.props.selectedProject).citations} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
