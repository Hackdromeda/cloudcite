import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateHTML } from '../functions/generateHTML';
import cloneDeep from 'lodash.clonedeep';
import './Preview.css';

const mapStateToProps = state => ({
    style: state.projectsReducer.projects.find((project) => project.id === state.projectsReducer.selectedProject).style,
    locale: state.localeReducer.locale.value,
    creatorsTypes: state.creatorsTypesReducer.creatorsTypes
});
  
const mapDispatchToProps = dispatch => ({
    
});

//citation prop is an array containing citation data
class Preview extends Component {
    constructor(props) {
        super(props);
        this.generatePreview();
    }

    componentDidUpdate() {
        this.generatePreview();
    }

    state = {
        citationHTML: [],
        format: null
    }

    async generatePreview() {
        const generatedHTML = await generateHTML(this.props.style.key, this.props.locale, this.props.creatorsTypes, cloneDeep(this.props.citations));
        if (generatedHTML && generatedHTML.error) {
            console.log(generatedHTML.error)
        } 
        else {
            this.setState({
                format: generatedHTML.format,
                citationHTML: generatedHTML.html.map(htmlItem => htmlItem.html)
            });
        }
    }

    render() {
        return (
            <div id="preview" style={{marginTop: '10px'}}>
                {
                    this.state.format && this.state.citationHTML.length > 0 ?
                        <div class="csl-bib-body" style={{lineHeight: this.state.format.linespacing, marginLeft: `${this.state.format.hangingindent}em`, textIndent: `-${this.state.format.hangingindent}em`}}>
                            {this.state.citationHTML.map((cslEntry, index) =>
                                <div id={`cslEntryContainer${index}`} style={{clear: 'left', marginBottom: this.state.format.entryspacing}}>
                                    <div dangerouslySetInnerHTML={{__html: cslEntry}}/>
                                </div>
                            )}
                        </div>: 
                    <div/>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);