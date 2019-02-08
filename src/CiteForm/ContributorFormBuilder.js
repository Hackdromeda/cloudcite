import React, { Component, Fragment } from 'react';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';

class ContributorFormBuilder extends Component {

  render() {
    return (
      <Fragment>
      {this.props.citation.contributors.map((contributor, index) =>
        <div key={contributor.key} style={{marginTop: '10px'}}>
          <Form.Group>
          <Form.Field control={Dropdown} lazyLoad selection label="Contributor Type" placeholder="Contributor Type" value={contributor.type} options={this.props.creatorsMap} onChange={(e, value) => this.props.setContributor(e, contributor.key, 'type', value)}/>
          <Form.Field control={Input} label="First Name" placeholder="First Name" defaultValue={contributor.given} onChange={(e, value) => this.props.setContributor(e, contributor.key, 'given', value)}/>
          <Form.Field control={Input} label="Middle Name" placeholder="Middle Name" defaultValue={contributor.middle} onChange={(e, value) => this.props.setContributor(e, contributor.key, 'middle', value)}/>
          <Form.Field control={Input} label="Last Name" placeholder="Last Name" defaultValue={contributor.family} onChange={(e, value) => this.props.setContributor(e, contributor.key, 'family', value)}/>
        </Form.Group>
        <Button.Group>
          <Button style={{backgroundColor: '#b71c1c', color: '#ffffff'}} onClick={() => this.props.removeContributor(contributor.key)}>Remove Contributor</Button>
          <Button.Or />
          <Button style={{backgroundColor: '#005eea', color: '#ffffff'}} onClick={() => this.props.addContributor()}>Add Contributor</Button>
        </Button.Group>
        </div>
      )}
      </Fragment>
    );
  }
}

export default ContributorFormBuilder;