import React from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';

function ContributorFormBuilder(props) {
  return (
    <div>
      {props.citation.contributors.map((contributor) =>
          <div key={contributor.id} style={{marginTop: '10px'}}>
            <Form.Group>
            <Form.Field control={Dropdown} lazyLoad selection label="Contributor Type" placeholder="Contributor Type" value={contributor.type} options={props.creatorsMap} onChange={(e, value) => props.setContributor(e, contributor.id, 'type', value)}/>
            <Form.Field control={Input} label="Given Name" placeholder="Given Name" defaultValue={contributor.given} onChange={(e, value) => props.setContributor(e, contributor.id, 'given', value)}/>
            <Form.Field control={Input} label="Last Name" placeholder="Last Name" defaultValue={contributor.family} onChange={(e, value) => props.setContributor(e, contributor.id, 'family', value)}/>
          </Form.Group>
          <Button.Group>
            <Button style={{backgroundColor: '#b71c1c', color: '#ffffff'}} onClick={() => props.removeContributor(contributor.id)}>Remove Contributor</Button>
            <Button.Or />
            <Button style={{backgroundColor: '#005eea', color: '#ffffff'}} onClick={() => props.addContributor()}>Add Contributor</Button>
          </Button.Group>
          </div>
        )}
    </div>
  );
}

export default ContributorFormBuilder;