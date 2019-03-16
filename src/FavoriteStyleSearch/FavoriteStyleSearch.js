import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SET_STYLE } from '../actions/projects';
import { Dropdown } from 'semantic-ui-react';

const mapStateToProps = state => ({
	selectedProject: state.projectsReducer.selectedProject,
	projects: state.projectsReducer.projects,
	favoriteStyles: state.favoriteStylesReducer.favoriteStyles
});

const mapDispatchToProps = dispatch => ({
	SET_STYLE: (id, style) => dispatch(SET_STYLE(id, { key: style.key, value: style.value }))
});

class FavoriteStyleSearch extends Component {

	handleChange(e, { value }) {
		this.props.SET_STYLE(this.props.selectedProject, this.props.favoriteStyles.find(favoriteStyle => favoriteStyle.value === value));
	}

	render() {
		return (
			<Dropdown placeholder={this.props.projects.find(project => project.id === this.props.selectedProject).style.value} search selection options={this.props.favoriteStyles.map(style => Object.assign(style, { text: style.value }))} onChange={(e, value) => this.handleChange(e, value)}></Dropdown>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteStyleSearch);
