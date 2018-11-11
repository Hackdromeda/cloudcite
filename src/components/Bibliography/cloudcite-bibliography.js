import * as hyperHTML from 'hyperhtml';
import { removeEmptyFromObject } from '../../functions/removeEmptyFromObject';
import { generateHTML } from '../../functions/generateHTML';
import { ProjectStore } from '../../state/project-store';

class CloudCiteBibliography extends HTMLElement {
    
    constructor(...args) {
        super(...args);
        this.html = hyperHTML.bind(this.attachShadow({mode: 'open'}));
        this._citationStyle = ProjectStore.style.value;
        this._locale = ProjectStore.locale.value;
        this._format = [];
        this._citationHTML = [];
        this._cslBibRef = null;
        this._citationData = {};
        this._textPlain = null;
        this._textHTML = null;
    }

    get citationStyle() {
        return this._citationStyle;
    }

    set citationStyle(value) {
        this._citationStyle = value;
    }

    get locale() {
        return this._locale;
    }

    set locale(value) {
        this._locale = value;
    }

    get format() {
        return this._format;
    }

    set format(value) {
        this._format = value;
    }

    get citationData() {
        return this._citationData;
    }

    set citationData(value) {
        this._citationData = value;
    }

    get citationHTML() {
        return this._citationHTML;
    }

    set citationHTML(value) {
        this._citationHTML = value;
    }

    get cslBibRef() {
        return this._cslBibRef;
    }

    set cslBibRef(value) {
        this._cslBibRef = value;
    }

    _copyToClipboard(e) {
        e.clipboardData.setData("text/plain", this._textPlain);
        e.clipboardData.setData("text/html", this._textHTML);
        e.preventDefault();
    }

    async generatePreview() {
        if (ProjectStore.project.citations.length > 0) {
            let cslObject = await removeEmptyFromObject(this._citationData);
            for (let i = 0; i < ProjectStore.project.citations.length; i++) {
                cslObject[ProjectStore.project.citations[i].id] = ProjectStore.project.citations[i];
            }
            const generatedHTML = await generateHTML({style: this._citationStyle, locale: this._locale, csl: cslObject, lang: "en-US", cslHTML: this._citationHTML});
            this._format = generatedHTML.format;
            this._citationHTML = generatedHTML.html;
            if (generatedHTML && generatedHTML.error) {
                console.log(generatedHTML.error)
            } 
            else {
                this._format = generatedHTML.format;
                if (generatedHTML.html && generatedHTML.html.length > 0) {
                    this._citationHTML = generatedHTML.html.map(htmlItem => htmlItem.html);
                    this._cslBibRef = hyperHTML.wire(this._citationHTML, 'html')`
                    <div>
                        <button id="copyBibliographyText">Copy Bibliography</button>
                        <div style=${{marginTop: '10px', backgroundColor: '#ffffff', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '5px', textAlign: 'left', fontWeight: 'normal !important'}}>
                            <div class="csl-bib-body" style=${{lineHeight: this._format.linespacing, marginLeft: `${this._format.hangingindent}em`, textIndent: `-${this._format.hangingindent}em`}}>
                                ${this._citationHTML.map((cslEntry, index) =>
                                    `<div id="cslEntryContainer${index}" style="clear: left; margin-bottom: ${this._format.entryspacing}}">
                                        ${cslEntry}
                                    </div>
                                    <button id="copyCitationButton${index}">Copy Citation</button>`
                                )}
                            </div>
                        </div>
                    </div>`;

                    this._cslBibRef.querySelector('#copyBibliographyText').addEventListener('click', (e) => {
                        let bibliographyContent = "";
                        for (let i = 0; i < ProjectStore.project.citations.length; i++) {
                            bibliographyContent += this._cslBibRef.querySelector(`#cslEntryContainer${i}`).innerText;
                        }
                        this._textPlain = bibliographyContent;
                        this._textHTML = `<div class="csl-bib-body" style="${this._format ? (this._format.linespacing != null ? (`line-height:${this._format.linespacing};`): ''): ''}${this._format ? (this._format.hangingindent != null ? (`text-indent:-${this._format.hangingindent}em;`): ''): ''}">${this._citationHTML.map(cslHTMLItem => `<div style="clear:left;${(this._format.entryspacing != null ? (`margin-bottom:${this._format.entryspacing}em;"`): '"')}>${cslHTMLItem}</div>`).join('')}</div>`;
                        var element = document.createElement('textarea');
                        element.value = this._textPlain;
                        this._cslBibRef.appendChild(element);
                        element.focus({
                            preventScroll: true
                        });
                        element.setSelectionRange(0, element.value.length);
                        document.execCommand('copy');
                        this._cslBibRef.removeChild(element);
                    });
                    
                    for (let i = 0; i < ProjectStore.project.citations.length; i++) {
                        this._cslBibRef.querySelector(`#copyCitationButton${i}`).addEventListener('click', (e) => {
                            this._textPlain = this._cslBibRef.querySelector(`#cslEntryContainer${i}`).innerText;
                            this._textHTML = `<div class="csl-bib-body" style="${this._format ? (this._format.linespacing != null ? (`line-height:${this._format.linespacing};`): ''): ''}${this._format ? (this._format.hangingindent != null ? (`text-indent:-${this._format.hangingindent}em;`): ''): ''}"><div style="clear:left;${(this._format.entryspacing != null ? (`margin-bottom:${this._format.entryspacing}em;"`): '"')}>${this._citationHTML[i]}</div></div>`;
                            var element = document.createElement('textarea');
                            element.value = this._textPlain;
                            this._cslBibRef.appendChild(element);
                            element.focus({
                                preventScroll: true
                            });
                            element.setSelectionRange(0, element.value.length);
                            document.execCommand('copy');
                            this._cslBibRef.removeChild(element);
                        });
                    }
                    return this._cslBibRef;
                }
            }
        }
    }

    attributeChangedCallback() {
        this.render();
    }
    connectedCallback() {
        this.addEventListener('copy', this._copyToClipboard);
        this.render();
    }

    disconnectedCallback() {
        this.removeEventListener('copy', this._copyToClipboard);
    }

    render() {
        return this.html`
        <div>
            ${ProjectStore.project.citations.length === 0 ? this.html`<p>This bibliography looks a little empty. You can create a new citation from the menu.</p>`: ``}
            ${{
                any: this.generatePreview(),
                placeholder: ProjectStore.project.citations.length > 0 ? this.html`<p>Loading...</p>`: ``
            }}
        </div>`;
    }
}
  
customElements.define('cloudcite-bibliography', CloudCiteBibliography);
  
export default CloudCiteBibliography;