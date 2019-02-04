import React, { Component, Fragment } from 'react';
import { Form, Input, Dropdown } from 'semantic-ui-react';
import { monthNames } from './monthNames.js';

class DateIssuedFormBuilder extends Component {

  render() {
    return (
      <Fragment>
        <Form.Field>
          <Dropdown selection lazyLoad label="Month Published" placeholder="Month Published" options={monthNames} value={this.props.issued.month} onChange={(e, value) => this.props.changeDateIssued(e, 'month', value)}/>
        </Form.Field>
        <Form.Field>
          <Input label="Day Published" type="number" placeholder="Day Published" defaultValue={this.props.issued.day} onChange={(e, value) => this.props.changeDateIssued(e, 'day', value)}/>
        </Form.Field>
        <Form.Field>
          <Input label="Year Published" type="number" placeholder="Year Published" defaultValue={this.props.issued.year} onChange={(e, value) => this.props.changeDateIssued(e, 'year', value)}/>
        </Form.Field>
      </Fragment>
    );
  }
}

export default DateIssuedFormBuilder;