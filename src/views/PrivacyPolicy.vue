<template functional>
  <div class="content" id="privacyPolicy">
        <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">
                <h1 style="color: #000;">Privacy Policy</h1>
                <p>The Privacy Policy was last updated on August 28, 2018. CloudCite and its developers may without notice to you and at its sole discretion, amend this policy. Please review this policy from time to time. This information may not apply in its entirety to alpha or beta versions of CloudCite.</p>
                <h6>CloudCite takes privacy very seriously. Here are some of the steps we take to protect your privacy:</h6>
                <ol>
                    <li>We use <a href="https://www.websecurity.symantec.com/security-topics/what-is-ssl-tls-https" target="_blank">Secure Sockets Layer (SSL)/Transport Layer Security (TLS)</a> to safeguard your information from being modified while being transferred to and from our APIs, servers, and/or databases.</li>
                    <li>We use an HTTP Strict Transport Security (HSTS) policy which forces all server, API, and database requests and responses to pass through encrypted Hyper Text Transfer Protocol Secure (HTTPS) connections instead of plain text HTTP.</li>
                    <li>We use Auth0 token-based authentication so you can rest assured your password and personal information is protected</li>
                    <li>We do not use intrusive third party trackers such as Google Analytics. You may see your ad blocker blocking over 70 trackers and ads on our competitors sites.</li>
                    <li>We do not use popup or force you to click on ads</li>
                    <li>Only Hackdromeda team members can access the CloudCite database. Project contributors cannot see your data.</li>
                </ol>
                <h6>CloudCite can collect the following information and/or perform the following actions automatically:</h6>
                <ol>
                    <li>Read and write logs which may contain session information and error messages</li>
                    <li>Record information provided by the user and any user interactions with CloudCite</li>
                    <li>Use cookies to store and retrieve session and user information</li>
                    <li>Connect with our APIs, which may consume third party APIs</li>
                    <li>Use our own tracking tools and analytics to improve the service and record session information</li>
                    <li>Get basic session information for CloudFlare DDoS protection</li>
                </ol>
                <p>We are committed to protecting the privacy and confidentiality of CloudCite users' private data. We do not use any third party tracking services on this site. There are no ads throughout the bibliography generation process. There are ads on our blog and contribution page.</p>
                <p>We do not sell or trade to outside parties your personal information. We also do not transfer this information without your express consent. We do not sell or offer third-party products or services on our service.</p>
                <ol>
                    <li><b>Consent Withdrawl:</b> To withdraw your consent on any of the data being stored by CloudCite, click on the help button on our site or email us at help@cloudcite.net.</li>
                    <li><b>Data Portability:</b> CloudCite supports several data export formats. For help with exporting your data, click on the help button on our site or email us at help@cloudcite.net.</li>
                    <li><b>Data Deletion:</b> CloudCite can completely delete your account, projects, and any information upon your request. To request data deletion, click on the help button on our site or email us at help@cloudcite.net.</li>
                </ol>
                <p>By using our service, you hereby consent to our <a href="/privacy/">Privacy Policy</a>, our <a href="https://github.com/Hackdromeda/cloudcite/blob/master/LICENSE" target="_blank">License</a>, our Terms of Use and agree to any applicable Terms and Conditions including those of the APIs used.</p>
            </div>
            <div class="column"></div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class PrivacyPolicy extends Vue {}
</script>

<style scoped lang="scss">
  #privacyPolicy {
    text-align: left;
    background-color: #fff;
    min-height: 100vh;
    padding: 20px;
  }
  h6 {
    font-size: 1.1rem;
  }
</style>
