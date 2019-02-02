import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Bibliography from './Bibliography/Bibliography.js';
import LocaleSearch from './LocaleSearch/LocaleSearch.js';
import StyleSearch from './StyleSearch/StyleSearch.js';
import { Divider, Button } from 'semantic-ui-react';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

var EXPERIMENT_DATA = [{"id":"citation-0","type":"webpage","URL":"cloudcite.net","contributors":[{"given":"Naval","middle":"","family":"Patel","type":"Author"}],"source":null,"archive":null,"archive_location":null,"call-number":null,"container-title":"CloudCite","dimensions":null,"edition":null,"ISBN":null,"medium":null,"number-of-volumes":null,"number-of-pages":null,"volume":null,"title":"CloudCite · The Best Free Automatic Bibliography Generator · MLA, APA, Chicago, Harvard Citation Styles","title-short":null,"genre":null,"publisher":null,"publisher-place":null,"issued":{"month":8,"day":10,"year":2018},"accessed":{"month":9,"day":19,"year":2018},"abstract":"CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago."},{"id":"citation-1","type":"webpage","URL":"bugbrowser.net","contributors":[{"given":"Avi","middle":"","family":"Shah","type":"Author"}],"source":null,"archive":null,"archive_location":null,"call-number":null,"container-title":"Bug Browser","dimensions":null,"edition":null,"ISBN":null,"medium":null,"number-of-volumes":null,"number-of-pages":null,"volume":null,"title":"Bug Browser ","title-short":null,"genre":null,"publisher":null,"publisher-place":null,"accessed":{"month":1,"day":20,"year":2019}}];

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
            <div style={{padding: '5vh'}}>
              <h1>Welcome to CloudCite</h1>
              <p>CloudCite processes citations in the cloud so you never have to create citations manually again.</p>
              <div style={{textAlign: 'center'}}>
                <Button id="citeButton">Website</Button>
                <Button id="citeButton">Book</Button>
                <Button id="citeButton">Film</Button>
              </div>
            </div>
            <Divider/>
            <Bibliography citation={EXPERIMENT_DATA}/>
          </div>
          <LocaleSearch/>
          <StyleSearch/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
