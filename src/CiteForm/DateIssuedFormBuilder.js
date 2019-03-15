import React from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import { monthNames } from './monthNames.js';

function DateIssuedFormBuilder() {
  return (
    <div>
      <Form.Group>
        <Form.Field control={Dropdown} selection lazyLoad label="Month Published" placeholder="Month Published" options={monthNames} value={parseInt(props.issued.month) ? parseInt(props.issued.month): props.issued.month} onChange={(e, value) => props.changeDateIssued(e, 'month', value)}/>
        <Form.Field control={Input} label="Day Published" type="number" placeholder="Day Published" defaultValue={props.issued.day} onChange={(e, value) => props.changeDateIssued(e, 'day', value)}/>
        <Form.Field control={Input} label="Year Published" type="number" placeholder="Year Published" defaultValue={props.issued.year} onChange={(e, value) => props.changeDateIssued(e, 'year', value)}/>
      </Form.Group>
      <Button.Group>
        <Button style={{backgroundColor: '#b71c1c', color: '#ffffff'}} onClick={() => props.removeDateIssued()}>Remove Date</Button>
        <Button.Or />
        <Button style={{backgroundColor: '#005eea', color: '#ffffff'}} onClick={() => props.setDateIssuedToday()}>Add Today's Date</Button>
      </Button.Group>
    </div>
  );
}

export default DateIssuedFormBuilder;