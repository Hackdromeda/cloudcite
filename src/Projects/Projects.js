import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CREATE_PROJECT, DELETE_PROJECT, SELECT_PROJECT } from '../actions/projects';
import { Grid, Card, Button } from 'semantic-ui-react';
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

        this.deleteProject = (projectId) => {
            this.props.DELETE_PROJECT(projectId);
        }

        this.selectProject = (projectId) => {
            this.props.SELECT_PROJECT(projectId);
        }

        return (
            <div id="projects">
                <Grid columns={4} padded>
                    {this.props.projects.map(function(project, index) {
                        return (
                            <Grid.Column>
                                <Card key={index} style={{minWidth: '30vh', minHeight: '30vh'}}>
                                    <Card.Content header={project.title} />
                                    <Card.Content style={{textAlign: 'left'}} description={`Style: ${project.style.value}`} />
                                    <Card.Content extra>
                                        <Button disabled={this.props.selectedProject !== project.id ? false: true} onClick={() => this.selectProject(project.id)}>Select</Button>
                                        <Button>Edit</Button>
                                        <Button negative disabled={this.props.selectedProject !== project.id ? false: true} onClick={() => this.deleteProject(project.id)}>Delete</Button>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        )
                    }, this)}
                    <Grid.Column>
                        <Card style={{minWidth: '30vh', minHeight: '30vh'}}>
                            <Card.Content header="Create New Project" />
                            <Card.Content style={{textAlign: 'left'}} description={`Style: ${this.props.projects.find(project => project.id === this.props.selectedProject).style.value}`} />
                            <Card.Content extra>
                                <Button primary onClick={() => this.createProject()}>Create</Button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);