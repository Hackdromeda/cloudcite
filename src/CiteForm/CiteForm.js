import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';
import { types } from './types.js';
import './CiteForm.css';
import { createCitation } from '../functions/createCitation.js';
import { withRouter } from 'react-router-dom';
import ContributorFormBuilder from './ContributorFormBuilder.js';

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
  }

  state = {
    form: (<div/>),
    citation: {
      ...createCitation(),
      contributors: [{given: '', middle: '', family: ''}]
    },
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
      ],
        monthNames: [
            {
                "key": "January",
                "text": "January",
                "value": 1
            },
            {
                "key": "February",
                "text": "February",
                "value": 2
            },
            {
                "key": "March",
                "text": "March",
                "value": 3
            },
            {
                "key": "April",
                "text": "April",
                "value": 4
            },
            {
                "key": "May",
                "text": "May",
                "value": 5
            },
            {
                "key": "June",
                "text": "June",
                "value": 6
            },
            {
                "key": "July",
                "text": "July",
                "value": 7
            },
            {
                "key": "August",
                "text": "August",
                "value": 8
            },
            {
                "key": "September",
                "text": "September",
                "value": 9
            },
            {
                "key": "October",
                "text": "October",
                "value": 10
            },
            {
                "key": "November",
                "text": "November",
                "value": 11
            },
            {
                "key": "December",
                "text": "December",
                "value": 12
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

  buildForm(typeMap) {
    let inputMap = typeMap.filter(element => element.csl && element.csl !== '' && element.UI && element.UI !== '' && !element.group);
    let form = (
    <Form>
      <Form.Field>
        <Dropdown lazyLoad selection label="Contributor" placeholder="Author" options={this.state.contributorTypes}/>
      </Form.Field>
      {this.state.citation.contributors.map((contributor, index) =>
        <ContributorFormBuilder key={index} index={index} contributor={contributor} removeContributor={this.removeContributor} addContributor={this.addContributor}/>
      )}
      <div style={{marginTop: '15px'}}/>
      <Form.Field>
        <Dropdown selection lazyLoad label="Month Accessed" placeholder="Month Accessed" options={this.state.monthNames} value={this.state.citation.accessed.month}/>
      </Form.Field>
      <Form.Field>
        <Input label="Day Accessed" type="number" placeholder="Day Accessed" defaultValue={this.state.citation.accessed.day}/>
      </Form.Field>
      <Form.Field>
        <Input label="Year Accessed" type="number" placeholder="Year Accessed" defaultValue={this.state.citation.accessed.year}/>
      </Form.Field>
      <Form.Field>
        <Dropdown selection lazyLoad label="Month Published" placeholder="Month Published" options={this.state.monthNames}/>
      </Form.Field>
      <Form.Field>
        <Input label="Day Published" type="number" placeholder="Day Published"/>
      </Form.Field>
      <Form.Field>
        <Input label="Year Published" type="number" placeholder="Year Published"/>
      </Form.Field>
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
      }
      else {
        const typeMap = await fetch(`https://cdn.cloudcite.net/maps/${value}.json`)
                              .then((response) => {
                                return response.json();
                              });
        localStorage.setItem(`cloudcite_typemap_${value}`, JSON.stringify(typeMap));
        this.buildForm(typeMap);
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
        </Form>
        {this.state.form}
     	</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CiteForm));
