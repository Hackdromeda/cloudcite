import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
import { monthNames } from './monthNames.js';

class DateAccessedFormBuilder extends Component {

  render() {
    return (
      <Fragment>
        <Form.Field>
          <Dropdown selection lazyLoad label="Month Accessed" placeholder="Month Accessed" options={monthNames} value={this.props.accessed.month} onChange={(e, value) => this.props.changeDateAccessed(e, 'month', value)}/>
        </Form.Field>
        <Form.Field>
          <Input label="Day Accessed" type="number" placeholder="Day Accessed" defaultValue={this.props.accessed.day} onChange={(e, value) => this.props.changeDateAccessed(e, 'day', value)}/>
        </Form.Field>
        <Form.Field>
          <Input label="Year Accessed" type="number" placeholder="Year Accessed" defaultValue={this.props.accessed.year} onChange={(e, value) => this.props.changeDateAccessed(e, 'year', value)}/>
        </Form.Field>
        <Button.Group>
          <Button style={{backgroundColor: '#b71c1c', color: '#ffffff'}} onClick={() => this.props.removeDateAccessed()}>Remove Date</Button>
          <Button.Or />
          <Button style={{backgroundColor: '#005eea', color: '#ffffff'}} onClick={() => this.props.setDateAccessedToday()}>Today</Button>
        </Button.Group>
      </Fragment>
    );
  }
}

export default DateAccessedFormBuilder;