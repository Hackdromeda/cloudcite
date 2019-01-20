import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CREATE_PROJECT, DELETE_PROJECT, SELECT_PROJECT } from '../actions/projects';
import { Link } from "react-router-dom";
import './Projects.css';
const crypto = require('crypto');

const mapStateToProps = state => ({
    projects: state.projectsReducer.projects,
    selectedProject: state.projectsReducer.selectedProject
});
  
const mapDispatchToProps = dispatch => ({
    CREATE_PROJECT: (project) => dispatch(CREATE_PROJECT(project)),
    DELETE_PROJECT: (projectId) => dispatch(DELETE_PROJECT(projectId)),
    SELECT_PROJECT: (projectId) => dispatch(SELECT_PROJECT(projectId)),
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