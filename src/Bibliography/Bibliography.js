import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { generateHTML } from '../functions/generateHTML';
import { DELETE_CITATION } from '../actions/projects';
import './Bibliography.scss';

const mapStateToProps = state => ({
    selectedProject: state.projectsReducer.selectedProject,
    style: state.projectsReducer.projects.find((project) => project.id === state.projectsReducer.selectedProject).style,
    locale: state.localeReducer.locale.value,
    creatorsTypes: state.creatorsTypesReducer.creatorsTypes
});

const mapDispatchToProps = dispatch => ({
    DELETE_CITATION: async (PROJECT_ID, CITATION_ID) => dispatch(DELETE_CITATION(PROJECT_ID, CITATION_ID))
});

function toPlainText(richText) {
    return richText.replace(/<(?:.|\n)*?>/gim, "").replace(/\/n/gi, "").trim();
}

//citation prop is an array containing citation data
class Bibliography extends Component {
    constructor(props) {
        super(props);
        this.bibliographyRef = React.createRef();
        this.state = {
            format: null,
            citationHTML: [],
            textPlain: "",
            textHTML: ""
        }
    }

    componentDidMount() {
        this.generatePreview();
    }


    copyCSL(e) {
        e.clipboardData.setData("text/plain", this.state.textPlain);
        e.clipboardData.setData("text/html", this.state.textHTML);
        e.preventDefault();
    }

    copyCitation(e, index) {
        this.setState({
            textPlain: toPlainText(this.state.citationHTML[index]),
            textHTML: `<div class="csl-bib-body" style="${this.state.format ? (this.state.format.linespacing != null ? (`line-height:${this.state.format.linespacing};`) : '') : ''}${this.state.format ? (this.state.format.hangingindent != null ? (`text-indent:-${this.state.format.hangingindent}em;`) : '') : ''}"><div style="clear:left;${(this.state.format.entryspacing != null ? (`margin-bottom:${this.state.format.entryspacing}em;"`) : '"')}>${this.state.citationHTML[index]}</div></div>`
        }, () => document.execCommand('copy'));
    }

    copyBibliography(e) {
        let textPlain = "";
        for (let i = 0; i < this.state.citationHTML.length; i++) {
            textPlain += toPlainText(this.state.citationHTML[i]);
        }
        this.setState({
            textPlain: textPlain,
            textHTML: `<div class="csl-bib-body" style="${this.state.format ? (this.state.format.linespacing != null ? (`line-height:${this.state.format.linespacing};`) : '') : ''}${this.state.format ? (this.state.format.hangingindent != null ? (`text-indent:-${this.state.format.hangingindent}em;`) : '') : ''}">${this.state.citationHTML.map(cslHTMLItem => `<div style="clear:left;${(this.state.format.entryspacing != null ? (`margin-bottom:${this.state.format.entryspacing}em;"`) : '"')}>${cslHTMLItem}</div>`).join('')}</div>`
        }, () => document.execCommand('copy'));
    }

    deleteCitation(id) {
        this.props.DELETE_CITATION(this.props.selectedProject, id).then(() => this.generatePreview());
    }

    async generatePreview() {
        try {
            const generatedHTML = await generateHTML(this.props.style.key, this.props.locale, this.props.creatorsTypes, this.props.citations);
            let format = generatedHTML.format;
            let citationHTML = generatedHTML.html.map(htmlItem => htmlItem.html);
            this.setState({
                format: format,
                citationHTML: citationHTML
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div style={{ marginTop: '10px', backgroundColor: '#ffffff', padding: '20px', textAlign: 'left', justifyContent: 'center', fontWeight: 'normal !important' }}>
                {
                    this.state.format && this.state.citationHTML.length > 0 ?
                        <div ref="bibliographyRef" onCopy={(e) => this.copyCSL(e)} style={{ textAlign: 'center', justifyContent: 'center' }}>
                            <div id="bibliographyActions">
                                <span id="copyBibliographyText" onClick={(e) => this.copyBibliography(e)} style={{ cursor: 'pointer' }}>Copy Bibliography <i className="copy icon"></i></span>
                            </div>
                            <div style={{ marginTop: '10px', backgroundColor: '#ffffff', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '5px', textAlign: 'left', fontWeight: 'normal !important' }}>
                                <div className="csl-bib-body" style={{ lineHeight: this.state.format.linespacing, marginLeft: `${this.state.format.hangingindent}em`, textIndent: `-${this.state.format.hangingindent}em` }}>
                                    {this.state.citationHTML.map((cslEntry, index) =>
                                        <Fragment key={index}>
                                            <div id={`cslEntryContainer${index}`} style={{ clear: 'left', marginBottom: this.state.format.entryspacing }}>
                                                <div dangerouslySetInnerHTML={{ __html: cslEntry }} />
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span id={`copyCitationButton${index}`} className="bibliographyActionButton">
                                                    <i className="copy outline icon" onClick={(e) => this.copyCitation(e, index)}></i>
                                                </span>
                                                <span className="bibliographyActionButton">
                                                    <i className="pencil alternate icon"></i>
                                                </span>
                                                <span className="bibliographyActionButton">
                                                    <i className="trash icon" onClick={(e) => this.deleteCitation(this.state.format.entry_ids[index][0])}></i>
                                                </span>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                            <Link className="settingsLink" to="/settings">Settings</Link>

                        </div> : <div />
                }

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bibliography);