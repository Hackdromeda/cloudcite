import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './App.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

class App extends Component {
  render() {
    return (
      <div className="App">
        <a
            href="https://cloudcite.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit CloudCite
          </a>
          <div><Link to="/projects">Projects</Link></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
