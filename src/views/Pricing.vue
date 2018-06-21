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
    </div>
    <div class="plan-footer"></div>
  </div>
  <div class="pricing-plan is-active">
    <div class="plan-header">CloudCite</div>
    <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>0</span>/month</div>
    <div class="plan-items">
      <div class="plan-item" data-feature="Citations">FREE</div>
      <div class="plan-item" data-feature="API">FREE</div>
    </div>
    <div class="plan-footer">
      <button class="button is-fullwidth" disabled="disabled">Always Free</button>
    </div>
  </div>
    <div class="pricing-plan">
      <div class="plan-header">Other Citation Services</div>
      <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>Unknown</span>/month</div>
      <div class="plan-items">
        <div class="plan-item" data-feature="Citations">Unknown</div>
        <div class="plan-item" data-feature="API">Unknown</div>
      </div>
      <div class="plan-footer">
        <button class="button is-fullwidth">Choose</button>
      </div>
      </div>
    </div>
  </div>
  </div>      
</template>
   
<style scoped lang="scss">
  .pricing {
    padding: 20px;
    min-height: 100vh;
    background-color: #fff;
  }
  .title{
    color: #000;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cite from '@/components/Cite.vue';

@Component({
  components: {
    Cite
  },
})
export default class Home extends Vue {}
</script>
