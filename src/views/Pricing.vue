<template>
<div>
  <div class="pricing">
     <h1 class="title">Pricing</h1>
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
        <div class="plan-item">App and Extensions</div>
      </div>
      <div class="plan-footer"></div>
    </div>

    <div class="pricing-plan is-active">
      <div class="plan-header">CloudCite</div>
      <div class="plan-price"><span class="plan-price-amount">Free Forever</span></div>
      <div class="plan-items">
        <div class="plan-item" data-feature="Citations">FREE</div>
        <div class="plan-item" data-feature="API">FREE</div>
        <div class="plan-item" data-feature="License"><a href="https://github.com/avimshah/cloudcite/blob/master/LICENSE" target="_blank"><img src="static/License-AGPL v3-blue.svg"/></a></div>
        <div class="plan-item" data-feature="Ads">100% Ad-Free and Popup-Free</div>
        <div class="plan-item" data-feature="Tracking">No Third-Party Tracking</div>
        <div class="plan-item" data-feature="Secure"><a href="https://www.websecurity.symantec.com/security-topics/what-is-ssl-tls-https" target="_blank">SSL, TLS</a>, <a href="https://securityheaders.com/?q=cloudcite.net&followRedirects=on" target="_blank">HSTS, and Strong Security Headers</a></div>
        <div class="plan-item" data-feature="Autofill">Fast and Accurate</div>
        <div class="plan-item" data-feature="Apps-and-Extensions">FREE (Coming Soon)</div>
      </div>
      <div class="plan-footer">
        <a class="button is-fullwidth" href="https://github.com/avimshah/cloudcite" target="_blank">View Source Code</a>
      </div>
    </div>

      <div class="pricing-plan is-danger">
        <div class="plan-header">Some Other Citation Services</div>
        <div class="plan-price"><span class="plan-price-amount">Up to <span class="plan-price-currency">$</span>9.99</span>/month</div>
        <div class="plan-items">
          <div class="plan-item" data-feature="Citations">PAID (Only MLA is FREE)</div>
          <div class="plan-item" data-feature="API">Limited, Potential Fees, or Non-Existant</div>
          <div class="plan-item" data-feature="Proprietary">Proprietary</div>
          <div class="plan-item" data-feature="Ads">Ads with unavoidable popups on FREE account</div>
          <div class="plan-item" data-feature="Tracking">Third-Party Tracking on ALL accounts</div>
          <div class="plan-item" data-feature="Weak-Security">No SSL, Mixed Content, or Weak Security Settings</div>
          <div class="plan-item" data-feature="Autofill">Slower and Often Inaccurate</div>
          <div class="plan-item" data-feature="Apps-and-Extensions">Limited or PAID</div>
        </div>
        <div class="plan-footer">
          <a class="button is-fullwidth" href="/" target="_blank">Switch to CloudCite</a>
        </div>
      </div>
    </div>
  </div>
</div>     
</template>
   
<style scoped lang="scss">
  .pricing {
    min-height: 100vh;
    background-color: #fff;
  }
  .title{
    color: #000;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Pricing extends Vue {}
</script>
