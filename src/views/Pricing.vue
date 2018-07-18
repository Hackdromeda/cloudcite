<template>
  <div>
    <section class="hero is-primary" style="min-height: 35vh;">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-size-2">Pricing</h1>
          <h2 class="subtitle" style="margin-top: 10vh;">
            CloudCite is free forever and open source.
          </h2>
        </div>
      </div>
    </section>
  <div id="pricing">
    <div class="pricing-table is-comparative">
      <div class="pricing-plan is-features">
        <div class="plan-header">Features</div>
        <div class="plan-price"><span class="plan-price-amount">&nbsp;</span></div>
        <div class="plan-items">
          <div class="plan-item">Citations</div>
          <div class="plan-item">API</div>
          <div class="plan-item">License</div>
          <div class="plan-item">Ads</div>
          <div class="plan-item">Tracking/Analytics</div>
          <div class="plan-item">Security</div>
          <div class="plan-item">Autofill</div>
          <div class="plan-item">Requirements</div>
          <div class="plan-item">Export and Import<br><br><br></div>
          <div class="plan-item">Style Accuracy</div>
          <div class="plan-item">App and Extensions</div>
          <div class="plan-item">Advanced Features<br><br></div>
        </div>
        <div class="plan-footer"></div>
      </div>
      <div class="pricing-plan is-active">
      <div class="plan-header">CloudCite</div>
      <div class="plan-price"><span class="plan-price-amount">Free Forever</span></div>
      <div class="plan-items">
        <div class="plan-item" data-feature="Citations">FREE</div>
        <div class="plan-item" data-feature="API">FREE</div>
        <div class="plan-item" data-feature="License"><a href="https://github.com/Hackdromeda/cloudcite/blob/master/LICENSE" target="_blank"><img src="/static/License-AGPL v3-blue.svg"/></a></div>
        <div class="plan-item" data-feature="Ads">100% Ad-Free and Popup-Free</div>
        <div class="plan-item" data-feature="Tracking">No Third-Party Tracking</div>
        <div class="plan-item" data-feature="Secure"><a href="https://www.websecurity.symantec.com/security-topics/what-is-ssl-tls-https" target="_blank">SSL, TLS</a>, <a href="https://securityheaders.com/?q=cloudcite.net&followRedirects=on" target="_blank">HSTS, and Strong Security Headers</a></div>
        <div class="plan-item" data-feature="Autofill">Fast and Accurate</div>
        <div class="plan-item" data-feature="Requirements">No account creation or downloads required.</div>
        <div class="plan-item" data-feature="Export and Import">Exports to clipboard, .DOC, .DOCX, and .PDF<br>Exports to Google Drive, Dropbox, and OneDrive<br>Imports CSL-JSON and BibTeX.</div>        
        <div class="plan-item" data-feature="Style Accuracy">Powered by the same <a href="https://citationstyles.org/">Citation Style Language (CSL) styles</a> competitors use</div>
        <div class="plan-item" data-feature="Apps and Extensions">FREE (Coming Soon)</div>
        <div class="plan-item" data-feature="Advanced Features">CloudCite offers the following advanced features:<br>Quick Cite - we suggest additional sources to quickly add to your bibliography using topic analysis<br>Source Analysis - we make sure you are using reliable sources</div>
      </div>
      <div class="plan-footer">
        <a class="button is-fullwidth" href="https://github.com/Hackdromeda/cloudcite" target="_blank">View Source Code</a>
      </div>
    </div>

      <div class="pricing-plan is-danger">
        <div class="plan-header">Most Other Citation Services</div>
        <div class="plan-price"><span class="plan-price-amount">Up to <span class="plan-price-currency">$</span>9.99</span>/month</div>
        <div class="plan-items">
          <div class="plan-item" data-feature="Citations">PAID (Only MLA is FREE)</div>
          <div class="plan-item" data-feature="API">Limited, Potential Fees, or Non-Existant</div>
          <div class="plan-item" data-feature="Proprietary">Proprietary</div>
          <div class="plan-item" data-feature="Ads">Ads with unavoidable popups on FREE account</div>
          <div class="plan-item" data-feature="Tracking">Third-Party Tracking on ALL accounts</div>
          <div class="plan-item" data-feature="Weak Security">No SSL, Mixed Content, or Weak Security Settings</div>
          <div class="plan-item" data-feature="Autofill">Slower and Often Inaccurate</div>
          <div class="plan-item" data-feature="Requirements">Some require software download. Some require account creation.</div>
          <div class="plan-item" data-feature="Export and Import">Export to certain formats is often a PAID feature.<br>Imports rarely supported.</div>        
          <div class="plan-item" data-feature="Style Accuracy">CSL is used by other products such as <a href="https://easybib.com/">EasyBib</a>, <a href="https://www.citethisforme.com/">Cite This For Me</a>, <a href="https://www.citethisforme.com/">Papers</a>, and <a href="https://www.mendeley.com/">Mendeley</a>.<br>To see if the your citation service uses CSL, visit <a href="https://citationstyles.org/">the Citation Style Language (CSL) website</a>.</div>
          <div class="plan-item" data-feature="Apps and Extensions">Limited or PAID</div>
          <div class="plan-item" data-feature="Advanced Features">N/A<br> <br> </div>
        </div>
        <div class="plan-footer">
          <a class="button is-fullwidth" href="/">Switch to CloudCite</a>
        </div>
      </div>
    </div>
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
