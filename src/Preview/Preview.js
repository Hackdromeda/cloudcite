import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateHTML } from '../functions/generateHTML';
import * as hyperHTML from 'hyperhtml';
import './Preview.css';

const mapStateToProps = state => ({
    style: state.projectsReducer.projects.find((project) => project.id === state.projectsReducer.selectedProject).style,
    locale: state.localeReducer.locale
});
  
const mapDispatchToProps = dispatch => ({
    
});

//citation prop is an array containing citation data
class Preview extends Component {
    constructor(props) {
        super(props);
        this.generatePreview();
    }

    state = {
        textPlain: "",
        textHTML: ""
    }

    async generatePreview() {
        const generatedHTML = await generateHTML(this.props.style.key, this.props.locale, this.props.citation, []);
        if (generatedHTML && generatedHTML.error) {
            console.log(generatedHTML.error)
        } 
        else {
            let format = generatedHTML.format;
            if (generatedHTML.html && generatedHTML.html.length > 0) {
                let citationHTML = generatedHTML.html.map(htmlItem => htmlItem.html);
                let cslPreview = hyperHTML.wire(citationHTML, 'html')`
                    <div>
                        <button id="copyBibliographyText" style=${{backgroundColor: '#0066ff', color: '#ffffff'}}>
                            <h2>Copy Bibliography</h2>
                        </button>
                        <div style=${{marginTop: '10px', backgroundColor: '#ffffff', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '5px', textAlign: 'left', fontWeight: 'normal !important'}}>
                            <div class="csl-bib-body" style=${{lineHeight: format.linespacing, marginLeft: `${format.hangingindent}em`, textIndent: `-${format.hangingindent}em`}}>
                                ${citationHTML.map((cslEntry, index) =>
                                    `<div id="cslEntryContainer${index}" style="clear: left; margin-bottom: ${format.entryspacing}}">
                                        ${cslEntry}
                                    </div>
                                    <button id="copyCitationButton${index}">Copy Citation</button>`
                                )}
                            </div>
                        </div>
                    </div>`;
                
                    if (this.props.bibliography) {
                        cslPreview.addEventListener('copy', (e) => {
                            e.clipboardData.setData("text/plain", this.state.textPlain);
                            e.clipboardData.setData("text/html", this.state.textHTML);
                            e.preventDefault();
                        });
                        cslPreview.querySelector('#copyBibliographyText').addEventListener('click', (e) => {
                            let bibliographyContent = "";
                            for (let i = 0; i < generatedHTML.html.length; i++) {
                                bibliographyContent += cslPreview.querySelector(`#cslEntryContainer${i}`).innerText;
                            }
                            let textPlain = bibliographyContent;
                            let textHTML = `<div class="csl-bib-body" style="${format ? (format.linespacing != null ? (`line-height:${format.linespacing};`): ''): ''}${format ? (format.hangingindent != null ? (`text-indent:-${format.hangingindent}em;`): ''): ''}">${citationHTML.map(cslHTMLItem => `<div style="clear:left;${(format.entryspacing != null ? (`margin-bottom:${format.entryspacing}em;"`): '"')}>${cslHTMLItem}</div>`).join('')}</div>`;
                            this.setState({
                                textPlain: textPlain,
                                textHTML: textHTML
                            });
                            let element = document.createElement('textarea');
                            element.value = textPlain;
                            cslPreview.appendChild(element);
                            element.focus({
                                preventScroll: true
                            });
                            element.setSelectionRange(0, element.value.length);
                            document.execCommand('copy');
                            cslPreview.removeChild(element);
                        });
                        for (let i = 0; i < generatedHTML.html.length; i++) {
                            cslPreview.querySelector(`#copyCitationButton${i}`).addEventListener('click', (e) => {
                                let textPlain = cslPreview.querySelector(`#cslEntryContainer${i}`).innerText;
                                let textHTML = `<div class="csl-bib-body" style="${format ? (format.linespacing != null ? (`line-height:${format.linespacing};`): ''): ''}${format ? (format.hangingindent != null ? (`text-indent:-${format.hangingindent}em;`): ''): ''}"><div style="clear:left;${(format.entryspacing != null ? (`margin-bottom:${format.entryspacing}em;"`): '"')}>${citationHTML[i]}</div></div>`;
                                this.setState({
                                    textPlain: textPlain,
                                    textHTML: textHTML
                                })
                                var element = document.createElement('textarea');
                                element.value = textPlain;
                                cslPreview.appendChild(element);
                                element.focus({
                                    preventScroll: true
                                });
                                element.setSelectionRange(0, element.value.length);
                                document.execCommand('copy');
                                cslPreview.removeChild(element);
                            });
                        }
                    }
                    this.refs.preview.appendChild(cslPreview);
            }
        }
    }

    render() {
        return (
            <div style={{marginTop: '10px', backgroundColor: '#ffffff', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '5px', textAlign: 'left', fontWeight: 'normal !important'}}>
                <div ref="preview"/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);