import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ADD_CITATION, UPDATE_CITATION } from '../actions/projects';
import { UPDATE_CREATORS_TYPES } from '../actions/creatorsTypes';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';
import { types } from './types.js';
// import './CiteForm.css';
import { createCitation } from '../functions/createCitation.js';
import { withRouter } from 'react-router-dom';
import crypto from 'crypto';
import { generateHTML } from '../functions/generateHTML';
import cloneDeep from 'lodash.clonedeep';

const ContributorFormBuilder = React.lazy(() => import('./ContributorFormBuilder.js'));
const DateAccessedFormBuilder = React.lazy(() => import('./DateAccessedFormBuilder.js'));
const DateIssuedFormBuilder = React.lazy(() => import('./DateIssuedFormBuilder.js'));
const Preview = React.lazy(() => import('../Preview/Preview.js'));

const mapStateToProps = state => ({
  style: state.projectsReducer.projects.find((project) => project.id === state.projectsReducer.selectedProject).style,
  locale: state.localeReducer.locale.value,
  selectedProject: state.projectsReducer.selectedProject,
  projects: state.projectsReducer.projects
});

const mapDispatchToProps = dispatch => ({
  ADD_CITATION: async (project_id, citation) => dispatch(ADD_CITATION(project_id, citation)),
  UPDATE_CITATION: async (project_id, citation) => dispatch(UPDATE_CITATION(project_id, citation)),
  UPDATE_CREATORS_TYPES: async (creatorsMap) => dispatch(UPDATE_CREATORS_TYPES(creatorsMap)),
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
    this.removeDateIssued = this.removeDateIssued.bind(this);
    this.setDateIssuedToday = this.setDateIssuedToday.bind(this);
    this.state = {
      fieldMap: this.props.fieldMap ? this.props.fieldMap : [],
      creatorsMap: this.props.creatorsMap ? this.props.creatorsTypes : [],
      citation: this.props.citationData ? createCitation(this.props.citationData) : createCitation(null),
      format: null,
      citationHTML: []
    };
  }

  async componentDidMount() {
    if (this.state.citation.type && this.state.citation.type !== '') {
      const fieldMap = await fetch(`https://cdn.cloudcite.net/fields/${this.state.citation.type}.json`)
                          .then((response) => {
                            return response.json();
                          });
      const creatorsMap = await fetch(`https://cdn.cloudcite.net/creators/${this.state.citation.type}.json`)
                            .then((response) => {
                              return response.json();
                            });
      this.setState({
        fieldMap: fieldMap,
        creatorsMap: creatorsMap.map((creator, index) => Object.assign(creator, {"key": creator.index, "text": creator.displayText, "value": creator.csl}))
      }, () => this.generatePreview());
      this.props.UPDATE_CREATORS_TYPES(creatorsMap);
    }
  }

  async generatePreview() {
    try {
      let creatorsMap = this.state.creatorsMap.map((creator) => creator.csl);
      const generatedHTML = await generateHTML(this.props.style.key, this.props.locale, creatorsMap, [cloneDeep(this.state.citation)]);
      this.setState({
        format: generatedHTML.format,
        citationHTML: generatedHTML.html.map(htmlItem => htmlItem.html)
      });
    }
    catch (err) {
      if (process.env.NODE_ENV === 'production') {
        window.ga('send', 'exception', {
          'exDescription': err.message,
          'exFatal': false
        });
      } else {
        console.log(err);
      }
    }
  }

  cancelCitation() {
    this.props.history.push('/');
  }

  saveCitation() {
    if (this.props.projects.find(project => project.id === this.props.selectedProject).edit) {
      this.props.UPDATE_CITATION(this.props.selectedProject, this.state.citation).then(() => this.props.history.push('/'));
    }
    else {
      this.props.ADD_CITATION(this.props.selectedProject, this.state.citation).then(() => this.props.history.push('/'));
    }
  }

  addContributor() {
    this.setState({
      citation: {
        ...this.state.citation,
        contributors: [...this.state.citation.contributors, { key: crypto.randomBytes(10).toString('hex'), given: '', middle: '', family: '', type: 'Author' }]
      }
    }, () => this.generatePreview())
  }

  removeContributor(key) {
    if (this.state.citation.contributors.length <= 1) {
      this.setState({
        citation: {
          ...this.state.citation,
          contributors: [{ key: crypto.randomBytes(10).toString('hex'), given: '', middle: '', family: '', type: 'Author' }]
        }
      }, () => this.generatePreview())
    }
    else {
      this.setState({
        citation: {
          ...this.state.citation,
          contributors: this.state.citation.contributors.filter((contributor) => contributor.key !== key)
        }
      }, () => this.generatePreview());
    }
  }

  setContributor(e, key, field, { value }) {
    this.setState({
      citation: {
        ...this.state.citation,
        contributors: this.state.citation.contributors.map((contributor) => contributor.key === key ? { ...contributor, [field]: value } : contributor)
      }
    }, () => this.generatePreview());
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
    }, () => this.generatePreview());
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
    }, () => this.generatePreview());
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
    }, () => this.generatePreview())
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
    }, () => this.generatePreview());
  }

  removeDateIssued() {
    this.setState({
      citation: {
        ...this.state.citation,
        issued: {
          month: "",
          day: "",
          year: ""
        }
      }
    }, () => this.generatePreview());
  }

  setDateIssuedToday() {
    let currentDate = new Date();
    this.setState({
      citation: {
        ...this.state.citation,
        issued: {
          month: currentDate.getMonth() + 1,
          day: currentDate.getDate(),
          year: currentDate.getFullYear()
        }
      }
    }, () => this.generatePreview())
  }

  setCSLValue(e, cslKey, { value }) {
    this.setState({
      citation: {
        ...this.state.citation,
        [cslKey]: value
      }
    }, () => this.generatePreview());
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
      creatorsMap: creatorsMap.map((creator, index) => Object.assign(creator, { "key": creator.index, "text": creator.displayText, "value": creator.csl }))
    }, () => this.generatePreview());
    this.props.UPDATE_CREATORS_TYPES(creatorsMap);
  }

  render() {
    return (
    	<div id="citeForm">
        <div style={{textAlign: 'center'}}>
     		 <Dropdown fluid style={{marginBottom: '10px'}} placeholder="Select Citation Type" value={this.state.citation.type ? this.state.citation.type: null} selection search options={types.map((type, index) => Object.assign(type, {key: index}))} onChange={(e, value) => this.handleChange(e, value)}/>
        </div>
        <Form widths="equal">
            <div>
              { this.state.fieldMap && this.state.creatorsMap && this.state.creatorsMap.length > 0 ? (
                <div>
                  <ContributorFormBuilder citation={this.state.citation} creatorsMap={this.state.creatorsMap} removeContributor={this.removeContributor} addContributor={this.addContributor} setContributor={this.setContributor}/>
                  <div style={{marginTop: '15px'}}/>
                    <DateAccessedFormBuilder accessed={this.state.citation.accessed} changeDateAccessed={this.changeDateAccessed} removeDateAccessed={this.removeDateAccessed} setDateAccessedToday={this.setDateAccessedToday}/>
                    <div style={{marginTop: '15px'}}/>
                    <DateIssuedFormBuilder issued={this.state.citation.issued} changeDateIssued={this.changeDateIssued} removeDateIssued={this.removeDateIssued} setDateIssuedToday={this.setDateIssuedToday}/>
                    <div style={{marginTop: '15px'}}/>
                  </div>
                ): <div/>
              }
            </div>
          {this.state.fieldMap.filter(element => element.csl && element.csl !== '' && element.displayText && element.displayText !== '' && !element.group)
            .map((field, index) =>
              <Form.Field key={field.csl}>
                <Input label={field.displayText ? field.displayText: ''} placeholder={field.displayText ? field.displayText: ''} value={this.state.citation[field.csl] ? this.state.citation[field.csl]: ''} onChange={(e, value) => this.setCSLValue(e, field.csl, value)}/>
              </Form.Field>
            )}
          <div style={{ marginTop: '15px' }} />
          <Preview citationHTML={this.state.citationHTML} format={this.state.format} />
          {
            this.state.fieldMap.length > 0 ? (
              <Button.Group style={{ marginTop: '15px' }}>
                <Button onClick={(e) => this.cancelCitation()}>Cancel</Button>
                <Button.Or />
                <Button style={{ backgroundColor: '#005eea', color: '#ffffff' }} onClick={(e) => this.saveCitation()}>Save</Button>
              </Button.Group>
            ) : <div />
          }
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CiteForm));
