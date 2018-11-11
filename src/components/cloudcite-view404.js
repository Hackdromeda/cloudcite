import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';

class NotFoundView extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      <section style="text-align: center;">
        <h1 style="font-size: 35px;">Page Not Found</h1>
        <p><span style="font-weight: bold;">${window.location.href}</span> cannot be found. Please try another url or visit <a style="color: #3f51b5; text-decoration: none;" href="/" rel="noopener noreferrer">https://nightly.cloudcite.net/</a>.</p>
      </section>
    `;
  }
}

window.customElements.define('cloudcite-view404', NotFoundView);
