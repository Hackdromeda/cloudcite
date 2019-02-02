import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CitationForm.css';
//import Bibliography from './Bibliography/Bibliography.js';
import { Divider, Button } from 'semantic-ui-react';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

class CitationForm extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitationForm);
