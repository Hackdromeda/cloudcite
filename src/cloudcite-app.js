import * as hyperHTML from 'hyperhtml';
import './cloudcite-preview.js';

class CloudCiteApp extends HTMLElement {
  static get observedAttributes() { return ['name']; }
  constructor(...args) {
    super(...args);
    //this.setAttribute('name', 'CloudCite')
    this.html = hyperHTML.bind(this.attachShadow({mode: 'closed'}));
  }
  attributeChangedCallback() { 
    this.render(); 
  }
  connectedCallback() {
    this.render();
  }
  render() {
    return this.html`
    <cloudcite-preview></cloudcite-preview>
    `;
  }
}
  
customElements.define('cloudcite-app', CloudCiteApp);
  //mc.setAttribute('name', 'Second');
  
export default CloudCiteApp;