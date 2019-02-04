import React, { Component, Fragment } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

class ContributorFormBuilder extends Component {

  render() {
    return (
      <Fragment>
        <Form.Field>
          <Input label="First Name" placeholder="First Name" defaultValue={this.props.contributor.given}/>
        </Form.Field>
        <Form.Field>
          <Input label="Middle Name" placeholder="Middle Name" defaultValue={this.props.contributor.middle}/>
        </Form.Field>
        <Form.Field>
          <Input label="Last Name" placeholder="Last Name" defaultValue={this.props.contributor.family}/>
        </Form.Field>
        <Button.Group>
          <Button style={{backgroundColor: '#b71c1c', color: '#ffffff'}} onClick={() => this.props.removeContributor(this.props.index)}>Remove Contributor</Button>
          <Button.Or />
          <Button style={{backgroundColor: '#005eea', color: '#ffffff'}} onClick={() => this.props.addContributor()}>Add Contributor</Button>
        </Button.Group>
      </Fragment>
    );
  }
}

export default ContributorFormBuilder;