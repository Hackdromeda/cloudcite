import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

class PrivacyPolicy extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      <section>
        <h2>Privacy Policy</h2>
        <p>The Privacy Policy was last updated on August 28, 2018. CloudCite and its developers may without notice to you and at its sole discretion, amend this policy. Please review this policy from time to time. This information may not apply in its entirety to alpha or beta versions of CloudCite.</p>
        <h5>CloudCite takes privacy very seriously. Here are some of the steps we take to protect your privacy:</h6>
        <ol>
            <li>We use <a href="https://www.websecurity.symantec.com/security-topics/what-is-ssl-tls-https" target="_blank" rel="noreferrer">Secure Sockets Layer (SSL)/Transport Layer Security (TLS)</a> to safeguard your information from being modified while being transferred to and from our APIs, servers, and/or databases.</li>
            <li>We use an HTTP Strict Transport Security (HSTS) policy which forces all server, API, and database requests and responses to pass through encrypted Hyper Text Transfer Protocol Secure (HTTPS) connections instead of plain text HTTP.</li>
            <li>We use Auth0 token-based authentication so you can rest assured your password and personal information is protected</li>
            <li>We do not use popup ads or force you to click on ads</li>
            <li>Only Hackdromeda team members can access the CloudCite database. Project contributors cannot see your data.</li>
        </ol>
        <h5>CloudCite can collect the following information and/or perform the following actions automatically:</h6>
        <ol>
            <li>Read and write logs which may contain session information and error messages</li>
            <li>Record information provided by the user and any user interactions with CloudCite</li>
            <li>Use cookies to store and retrieve session and user information</li>
            <li>Connect with our APIs, which may consume third party APIs</li>
            <li>Use our own tracking tools and analytics to improve the service and record session information</li>
            <li>Get basic session information for CloudFlare DDoS protection</li>
        </ol>
        <p>We are committed to protecting the privacy and confidentiality of CloudCite users' private data.</p>
        <p>We do not sell or trade to outside parties your personal information. We also do not transfer this information without your express consent. We do not sell or offer third-party products or services on our service.</p>
        <ol>
            <li><b>Consent Withdrawal:</b> To withdraw your consent on any of the data being stored by CloudCite, click on the help button on our site or email us at help@cloudcite.net.</li>
            <li><b>Data Portability:</b> CloudCite supports several data export formats. For help with exporting your data, click on the help button on our site or email us at help@cloudcite.net.</li>
            <li><b>Data Deletion:</b> CloudCite can completely delete your account, projects, and any information upon your request. To request data deletion, click on the help button on our site or email us at <a href="mailto:help@cloudcite.net">help@cloudcite.net</a>.</li>
        </ol>
        <p>By using our service, you hereby consent to our <a href="https://cloudcite.net/privacy/" rel="noreferrer">Privacy Policy</a>, our Terms of Use and agree to any applicable Terms and Conditions including those of the APIs used.</p>
      </section>
    `;
  }
}

window.customElements.define('privacy-policy', PrivacyPolicy);
