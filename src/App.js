import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Bibliography from './Bibliography/Bibliography.js';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

var EXPERIMENT_DATA = [{"id":"citation-0","type":"webpage","URL":"cloudcite.net","contributors":[{"given":"Naval","middle":"","family":"Patel","type":"Author"}],"source":null,"archive":null,"archive_location":null,"call-number":null,"container-title":"CloudCite","dimensions":null,"edition":null,"ISBN":null,"medium":null,"number-of-volumes":null,"number-of-pages":null,"volume":null,"title":"CloudCite · The Best Free Automatic Bibliography Generator · MLA, APA, Chicago, Harvard Citation Styles","title-short":null,"genre":null,"publisher":null,"publisher-place":null,"issued":{"month":8,"day":10,"year":2018},"accessed":{"month":9,"day":19,"year":2018},"abstract":"CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago."}]

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
            <Bibliography citation={EXPERIMENT_DATA}/>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
