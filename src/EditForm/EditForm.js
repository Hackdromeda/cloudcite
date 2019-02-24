import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EDIT_CITATION } from '../actions/projects';
const CiteForm = React.lazy(() => import('../CiteForm/CiteForm.js'));

const mapStateToProps = state => ({
  selectedProject: state.projectsReducer.selectedProject,
  projects: state.projectsReducer.projects
});

const mapDispatchToProps = dispatch => ({
  EDIT_CITATION: (project_id, citation_id) => dispatch(EDIT_CITATION(project_id, citation_id))
});

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldMap: [],
      creatorsMap: [],
      citationData: null
    };
    this.fetchFieldAndCreatorsMaps();
  }

  componentWillUnmount() {
    this.props.EDIT_CITATION(this.props.selectedProject, null);
  }

  async fetchFieldAndCreatorsMaps() {
    let citation_id = this.props.projects.find(project => project.id === this.props.selectedProject).edit;
    let type = this.props.projects.find(project => project.id === this.props.selectedProject).citations.find(citation => citation.id === citation_id).type;
    let citationData = this.props.projects.find(project => project.id === this.props.selectedProject).citations.find(citation => citation.id === citation_id);
    const fieldMap = await fetch(`https://cdn.cloudcite.net/fields/${type}.json`)
        .then((response) => {
            return response.json();
        });
    const creatorsMap = await fetch(`https://cdn.cloudcite.net/creators/${type}.json`)
        .then((response) => {
            return response.json();
        });
    this.setState({
        fieldMap: fieldMap,
        creatorsMap: creatorsMap,
        citationData: citationData
    });
  }

  render() {
    return (
      <CiteForm citationData={this.state.citationData} fieldMap={this.state.fieldMap} creatorsMap={this.state.creatorsMap} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
