import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CREATE_PROJECT, DELETE_PROJECT, SELECT_PROJECT } from '../actions/projectActions';
import { Link } from "react-router-dom";
import './Projects.css';
const crypto = require('crypto');

const mapStateToProps = state => ({
    projects: state.projectsReducer.projects,
    selectedProject: state.projectsReducer.selectedProject
});
  
const mapDispatchToProps = dispatch => ({
    CREATE_PROJECT: (PROJECT) => dispatch(CREATE_PROJECT(PROJECT)),
    DELETE_PROJECT: (PROJECT_ID) => dispatch(DELETE_PROJECT(PROJECT_ID)),
    SELECT_PROJECT: (PROJECT_ID) => dispatch(SELECT_PROJECT(PROJECT_ID)),
});

class Projects extends Component {

    render() {
        this.createProject = () => {
            let projectId = crypto.randomBytes(20).toString('hex');
            this.props.CREATE_PROJECT({
                "id": projectId,
                "title": 'New Project',
                "citations": [],
                "style": this.props.projects.find(project => project.id === this.props.selectedProject).style
            });
        }

        return (
            <div id="projects">
                <div>
                    <Link to="/">Home</Link>
                </div>
                {this.props.selectedProject}
                {this.props.projects.map(function(project, index) {
                    return (
                        <div key={index}>
                            <p>Project Title: {project.title}</p>
                            <p>Project ID: {project.id}</p>
                            <p>Project Style: {project.style.value}</p>
                        </div>
                    )
                })}
                <button onClick={() => this.createProject()}>Create Project</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);