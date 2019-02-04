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
        const randomNames = ['Sallie', 'George', 'Steven', 'Alex', 'Cole', 'Brad', 'Squidward'];

        this.createProject = () => {
            let projectId = crypto.randomBytes(20).toString('hex');
            this.props.CREATE_PROJECT({
                "id": projectId,
                "title": 'New Project',
                "citations": [],
                "style": this.props.projects.find(project => project.id === this.props.selectedProject).style
            });
            this.newProject();
        }

        this.deleteProject = (projectId) => {
            // setTimeout(document.getElementById(projectId).classList.add('fadeOut'), 1000);
            this.props.DELETE_PROJECT(projectId);
        }

        this.selectProject = (projectId) => {
            // document.querySelectorAll('.selected').forEach(thing => {
            //     thing.classList.remove('selected');
            //     thing.childNodes[2].childNodes[0].disabled = false;
            //     thing.childNodes[2].childNodes[2].disabled = false;
            // });
            // document.getElementById(projectId).classList.add('selected');
            // const selected = document.querySelector('.selected').childNodes[2];
            // selected.childNodes[0].disabled = true;
            // selected.childNodes[2].disabled = true;

            // document.body.scrollTop = 0; // For Safari
            // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            this.props.SELECT_PROJECT(projectId);

        }

        // Transition Styling for New Cards
        this.newProject = () => {
            const newcomers = document.querySelectorAll('.new');
            setTimeout(newcomers.forEach(thing => {
                thing.classList.remove('new');
            }), 2000);
        }

        return (
            <div id="projects">
                {this.props.projects.map(function (project, index) {
                    return (
                        <div id={project.id} className="project-card new" key={index} name={this.props.selectedProject !== project.id ? "" : "selected"}>
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
                <div className="project-card create">
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