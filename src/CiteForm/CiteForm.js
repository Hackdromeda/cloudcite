import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ADD_CITATION } from '../actions/projects';
import { SET_CITATION_SAVE_MODE } from '../actions/citationSaveMode';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';
import { types } from './types.js';
import './CiteForm.css';
import { createCitation } from '../functions/createCitation.js';
import { withRouter } from 'react-router-dom';
import ContributorFormBuilder from './ContributorFormBuilder.js';
import DateAccessedFormBuilder from './DateAccessedFormBuilder.js';
import DateIssuedFormBuilder from './DateIssuedFormBuilder.js';
import Preview from '../Preview/Preview.js';

const mapStateToProps = state => ({
  selectedProject: state.projectsReducer.selectedProject,
  citationSaveMode: state.citationSaveModeReducer.citationSaveMode
});

const mapDispatchToProps = dispatch => ({
  ADD_CITATION: (id, citation) => dispatch(ADD_CITATION(id, citation)),
  SET_CITATION_SAVE_MODE: (payload) => dispatch(SET_CITATION_SAVE_MODE(payload))
});

class CiteForm extends Component {
  constructor(props) {
    super(props);
    this.addContributor = this.addContributor.bind(this);
    this.removeContributor = this.removeContributor.bind(this);
    this.changeDateAccessed = this.changeDateAccessed.bind(this);
    this.removeDateAccessed = this.removeDateAccessed.bind(this);
    this.setDateAccessedToday = this.setDateAccessedToday.bind(this);
    this.changeDateIssued = this.changeDateIssued.bind(this);
  }

  state = {
    typeMap: [],
    citation: createCitation(),
    contributorTypes: [
            {
                "text": "Author",
                "value": "Author"
            },
            {
                "text": "Editor",
                "value": "Editor"
            },
            {
                "text": "Translator",
                "value": "Translator"
            }
      ]
  }

  cancelCitation() {
    this.props.history.push('/');
  }

  saveCitation() {
    if (this.props.citationSaveMode === 'ADD') {
      this.props.ADD_CITATION(this.props.selectedProject, this.state.citation);
    }
    else {
      this.props.SET_CITATION_SAVE_MODE('ADD');
    }
    this.props.history.push('/');
  }

  addContributor() {
    this.setState({
      citation: {
        ...this.state.citation,
        contributors: [...this.state.citation.contributors, {given: '', middle: '', family: '', type: 'Author'}]
      }
    })
  }

  removeContributor(index) {
    if (this.state.citation.contributors.length <= 1) {
      this.setState({
        citation: {
          ...this.state.citation,
          contributors: [{given: '', middle: '', family: '', type: 'Author'}]
        }
      })
    }
    else {
      this.setState({
        citation: {
          ...this.state.citation,
          contributors: this.state.citation.contributors.filter((contributor, i) => i !== index)
        }
      });
    }
  }

  changeDateAccessed(e, field, { value }) {
    this.setState({
      citation: {
        ...this.state.citation,
        accessed: {
          ...this.state.citation.accessed,
          [field]: value
        }
      }
    });
  }

  removeDateAccessed() {
    this.setState({
      citation: {
        ...this.state.citation,
        accessed: {
          month: "",
          day: "",
          year: ""
        }
      }
    });
  }

  setDateAccessedToday() {
    let currentDate = new Date();
    this.setState({
      citation: {
        ...this.state.citation,
        accessed: {
          month: currentDate.getMonth() + 1,
          day: currentDate.getDate(),
          year: currentDate.getFullYear()
        }
      }
    })
  }

  changeDateIssued(e, field, { value }) {
    this.setState({
      citation: {
        ...this.state.citation,
        issued: {
          ...this.state.citation.issued,
          [field]: value
        }
      }
    });
  }

  setCSLValue(e, cslKey, { value }) {
    this.setState({
      citation: {
        ...this.state.citation,
        [cslKey]: value
      }
    });
  }

  async handleChange(e, { value }) {
    try {
      if (localStorage.getItem(`cloudcite_typemap_${value}`)) {
        const typeMap = JSON.parse(localStorage.getItem(`cloudcite_typemap_${value}`));
        this.setState({
          typeMap: typeMap
        });
      }
      else {
        const typeMap = await fetch(`https://cdn.cloudcite.net/maps/${value}.json`)
                              .then((response) => {
                                return response.json();
                              });
        localStorage.setItem(`cloudcite_typemap_${value}`, JSON.stringify(typeMap));
        this.setState({
          typeMap: typeMap
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
    	<div id="citeForm">
        <div style={{textAlign: 'center'}}>
     		 <Dropdown style={{marginBottom: '10px'}} placeholder="Select" selection search options={types.map((type, index) => Object.assign(type, {key: index}))} onChange={(e, value) => this.handleChange(e, value)}/>
        </div>
        <Form>
        {
          this.state.typeMap.length > 0 ? (
            <div>
              <Form.Field>
              <Dropdown lazyLoad selection label="Contributor" placeholder="Author" options={this.state.contributorTypes}/>
              </Form.Field>
              {this.state.citation.contributors.map((contributor, index) =>
                <div key={index} style={{marginTop: '10px'}}>
                  <ContributorFormBuilder index={index} contributor={contributor} removeContributor={this.removeContributor} addContributor={this.addContributor}/>
                </div>
              )}
              <div style={{marginTop: '15px'}}/>
              <DateAccessedFormBuilder accessed={this.state.citation.accessed} changeDateAccessed={this.changeDateAccessed} removeDateAccessed={this.removeDateAccessed} setDateAccessedToday={this.setDateAccessedToday}/>
              <div style={{marginTop: '15px'}}/>
              <DateIssuedFormBuilder issued={this.state.citation.issued} changeDateIssued={this.changeDateIssued}/>
              <div style={{marginTop: '15px'}}/>
            </div>
          ): <div/>
        }
          {this.state.typeMap.filter(element => element.csl && element.csl !== '' && element.UI && element.UI !== '' && !element.group)
            .map((field, index) => 
              <Form.Field key={field.csl}>
                <Input label={field.UI ? field.UI: ''} placeholder={field.UI ? field.UI: ''} onChange={(e, value) => this.setCSLValue(e, field.csl, value)}/>
              </Form.Field>
          )}
          <div style={{marginTop: '15px'}}/>
          <Preview citation={[this.state.citation]}/>
          {
            this.state.typeMap.length > 0 ? (
              <Button.Group style={{marginTop: '15px'}}>
                <Button onClick={(e) => this.cancelCitation()}>Cancel</Button>
                <Button.Or />
                <Button style={{backgroundColor: '#005eea', color: '#ffffff'}} onClick={(e) => this.saveCitation()}>Save</Button>
              </Button.Group>
            ): <div/>
          }
        </Form>
     	</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CiteForm));
