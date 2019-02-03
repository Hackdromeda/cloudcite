import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CREATE_PROJECT, DELETE_PROJECT, SELECT_PROJECT } from '../actions/projects';
// import { Grid, Card, button } from 'semantic-ui-react';
import './Projects.scss';
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

        this.deleteProject = (projectId) => {
            this.props.DELETE_PROJECT(projectId);
        }

        this.selectProject = (projectId) => {
            this.props.SELECT_PROJECT(projectId);
        }

        return (
            <div id="projects">
                {this.props.projects.map(function (project, index) {
                    return (
                        <div className="project-card">
                            <header className="card-header">{project.title}</header>
                            <div className="project-card-content">Style: {this.props.projects.find(project => project.id === this.props.selectedProject).style.value}</div>
                            <footer className="card-footer">
                                <button disabled={this.props.selectedProject !== project.id ? false : true} onClick={() => this.selectProject(project.id)}>Select</button>
                                <button>Edit</button>
                                <button disabled={this.props.selectedProject !== project.id ? false : true} onClick={() => this.deleteProject(project.id)}>Delete</button>
                            </footer>
                        </div>
                    )
                }, this)}
                <div className="project-card">
                    <header className="card-header">Create New Project</header>
                    <div className="project-card-content">Style: {this.props.projects.find(project => project.id === this.props.selectedProject).style.value}</div>
                    <footer className="card-footer">
                        <button className="create-button" onClick={() => this.createProject()}>Create</button>
                    </footer>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);