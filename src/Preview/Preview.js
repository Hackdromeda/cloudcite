import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateHTML } from '../functions/generateHTML';
import * as hyperHTML from 'hyperhtml';
import cloneDeep from 'lodash.clonedeep';
import './Preview.css';

const mapStateToProps = state => ({
    style: state.projectsReducer.projects.find((project) => project.id === state.projectsReducer.selectedProject).style,
    locale: state.localeReducer.locale.value
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

    async generatePreview() {
        const generatedHTML = await generateHTML(this.props.style.key, this.props.locale, this.props.creatorsMap, cloneDeep(this.props.citations));
        if (generatedHTML && generatedHTML.error) {
            console.log(generatedHTML.error)
        } 
        else {
            let format = generatedHTML.format;
            if (generatedHTML.html && generatedHTML.html.length > 0) {
                let citationHTML = generatedHTML.html.map(htmlItem => htmlItem.html);
                let cslPreviewRef = hyperHTML.wire()`
                    <div id="preview" style=${{marginTop: '10px'}}>
                        <div class="csl-bib-body" style=${{lineHeight: format.linespacing, marginLeft: `${format.hangingindent}em`, textIndent: `-${format.hangingindent}em`}}>
                            ${citationHTML.map((cslEntry, index) =>
                                `<div id="cslEntryContainer${index}" style="clear: left; margin-bottom: ${format.entryspacing}}">
                                    ${cslEntry}
                                </div>`
                            )}
                        </div>
                    </div>`;                  
                hyperHTML.bind(this.refs.Preview)`${cslPreviewRef}`;
            }
        }
    }

    render() {
        return (
            <div ref="Preview"/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);