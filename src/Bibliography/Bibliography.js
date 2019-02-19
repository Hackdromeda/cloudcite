import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateHTML } from '../functions/generateHTML';
import { DELETE_CITATION } from '../actions/projects';
import './Bibliography.css';
import * as hyperHTML from 'hyperhtml';

const mapStateToProps = state => ({
    selectedProject: state.projectsReducer.selectedProject,
    style: state.projectsReducer.projects.find((project) => project.id === state.projectsReducer.selectedProject).style,
    locale: state.localeReducer.locale.value,
    creatorsTypes: state.creatorsTypesReducer.creatorsTypes
});
  
const mapDispatchToProps = dispatch => ({
    DELETE_CITATION: (PROJECT_ID, CITATION_ID) => dispatch(DELETE_CITATION(PROJECT_ID, CITATION_ID))
});

//citation prop is an array containing citation data
class Bibliography extends Component {
    constructor(props) {
        super(props);
        this.generatePreview();
    }

    componentDidUpdate() {
        this.generatePreview();
    }

    state = {
        textPlain: "",
        textHTML: ""
    }

    copyCSL(e, cslBiliographyRef) {
        e.clipboardData.setData("text/plain", this.state.textPlain);
        e.clipboardData.setData("text/html", this.state.textHTML);
        e.preventDefault();
    }

    copyBibliographyText(e, cslBibliographyRef, format, citationHTML) {
        let bibliographyContent = "";
        for (let i = 0; i < citationHTML.length; i++) {
            bibliographyContent += cslBibliographyRef.querySelector(`#cslEntryContainer${i}`).innerText;
        }
        let textPlain = bibliographyContent;
        let textHTML = `<div class="csl-bib-body" style="${format ? (format.linespacing != null ? (`line-height:${format.linespacing};`): ''): ''}${format ? (format.hangingindent != null ? (`text-indent:-${format.hangingindent}em;`): ''): ''}">${citationHTML.map(cslHTMLItem => `<div style="clear:left;${(format.entryspacing != null ? (`margin-bottom:${format.entryspacing}em;"`): '"')}>${cslHTMLItem}</div>`).join('')}</div>`;
        this.setState({
            textPlain: textPlain,
            textHTML: textHTML
        });
        let element = document.createElement('textarea');
        element.value = textPlain;
        cslBibliographyRef.appendChild(element);
        element.focus({
            preventScroll: true
        });
        element.setSelectionRange(0, element.value.length);
        document.execCommand('copy');
        cslBibliographyRef.removeChild(element);
    }

    deleteCitation(id) {
        this.props.DELETE_CITATION(this.props.selectedProject, id);
    }

    async generatePreview() {
        const generatedHTML = await generateHTML(this.props.style.key, this.props.locale, this.props.creatorsTypes, this.props.citations);
        if (generatedHTML && generatedHTML.error) {
            console.log(generatedHTML.error)
        } 
        else {
            let format = generatedHTML.format;
            if (generatedHTML.html && generatedHTML.html.length > 0) {
                let citationHTML = generatedHTML.html.map(htmlItem => htmlItem.html);
                let cslBibliographyRef = hyperHTML.wire()`
                        <div oncopy="${(e) => this.copyCSL(e, cslBibliographyRef)}" style="text-align: center; justify-content: center;">
                            <div id="bibliographyActions">
                                <span id="copyBibliographyText" onclick="${(e) => this.copyBibliographyText(e, cslBibliographyRef, format, citationHTML)}" style="cursor: pointer;">Copy Bibliography <i class="copy icon"></i></span>
                            </div>
                            <div style=${{marginTop: '10px', backgroundColor: '#ffffff', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '5px', textAlign: 'left', fontWeight: 'normal !important'}}>
                                <div class="csl-bib-body" style=${{lineHeight: format.linespacing, marginLeft: `${format.hangingindent}em`, textIndent: `-${format.hangingindent}em`}}>
                                    ${citationHTML.map((cslEntry, index) =>
                                        `<div id="cslEntryContainer${index}" style="clear: left; margin-bottom: ${format.entryspacing}}">
                                            ${cslEntry}
                                        </div>
                                            <div style="text-align: right;">
                                                    <span id="copyCitationButton${index}" class="bibliographyActionButton">
                                                        <i class="copy outline icon"></i>
                                                    </span>
                                                    <span class="bibliographyActionButton">
                                                        <i class="pencil alternate icon"></i>
                                                    </span>
                                                    <span class="bibliographyActionButton">
                                                        <i class="trash icon"></i>
                                                    </span>
                                                </div>
                                        </div>`
                                    )}
                                </div>
                            </div>
                        </div>`;                  
                    for (let i = 0; i < generatedHTML.html.length; i++) {
                        cslBibliographyRef.querySelector(`#copyCitationButton${i}`).addEventListener('click', (e) => {
                            let textPlain = cslBibliographyRef.querySelector(`#cslEntryContainer${i}`).innerText;
                            let textHTML = `<div class="csl-bib-body" style="${format ? (format.linespacing != null ? (`line-height:${format.linespacing};`): ''): ''}${format ? (format.hangingindent != null ? (`text-indent:-${format.hangingindent}em;`): ''): ''}"><div style="clear:left;${(format.entryspacing != null ? (`margin-bottom:${format.entryspacing}em;"`): '"')}>${citationHTML[i]}</div></div>`;
                            this.setState({
                                textPlain: textPlain,
                                textHTML: textHTML
                            })
                            var element = document.createElement('textarea');
                            element.value = textPlain;
                            cslBibliographyRef.appendChild(element);
                            element.focus({
                                preventScroll: true
                            });
                            element.setSelectionRange(0, element.value.length);
                            document.execCommand('copy');
                            cslBibliographyRef.removeChild(element);
                        });
                    }
                hyperHTML.bind(this.refs.bibliography)`${cslBibliographyRef}`;
            }
        }
    }

    render() {
        return (
            <div>
                <div style={{marginTop: '10px', backgroundColor: '#ffffff', padding: '20px', textAlign: 'left', justifyContent: 'center', fontWeight: 'normal !important'}}>
                    <div ref="bibliography"/>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bibliography);