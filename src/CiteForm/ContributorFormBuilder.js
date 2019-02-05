import React, { Component, Fragment } from 'react';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';

class ContributorFormBuilder extends Component {

  state = {
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

  render() {
    return (
      <Fragment>
        <Form.Field>
          <Dropdown lazyLoad selection label="Contributor" placeholder="Contributor Type" value={this.props.contributor.type} options={this.state.contributorTypes} onChange={(e, value) => this.props.setContributor(e, this.props.contributor.key, 'type', value)}/>
        </Form.Field>
        <Form.Field>
          <Input label="First Name" placeholder="First Name" defaultValue={this.props.contributor.given} onChange={(e, value) => this.props.setContributor(e, this.props.contributor.key, 'given', value)}/>
        </Form.Field>
        <Form.Field>
          <Input label="Middle Name" placeholder="Middle Name" defaultValue={this.props.contributor.middle} onChange={(e, value) => this.props.setContributor(e, this.props.contributor.key, 'middle', value)}/>
        </Form.Field>
        <Form.Field>
          <Input label="Last Name" placeholder="Last Name" defaultValue={this.props.contributor.family} onChange={(e, value) => this.props.setContributor(e, this.props.contributor.key, 'family', value)}/>
        </Form.Field>
        <Button.Group>
          <Button style={{backgroundColor: '#b71c1c', color: '#ffffff'}} onClick={() => this.props.removeContributor(this.props.contributor.key)}>Remove Contributor</Button>
          <Button.Or />
          <Button style={{backgroundColor: '#005eea', color: '#ffffff'}} onClick={() => this.props.addContributor()}>Add Contributor</Button>
        </Button.Group>
      </Fragment>
    );
  }
}

export default ContributorFormBuilder;