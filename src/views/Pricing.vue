<template>
  <div>
    <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
      <div class="container" style="padding: 7vh;">
        <h1>Pricing</h1>
        <h2 class="subtitle" style="margin-top: 10vh;">
          CloudCite is free forever and open source.
        </h2>
      </div>
    </div>
  <div id="pricing">
    <sui-table celled>
    <sui-table-header>
      <sui-table-row>
        <sui-table-header-cell>Citations Service</sui-table-header-cell>
        <sui-table-header-cell>Citations</sui-table-header-cell>
        <sui-table-header-cell>License</sui-table-header-cell>
        <sui-table-header-cell>Ads</sui-table-header-cell>
        <sui-table-header-cell>Tracking/Analytics</sui-table-header-cell>
        <sui-table-header-cell>Security</sui-table-header-cell>
        <sui-table-header-cell>Autofill</sui-table-header-cell>
        <sui-table-header-cell>Requirements</sui-table-header-cell>
        <sui-table-header-cell>Export and Import</sui-table-header-cell>
        <sui-table-header-cell>Style Accuracy</sui-table-header-cell>
      </sui-table-row>
    </sui-table-header>
    <sui-table-body>
      <sui-table-row>
        <sui-table-cell>CloudCite</sui-table-cell>
        <sui-table-cell>FREE</sui-table-cell>
        <sui-table-cell><a href="https://github.com/Hackdromeda/cloudcite/blob/master/LICENSE" target="_blank"><img src="/static/License-AGPL v3-blue.svg"/></a></sui-table-cell>
        <sui-table-cell>100% Ad-Free and Popup-Free</sui-table-cell>
        <sui-table-cell>No Third-Party Tracking</sui-table-cell>
        <sui-table-cell><a href="https://www.websecurity.symantec.com/security-topics/what-is-ssl-tls-https" target="_blank">SSL, TLS</a>, <a href="https://securityheaders.com/?q=cloudcite.net&followRedirects=on" target="_blank">HSTS, and Strong Security Headers</a></sui-table-cell>
        <sui-table-cell>Fast and Accurate</sui-table-cell>
        <sui-table-cell>No account creation or downloads required</sui-table-cell>
        <sui-table-cell>Exports to clipboard, .DOC, .DOCX, and .PDF, Google Drive, Dropbox, and OneDrive. Imports CSL-JSON and BibTeX.</sui-table-cell>
        <sui-table-cell>Powered by the same <a href="https://citationstyles.org/">Citation Style Language (CSL) styles</a> competitors use</sui-table-cell>
      </sui-table-row>
      <sui-table-row>
        <sui-table-cell>Most Other Competitors</sui-table-cell>
        <sui-table-cell>Up to $9.99/month</sui-table-cell>
        <sui-table-cell>Limited, Potential Fees, or Non-Existant</sui-table-cell>
        <sui-table-cell>Ads with unavoidable popups on FREE account</sui-table-cell>
        <sui-table-cell>Third-Party Tracking on ALL accounts</sui-table-cell>
        <sui-table-cell>No SSL, Mixed Content, or Weak Security Settings</sui-table-cell>
        <sui-table-cell>Slower and Often Inaccurate</sui-table-cell>
        <sui-table-cell>Some require software download. Some require account creation.</sui-table-cell>
        <sui-table-cell>Export to certain formats is often a PAID feature. Imports rarely supported.</sui-table-cell> 
        <sui-table-cell>Powered by the same <a href="https://citationstyles.org/">Citation Style Language (CSL) styles</a> competitors use</sui-table-cell>      
      </sui-table-row>
    </sui-table-body>
  </sui-table>
  </div>
</div>     
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Pricing extends Vue {}
</script>

<style scoped lang="scss">
  #pricing {
    min-height: 100vh;
    background-color: #fff;
    padding: 10vh;
  }
  .title{
    color: #000;
  }
</style>
