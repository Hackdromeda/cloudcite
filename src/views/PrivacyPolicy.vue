<template>
  <div class="content" id="privacyPolicy">
        <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">
                <h1 id="policy">Privacy Policy</h1>
                <p>The Privacy Policy was last updated on July 7, 2018. CloudCite and its developers may without notice to you and at its sole discretion, amend this policy. Please review this policy from time to time.</p>
                <h6>CloudCite can collect the following information and/or perform the following actions automatically:</h6>
                <ol>
                    <li>Read and write logs which may contain session information and error messages</li>
                    <li>Connection Information (IP Addresses)</li>
                    <li>Record information provided by the user and any user interactions with CloudCite</li>
                    <li>Use cookies to store and retrieve session and user information</li>
                    <li>Use tracking and analytics to improve the service and record session information</li>
                </ol>
                <p>We are committed to protecting the privacy and confidentiality of CloudCite users' private data. We do not use any third party tracking services on this site. There are no ads on our site.</p>
                <p>We do not sell or trade to outside parties your personal information. We also do not transfer this information without your express consent. We do not sell or offer third-party products or services on our service.</p>
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
</style>
