import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SET_LOCALE } from '../actions/locale';
import { Dropdown } from 'semantic-ui-react';
import { locales } from './locales.js';

const mapStateToProps = state => ({
  locale: state.localeReducer.locale
});

const mapDispatchToProps = dispatch => ({
  SET_LOCALE: (locale) => dispatch(SET_LOCALE(locale))
});

class LocaleSearch extends Component {

	handleChange(e, { value }) {
		this.props.SET_LOCALE(locales.find(locale => locale.value === value));
	}

  	render() {
	    return (
	      <Dropdown placeholder={this.props.locale.text} fluid search selection options={locales} onChange={(e, value) => this.handleChange(e, value)}></Dropdown>
	    );
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSearch);
