import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';
import { types } from './types.js';
import './CiteForm.css';
import { createCitation } from '../functions/createCitation.js';
import { withRouter } from 'react-router-dom';
import ContributorFormBuilder from './ContributorFormBuilder.js';
import DateAccessedFormBuilder from './DateAccessedFormBuilder.js';
import DateIssuedFormBuilder from './DateIssuedFormBuilder.js';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

let currentDate = new Date();

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
    form: (<div/>),
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
    this.props.history.goBack();
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

  buildForm(typeMap) {
    let inputMap = typeMap.filter(element => element.csl && element.csl !== '' && element.UI && element.UI !== '' && !element.group);
    let form = (
    <Form>
      <div style={{marginTop: '15px'}}/>
      {inputMap.map((field, index) => 
        <Form.Field key={field.csl}>
          <Input label={field.UI ? field.UI: ''} placeholder={field.UI ? field.UI: ''}/>
        </Form.Field>
      )}
      <Button.Group>
        <Button onClick={(e) => this.cancelCitation()}>Cancel</Button>
        <Button.Or />
        <Button style={{backgroundColor: '#005eea', color: '#ffffff'}}>Save</Button>
      </Button.Group>
    </Form>
    );

    this.setState({
      form: form
    });
  }

  async handleChange(e, { value }) {
    try {
      if (localStorage.getItem(`cloudcite_typemap_${value}`)) {
        const typeMap = JSON.parse(localStorage.getItem(`cloudcite_typemap_${value}`));
        this.buildForm(typeMap);
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
        this.buildForm(typeMap);
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
        </Form>
        {this.state.form}
     	</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CiteForm));
