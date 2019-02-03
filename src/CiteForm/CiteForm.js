import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { types } from './types.js';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

class CiteForm extends Component {

  buildForm(typeMap) {
    console.log(typeMap);
  }

  async handleChange(e, { value }) {
    try {
      const typeMap = await fetch(`https://cdn.cloudcite.net/maps/${value}.json`)
                              .then((response) => {
                                return response.json();
                              });
      this.buildForm(typeMap);
      
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
    	<div>
     		<Dropdown placeholder="Other" selection search options={types.map((type, index) => Object.assign(type, {key: index}))} onChange={(e, value) => this.handleChange(e, value)}/>
        <div ref="citationForm"/>
     	</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CiteForm);
