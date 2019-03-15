import React from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import { monthNames } from './monthNames.js';

function DateAccessedFormBuilder(props) {
  return (
    <div>
      <Form.Group>
        <Form.Field control={Dropdown} selection lazyLoad label="Month Accessed" placeholder="Month Accessed" options={monthNames} value={parseInt(props.accessed.month) ? parseInt(props.accessed.month): props.accessed.month} onChange={(e, value) => props.changeDateAccessed(e, 'month', value)}/>
        <Form.Field control={Input} label="Day Accessed" type="number" placeholder="Day Accessed" defaultValue={props.accessed.day} onChange={(e, value) => props.changeDateAccessed(e, 'day', value)}/>
        <Form.Field control={Input}  label="Year Accessed" type="number" placeholder="Year Accessed" defaultValue={props.accessed.year} onChange={(e, value) => props.changeDateAccessed(e, 'year', value)}/>
      </Form.Group>
      <Button.Group>
        <Button style={{backgroundColor: '#b71c1c', color: '#ffffff'}} onClick={() => props.removeDateAccessed()}>Remove Date</Button>
        <Button.Or />
        <Button style={{backgroundColor: '#005eea', color: '#ffffff'}} onClick={() => props.setDateAccessedToday()}>Add Today's Date</Button>
      </Button.Group>
    </div>
  );
}

export default DateAccessedFormBuilder;