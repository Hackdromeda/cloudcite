/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';
import './cloudcite-bibliography';

class MainView extends PageViewElement {

  render() {
    return html`
      ${SharedStyles}
      <section>
        <h2>Cite</h2>
      </section>
      <section>
        <h2>Bibliography</h2>
        <div style="display: flex;">
          <cloudcite-bibliography></cloudcite-bibliography>
        </div>
      </section>
      <section>
        <h2>About CloudCite</h2>
        <p>CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago, Turabian, Harvard, IEEE, and Vancouver. You can contribute to CloudCite and support the longevity of this project by visiting the contribute page and either donating through a supported platform or lending us your coding skills. Disabling ad-block and interacting with ads placed on the contribute page and our blog also helps support this project. We have no ads throughout the bibliography generation process to provide a focused experience. Learn more about our commitment to a privacy on our <a href="https://cloudcite.net/privacy" target="_blank" rel="noopener noreferrer">privacy page</a> and about our the distraction-free bibliography generation environment we wanted to exist in the universe on our <a href="https://cloudcite.net/about" target="_blank" rel="noopener noreferrer">about us</a> page.</p>
      </section>
    `;
  }
}

window.customElements.define('main-view', MainView);
