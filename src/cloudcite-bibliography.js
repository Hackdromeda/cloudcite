import * as hyperHTML from 'hyperhtml';
import removeEmptyFromObject from './functions/removeEmptyFromObject';
import generateCSL from './functions/generateCSL';
import generateHTML from './functions/generateHTML';
import clipboard from 'clipboard-polyfill';

class CloudCiteBibliography extends HTMLElement {
    static get observedAttributes() {
        return []
    }
    
    constructor(...args) {
        super(...args);
        this._citationStyle = 'modern-language-association';
        this._locale = 'locales-en-US';
        this._format = [];
        this._citationHTML = [];
        this._cslBibRef = null;
        this._copyCitationButton = null;
        this._citationData = {"id":"citation-0","type":"website","URL":"cloudcite.net","contributors":[{"given":"Naval","middle":"","family":"Patel","type":"Author"}],"source":null,"archive":null,"archive_location":null,"call-number":null,"container-title":"CloudCite","dimensions":null,"edition":null,"ISBN":null,"medium":null,"number-of-volumes":null,"number-of-pages":null,"volume":null,"title":"CloudCite · The Best Free Automatic Bibliography Generator · MLA, APA, Chicago, Harvard Citation Styles","title-short":null,"genre":null,"publisher":null,"publisher-place":null,"issued":{"month":8,"day":10,"year":2018},"accessed":{"month":9,"day":19,"year":2018},"abstract":"CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago."};
        this.html = hyperHTML.bind(this.attachShadow({mode: 'closed'}));
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

    async generatePreview() {
        let cslObject = await removeEmptyFromObject(this._citationData);
        const generatedHTML = await generateHTML({style: this._citationStyle, locale: this._locale, csl: await generateCSL(cslObject), lang: "en-US", cslHTML: []});
        if (generatedHTML && generatedHTML.error) {
            console.log(generatedHTML.error)
        } 
        else {
            this._format = generatedHTML.format;
            if (generatedHTML.html && generatedHTML.html.length > 0) {
                this._citationHTML = generatedHTML.html.map(htmlItem => htmlItem.html);
                this._cslBibRef = hyperHTML.wire()`
                <div class="csl-bib-body" style=${{lineHeight: this._format.linespacing, marginLeft: `${this._format.hangingindent}em`, textIndent: `-${this._format.hangingindent}em`, wordBreak: 'break-all'}}>
                    ${this._citationHTML.map(cslEntry =>
                        `<div id="cslEntryContainer" style="clear: left; margin-bottom: ${this._format.entryspacing}}">
                            ${cslEntry}
                        </div>
                        <button id="copyCitationButton">Copy Citation</button>`
                    )}
                </div>`;
                this._cslBibRef.querySelector('#copyCitationButton').addEventListener('click', async e => {
                    let dt = new clipboard.DT(); 
                    console.log(this._cslBibRef.querySelector('#cslEntryContainer').innerText)
                    dt.setData("text/plain", this._cslBibRef.querySelector('#cslEntryContainer').innerText);
                    console.log(this._format)
                    dt.setData("text/html", `<div class="csl-bib-body" style="${this._format ? (this._format.linespacing ? (`line-height:${this._format.linespacing};`): ''): ''} ${this._format ? (this._format.hangingindent ? (`text-indent:-${this._format.hangingindent}em;`): ''): ''}">${this._citationHTML.map(cslHTMLItem => `<div style="clear: left;${(this._format.entryspacing ? (`margin-bottom:${this._format.entryspacing}em;"`): '"')}>${cslHTMLItem}</div>`)}</div>`);
                    clipboard.write(dt);
                })
                return this._cslBibRef;
            }
        }
    }

    attributeChangedCallback() {
        this.render();
    }
    connectedCallback() {
        this.render();
    }

    render() {
        return this.html`
        <div style=${{backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '5px', textAlign: 'left', fontWeight: 'normal !important'}}>
            ${this.generatePreview()}
        </div>`;
    }
}
  
customElements.define('cloudcite-bibliography', CloudCiteBibliography);
  
export default CloudCiteBibliography;