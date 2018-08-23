<template>
  <div>
    <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
      <div class="container" style="padding: 7vh;">
        <h1>Contribute</h1>
        <h2 class="subtitle" style="margin-top: 10vh;">
          CloudCite is an AGPLv3 licensed open source project and completely free to use. However, the amount of effort needed to maintain CloudCite and its APIs, develop new features, and store your references is not sustainable without proper financial backing. You can support CloudCite development and maintenance costs via the following methods:
        </h2>
      </div>
    </div>
    <div id="contribute">
      <div id="financial">
          <h3>One-Time Donation</h3>
          <p>Buy us a coffee, lunch, or even a new computer through these channels:</p>
          <div id="one-time-donations" style="display: block;">
            <a href="https://www.paypal.me/avishah395" target="_blank">
              <img src="/static/images/paypal.png" style="width:100px">
            </a>
            <a @click="selectCoin('btc')"><svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38"><g fill="none" fill-rule="evenodd"><circle fill="#FFAD02" cx="19" cy="19" r="19"></circle><path d="M24.7 19.68a3.63 3.63 0 0 0 1.47-2.06c.74-2.77-.46-4.87-3.2-5.6l.89-3.33a.23.23 0 0 0-.16-.28l-1.32-.35a.23.23 0 0 0-.28.15l-.89 3.33-1.75-.47.88-3.32a.23.23 0 0 0-.16-.28l-1.31-.35a.23.23 0 0 0-.28.15l-.9 3.33-3.73-1a.23.23 0 0 0-.27.16l-.36 1.33c-.03.12.04.25.16.28l.22.06a1.83 1.83 0 0 1 1.28 2.24l-1.9 7.09a1.83 1.83 0 0 1-2.07 1.33.23.23 0 0 0-.24.12l-.69 1.24a.23.23 0 0 0 0 .2c.02.07.07.12.14.13l3.67.99-.89 3.33c-.03.12.04.24.16.27l1.32.35c.12.03.24-.04.28-.16l.89-3.32 1.76.47-.9 3.33c-.02.12.05.24.16.27l1.32.35c.12.03.25-.04.28-.16l.9-3.32.87.23c2.74.74 4.83-.48 5.57-3.25.35-1.3-.05-2.6-.92-3.48zm-5.96-5.95l2.64.7a1.83 1.83 0 0 1 1.28 2.24 1.83 1.83 0 0 1-2.23 1.3l-2.64-.7.95-3.54zm1.14 9.8l-3.51-.95.95-3.54 3.51.94a1.83 1.83 0 0 1 1.28 2.24 1.83 1.83 0 0 1-2.23 1.3z" fill="#FFF"></path></g></svg>
          BTC</a>
            <a @click="selectCoin('bch')"><svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38"><g fill="none" fill-rule="evenodd"><circle fill="#8DC451" cx="19" cy="19" r="19"></circle><path d="M24.5 16.72c.37-.76.48-1.64.25-2.52-.75-2.76-2.84-3.98-5.58-3.25l-.89-3.32a.23.23 0 0 0-.28-.16l-1.32.35a.23.23 0 0 0-.16.27l.9 3.33-1.76.47-.9-3.32a.23.23 0 0 0-.27-.16l-1.32.35a.23.23 0 0 0-.16.28l.9 3.32-3.74 1a.23.23 0 0 0-.16.29l.35 1.32c.04.12.16.2.28.17l.22-.06c.97-.26 1.97.32 2.23 1.3l1.9 7.08c.25.93-.25 1.87-1.13 2.2a.23.23 0 0 0-.14.21l.02 1.43c0 .07.04.13.1.18.05.04.12.05.19.04l3.67-.99.9 3.33c.03.12.15.19.27.15l1.31-.35c.12-.03.2-.16.16-.28l-.88-3.32 1.75-.47.9 3.33c.03.12.15.19.27.15l1.32-.35c.12-.03.19-.16.16-.28l-.9-3.32.88-.24c2.75-.73 3.95-2.83 3.2-5.6a3.63 3.63 0 0 0-2.54-2.56zm-8.13-2.17l2.63-.7c.97-.26 1.97.32 2.23 1.3.27.97-.3 1.98-1.28 2.24l-2.63.7-.95-3.54zm5.88 7.91l-3.5.94-.96-3.54 3.51-.94c.97-.26 1.97.32 2.24 1.3.26.98-.32 1.98-1.29 2.24z" fill="#FFF"></path></g></svg>
          BCH</a>
            <a @click="selectCoin('eth')"><svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><ellipse cx="16" cy="16" fill="#6F7CBA" rx="16" ry="16"></ellipse><path fill="#FFF" d="M10.13 17.76c-.1-.15-.06-.2.09-.12l5.49 3.09c.15.08.4.08.56 0l5.58-3.08c.16-.08.2-.03.1.11L16.2 25.9c-.1.15-.28.15-.38 0l-5.7-8.13zm.04-2.03a.3.3 0 0 1-.13-.42l5.74-9.2c.1-.15.25-.15.34 0l5.77 9.19c.1.14.05.33-.12.41l-5.5 2.78a.73.73 0 0 1-.6 0l-5.5-2.76z"></path></g></svg>
          ETH</a>
            <a @click="selectCoin('ltc')"><svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38"><g fill="none" fill-rule="evenodd"><circle cx="19" cy="19" r="19" fill="#B5B5B5" fill-rule="nonzero"></circle><path fill="#FFF" d="M12.29 28.04l1.29-5.52-1.58.67.63-2.85 1.64-.68L16.52 10h5.23l-1.52 7.14 2.09-.74-.58 2.7-2.05.8-.9 4.34h8.1l-.99 3.8z"></path></g></svg>
          LTC
            </a>
        </div>
        <div v-if="showCoin" id="coin-details">
          <p>{{ selectedCoin.name }} Address:<br> {{ selectedCoin.address }} </p>
          <img v-bind:src="selectedCoin.path">
        </div>
        <div id="recurring-dontaions">
          <h3>Recurring Pledge</h3>
          <p>Donate a fixed amount with each release. You can support us through Patreon or OpenCollective.</p>
          <div id="one-time-donations" style="display: block;">
            <a href="https://patreon.com/cloudcite" target="_blank">
              <img src="/static/images/patreon-min.png" style="width:38px">
            </a>
            <a href="https://opencollective.com/cloudcite" target="_blank">
              <img src="/static/images/open-collective.jpg" style="width:38px">
            </a>
          </div>            
        </div>
      </div>
      <div id="code">
          <h3>Contribute Code</h3>
            <p>Help us with features and bugs listed on our <a href="https://github.com/Hackdromeda/cloudcite/projects" target="_blank">GitHub Project Board</a>.</p>
            <br>
            <a href="https://github.com/Hackdromeda/cloudcite/" target="_blank">
              <img src="/static/images/GitHub-Mark-32px.png" style="width:38px">
            </a>
      </div>
      <div id="free">
          <h3>Contribute At No Cost</h3>
          <p>Consider disabling your ad blocker on this website. Our ads are only on our blog and the contribute page and will not disrupt your bibliography generation experience. Interacting with the ads helps us support future development of CloudCite.</p>
          <br>
          <Adsense
              data-ad-client="ca-pub-2986930095691189"
              data-ad-slot="7189901520">
          </Adsense>
          <InArticleAdsense
              data-ad-layout="in-article"
              data-ad-format="fluid"
              data-ad-client="ca-pub-2986930095691189"
              data-ad-slot="6356638910">
          </InArticleAdsense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  data () {
    return {
      showCoin: false,
      selectedCoin: "",
      coins: {
        btc: {
          name: 'Bitcoin',
          address: '38u5tfyvvriPHGQkbmvrM9NCfGGgKt7frk',
          path: '/static/images/coin-btc.png'
        },
        bch: {
          name: 'Bitcoin Cash',
          address: 'qzft6en4u4n7uta42ne0dhu7m5c586feuqjcu4gdxh',
          path: '/static/images/coin-bch.png'
        },
        eth: {
          name: 'Ethereum',
          address: '0xB2207a0Ff0280347F72aa300650DA1d26e556c32',
          path: '/static/images/coin-eth.png'
        },
        ltc: {
          name: 'Litecoin',
          address: 'MHjvwcVwASaVPQYrfUB6fDiV6UggzuYa6P',
          path: '/static/images/coin-ltc.png'
        }
      }
    }
  },
  methods: {
    selectCoin(coin: string) {
      this.$data.selectedCoin = this.$data.coins[coin]
      this.$data.showCoin = true;
    }
  }
})
export default class About extends Vue {}
</script>
<style scoped lang="scss">
  #contribute {
    padding: 10px;
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
    color: #000;

    h1 {
      color: #000;
    }
    h2 {
      color: #000;
    }
    h3 {
      color: #000;
    }
    p {
      text-align: center;
      padding-left: 20%;
      padding-right: 20%;
    }
  }
  #one-time-donations a,
  #one-time-donations svg {
    display: inline-block;
    vertical-align: middle;
  }
  #one-time-donations a {
    margin: 20px;
    color: #34495e;
  }
  #one-time-donations svg {
    margin-right: 5px;
  }
  #coin-details {
    text-align: center;
    border-radius: 4px;
    padding: 30px;
    font-weight: bold;
  }
  #coin-details img {
    width: 200px;
  }
  #coin-details p {
    padding: 0;
    margin: 0 0 20px;
    word-break: break-all;
  }
</style>
