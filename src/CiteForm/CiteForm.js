import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';
import { types } from './types.js';
import './CiteForm.css';
import { createCitation } from '../functions/createCitation.js';
import Preview from '../Preview/Preview.js';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

let currentDate = new Date();

class CiteForm extends Component {

  state = {
    form: (<div/>),
    contributors: [],
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
          contributors: [...this.state.citation.contributors.slice(0, index).concat(this.state.citation.contributors.slice(index + 1, this.state.citation.contributors.length))]
        }
      })
    }
  }

  buildForm(typeMap) {
    let inputMap = typeMap.filter(element => element.csl && element.csl !== '' && element.UI && element.UI !== '' && !element.group);
    let form = (
    <Form>
      <Form.Field>
        <Dropdown lazyLoad selection label="Contributor" placeholder="Author" options={this.state.contributorTypes}/>
      </Form.Field>
      {
        this.state.contributors.map((contributor, index) =>
        <div key={index}>{contributor.given}</div>
        )
      }
      {
        this.state.citation.contributors.map((contributor, index) => 
          <div key={index}>
            <Form.Field>
              <Input label="First Name" placeholder="First Name" defaultValue={contributor.given}/>
            </Form.Field>
            <Form.Field>
              <Input label="Middle Name" placeholder="Middle Name" defaultValue={contributor.middle}/>
            </Form.Field>
            <Form.Field>
              <Input label="Last Name" placeholder="Last Name" defaultValue={contributor.family}/>
            </Form.Field>
            <Button.Group>
              <Button style={{backgroundColor: '#b71c1c', color: '#ffffff'}} onClick={(e) => this.removeContributor(index)}>Remove Contributor</Button>
              <Button.Or />
              <Button style={{backgroundColor: '#005eea', color: '#ffffff'}} onClick={(e) => this.addContributor()}>Add Contributor</Button>
            </Button.Group>
          </div>
        )
      }
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
      <Form.Field>
        <Preview citation={[this.state.citation]}/>
      </Form.Field>
      <Button.Group>
        <Button>Cancel</Button>
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
    	<div id="citeForm">
     		<Dropdown style={{marginBottom: '10px'}} placeholder="Other" selection search options={types.map((type, index) => Object.assign(type, {key: index}))} onChange={(e, value) => this.handleChange(e, value)}/>
        {this.state.form}
     	</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CiteForm);
