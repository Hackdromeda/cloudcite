import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form } from 'semantic-ui-react';
import { types } from './types.js';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

class CiteForm extends Component {

  state = {
    contributors: [],
    form: (<div/>),
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

  contributorsFormBuilder() {
    if (this.state.contributors.length === 0) {
      return (
        <div>
          <Form.Field>
            <label>Contributor</label>
            <Dropdown selection placeholder="Author" options={this.state.contributorTypes}/>
          </Form.Field>
          <Form.Field>
            <label>First Name</label>
            <input placeholder="First Name"/>
          </Form.Field>
          <Form.Field>
            <label>Middle Name</label>
            <input placeholder="Middle Name"/>
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder="Last Name"/>
          </Form.Field>
        </div>
      );
    }
    else {
      return (
        <Dropdown selection placeholder="Author" options={this.state.contributorTypes}/>,
        this.state.contributors.map((contributor, index) => 
          <div key={index}>
            <Form.Field>
              <label>First Name</label>
              <input placeholder="First Name" value={contributor.given}/>
            </Form.Field>
            <Form.Field>
            <label>Middle Name</label>
              <input placeholder="Middle Name" value={contributor.middle}/>
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder="Last Name" value={contributor.family}/>
            </Form.Field>
          </div>
        )
      );
    }
  }

  buildForm(typeMap) {
    let inputMap = typeMap.filter(element => element.csl && element.UI && !element.group);
    let form = (
    <Form>
      {this.contributorsFormBuilder()}
      {inputMap.map((field, index) => 
        <Form.Field key={index}>
          <label>{field.UI ? field.UI: ''}</label>
          <input placeholder={field.UI ? field.UI: ''}/>
        </Form.Field>
      )}
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
    	<div>
     		<Dropdown placeholder="Other" selection search options={types.map((type, index) => Object.assign(type, {key: index}))} onChange={(e, value) => this.handleChange(e, value)}/>
        {this.state.form}
     	</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CiteForm);
