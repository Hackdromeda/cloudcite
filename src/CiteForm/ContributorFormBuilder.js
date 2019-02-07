import React, { Component, Fragment } from 'react';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';

class ContributorFormBuilder extends Component {

  render() {
    return (
      <Fragment>
        <Form.Group>
          <Form.Field control={Dropdown} lazyLoad selection label="Contributor Type" placeholder="Contributor Type" value={this.props.contributor.type} options={this.props.creatorsMap} onChange={(e, value) => this.props.setContributor(e, this.props.contributor.key, 'type', value)}/>
          <Form.Field control={Input} label="First Name" placeholder="First Name" defaultValue={this.props.contributor.given} onChange={(e, value) => this.props.setContributor(e, this.props.contributor.key, 'given', value)}/>
          <Form.Field control={Input} label="Middle Name" placeholder="Middle Name" defaultValue={this.props.contributor.middle} onChange={(e, value) => this.props.setContributor(e, this.props.contributor.key, 'middle', value)}/>
          <Form.Field control={Input} label="Last Name" placeholder="Last Name" defaultValue={this.props.contributor.family} onChange={(e, value) => this.props.setContributor(e, this.props.contributor.key, 'family', value)}/>
        </Form.Group>
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