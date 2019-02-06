import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ADD_CITATION } from '../actions/projects';
import { SET_CITATION_SAVE_MODE } from '../actions/citationSaveMode';
import { UPDATE_CREATORS_MAP } from '../actions/creatorsMap';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';
import { types } from './types.js';
import './CiteForm.css';
import { createCitation } from '../functions/createCitation.js';
import { withRouter } from 'react-router-dom';
import ContributorFormBuilder from './ContributorFormBuilder.js';
import DateAccessedFormBuilder from './DateAccessedFormBuilder.js';
import DateIssuedFormBuilder from './DateIssuedFormBuilder.js';
import Preview from '../Preview/Preview.js';
import crypto from 'crypto';

const mapStateToProps = state => ({
  selectedProject: state.projectsReducer.selectedProject,
  citationSaveMode: state.citationSaveModeReducer.citationSaveMode
});

const mapDispatchToProps = dispatch => ({
  ADD_CITATION: (id, citation) => dispatch(ADD_CITATION(id, citation)),
  SET_CITATION_SAVE_MODE: (payload) => dispatch(SET_CITATION_SAVE_MODE(payload)),
  UPDATE_CREATORS_MAP: (creatorsMap) => dispatch(UPDATE_CREATORS_MAP(creatorsMap))
});

class CiteForm extends Component {
  constructor(props) {
    super(props);
    this.addContributor = this.addContributor.bind(this);
    this.removeContributor = this.removeContributor.bind(this);
    this.setContributor = this.setContributor.bind(this);
    this.changeDateAccessed = this.changeDateAccessed.bind(this);
    this.removeDateAccessed = this.removeDateAccessed.bind(this);
    this.setDateAccessedToday = this.setDateAccessedToday.bind(this);
    this.changeDateIssued = this.changeDateIssued.bind(this);
  }

  state = {
    fieldMap: [],
    creatorsMap: [],
    citation: createCitation(null)
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
        contributors: [...this.state.citation.contributors, {key: crypto.randomBytes(10).toString('hex'), given: '', middle: '', family: '', type: 'Author'}]
      }
    })
  }

  removeContributor(key) {
    if (this.state.citation.contributors.length <= 1) {
      this.setState({
        citation: {
          ...this.state.citation,
          contributors: [{key: crypto.randomBytes(10).toString('hex'), given: '', middle: '', family: '', type: 'Author'}]
        }
      })
    }
    else {
      this.setState({
        citation: {
          ...this.state.citation,
          contributors: this.state.citation.contributors.filter((contributor) => contributor.key !== key)
        }
      });
    }
  }

  setContributor(e, key, field, { value }) {
    this.setState({
      citation: {
        ...this.state.citation,
        contributors: this.state.citation.contributors.map((contributor) => contributor.key === key ? {...contributor, [field]: value}: contributor)
      }
    });
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
    const fieldMap = await fetch(`https://cdn.cloudcite.net/fields/${value}.json`)
                          .then((response) => {
                            return response.json();
                          });
    const creatorsMap = await fetch(`https://cdn.cloudcite.net/creators/${value}.json`)
                          .then((response) => {
                            return response.json();
                          });
    this.setState({
      citation: {
        ...this.state.citation,
        type: value
      },
      fieldMap: fieldMap,
      creatorsMap: creatorsMap.map((creator, index) => Object.assign(creator, {"key": creator.index, "text": creator.UI, "value": creator.csl}))
    });
    this.props.UPDATE_CREATORS_MAP(creatorsMap);
  }

  render() {
    return (
    	<div id="citeForm">
        <div style={{textAlign: 'center'}}>
     		 <Dropdown style={{marginBottom: '10px'}} placeholder="Select" selection search options={types.map((type, index) => Object.assign(type, {key: index}))} onChange={(e, value) => this.handleChange(e, value)}/>
        </div>
        <Form>
        {
          this.state.fieldMap.length > 0 ? (
            <div>
              {this.state.citation.contributors.map((contributor, index) =>
                <div key={contributor.key} style={{marginTop: '10px'}}>
                  <ContributorFormBuilder creatorsMap={this.state.creatorsMap} contributor={contributor} removeContributor={this.removeContributor} addContributor={this.addContributor} setContributor={this.setContributor}/>
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
          {this.state.fieldMap.filter(element => element.csl && element.csl !== '' && element.UI && element.UI !== '' && !element.group)
            .map((field, index) => 
              <Form.Field key={field.csl}>
                <Input label={field.UI ? field.UI: ''} placeholder={field.UI ? field.UI: ''} onChange={(e, value) => this.setCSLValue(e, field.csl, value)}/>
              </Form.Field>
          )}
          <div style={{marginTop: '15px'}}/>
          <Preview citations={[this.state.citation]} creatorsMap={this.state.creatorsMap}/>
          {
            this.state.fieldMap.length > 0 ? (
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
