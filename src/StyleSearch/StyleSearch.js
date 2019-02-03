import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ADD_FAVORITE_STYLE, REMOVE_FAVORITE_STYLE } from '../actions/favoriteStyles';
import { Input, List } from 'semantic-ui-react';
import algoliasearch from 'algoliasearch/lite';
import './StyleSearch.scss';

const searchClient = algoliasearch('X2RBUB2NNH', 'e8168f69a4758f6c98f19acb409d904e');
const index = searchClient.initIndex('STYLES');

const mapStateToProps = state => ({
	favoriteStyles: state.favoriteStylesReducer.favoriteStyles
});

const mapDispatchToProps = dispatch => ({
	ADD_FAVORITE_STYLE: (style) => dispatch(ADD_FAVORITE_STYLE(style)),
	REMOVE_FAVORITE_STYLE: (style) => dispatch(REMOVE_FAVORITE_STYLE(style))
});

class StyleSearch extends Component {

	state = {
		searchResults: []
	}

	async handleChange(e, { value }) {
		if (value && value.length > 0) {
			try {
				let response = await index.search({ query: value });
				this.setState({
					searchResults: response.hits
				});
			}
			catch (error) {

			}
		}
		else {
			this.setState({
				searchResults: []
			});
		}
	}

	addFavoriteStyle(style) {
		this.props.ADD_FAVORITE_STYLE({ key: style.key, value: style.value });
	}

	removeFavoriteStyle(style) {
		this.props.REMOVE_FAVORITE_STYLE({ key: style.key, value: style.value });
	}

	favoriteStyleButton(style) {
		if (this.props.favoriteStyles.map(favoriteStyle => favoriteStyle.key).includes(style.key)) {
			return (
				<button className="style-button negative" onClick={(e) => this.removeFavoriteStyle(style)}>Remove</button>
			);
		}
		else {
			return (
				<React.Fragment>
					<button className="style-button" color='blue' onClick={(e) => this.addFavoriteStyle(style)}>Add</button>
				</React.Fragment>
			);
		}
	}

	render() {
		return (
			<div>
				<Input fluid icon='search' placeholder='Search styles...' onChange={(e, value) => this.handleChange(e, value)} />
				<List divided verticalAlign='middle'>
					{this.state.searchResults.map((style, index) => (
						<List.Item key={index}>
							<List.Content floated='right'>
								{this.favoriteStyleButton(style)}
							</List.Content>
							<List.Content>
								<List.Description as='p' className="style-item">{style.value}</List.Description>
							</List.Content>
						</List.Item>
					))}
				</List>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleSearch);
