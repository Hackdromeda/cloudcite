import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Preview.css';

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
    
});

class Preview extends Component {
    render() {
        console.log(this.props.projectsReducer.projects)
        return (
            <div id="preview">
                Preview
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);