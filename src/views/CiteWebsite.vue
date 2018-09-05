<template>
    <div id="citeWebsite">
            <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
                <div class="container" style="padding: 7vh;">
                    <h1>Cite a Website</h1>
                    <h2 class="subtitle" style="margin-top: 10vh;">
                        You can start citing a website by typing the website link and clicking on cite.
                    </h2>
                </div>
            </div>
            <div style="margin-top: 5vh;">
                <sui-input style="margin-right: 1vh;" v-model="URL" placeholder="Enter website link" @keyup.enter="citeURL()" ref="websiteInput"/>
                <sui-button type="button" :loading="loadingCitation" @click="citeURL()">Cite</sui-button>
            </div>
            <div style="margin-top: 3vh;">
                <sui-button style="background-color: #005eea; color: #fff;" type="button" @click="citeEmpty()" size="mini">Manual Citation</sui-button>
            </div>
            <bounce-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="loadingCitation" color="#005eea"/>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import generateCitation from '../functions/generateCitation';
//@ts-ignore
import rp from 'request-promise-native';
import Preview from '../components/Preview.vue';
//@ts-ignore
import debounce from 'lodash/debounce';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
//@ts-ignore
import * as  _ from 'lodash/core';

@Component({
  components: {
    Preview,
    BounceLoader
  },
  mounted() {
    //@ts-ignore
    this.$refs.websiteInput.$el.children[0].focus();
  },
  data () {
      return {
        loadingCitation: false,
         //@ts-ignore
        websiteCitationData: {"type": "website", "contributors": [{given: "", middle: "", family: "", type: "Author"}], source: "", title: "", URL: "", publisher: "", accessed: {month: "", day: "", year: ""}, issued: {month: "", day: "", year: ""}, id: 'citation-' + this.$store.getters.getCitations.length},
        URL: null
      }
  },
  methods: {
      formatURL(URL: string) {
        var newURL: string = ""
        switch (URL.substring(0, 7)) {
            case 'https:/':
                newURL = URL.substring(8, URL.length)
                break;
            case 'http://':
                newURL =  URL.substring(7, URL.length)
                break;
            default:
                newURL = URL
        }
        if (newURL.substring(0, 4) == "www.") {
            newURL = newURL.substring(4, newURL.length)
        }
        return newURL
      },
      citeURL() {
          if (this.$data.URL && this.$data.URL.length > 0) {
              this.$data.loadingCitation = true
              rp({
                uri: 'https://api.cloudcite.net/autofill',
                headers: {
                    'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                },
                method: 'POST',
                //@ts-ignore
                body: {"URL": (this.$data.URL.substring(0, 4) == 'http') ? this.$data.URL: ('http://' + this.$data.URL), "format": "website"},
                json: true
                //@ts-ignore
                }).then(data => {
                    //@ts-ignore
                    data.URL = this.formatURL(this.$data.URL)
                    //@ts-ignore
                    data.contributors = [];
                    if (data.author && data.author.length > 0) {
                        //@ts-ignore
                        data.author.forEach(author => {
                            //@ts-ignore
                            data.contributors.push({given: author.given ? author.given.split(" ")[0]: "", middle: author.given ? (author.given.split(" ").length == 2 ? author.given.split(" ")[1]: ""): "", family: author.family ? author.family: "", type: "Author"})
                        });
                    }
                    if (data.contributors.length == 0) {
                        data.contributors.push({given: "", middle: "", family: "", type: "Author"})
                    }
                    const id = ('citation-' + this.$store.getters.getCitations.length)
                    const citation = generateCitation(id, "website", data)
                    this.$data.loadingCitation = false
                    //@ts-ignore
                    this.$store.dispatch('setEditingCitation', citation.toObject())
                    this.$router.push({path: '/edit/website/'})
                    //@ts-ignore
                }).catch(error => {
                    console.log(error)
                    this.$data.loadingCitation = false
                })
        }
    },
    citeEmpty() {
        //@ts-ignore
        this.$store.dispatch('setEditingCitation', this.$data.websiteCitationData)
        this.$router.push({path: '/edit/website/'})
    }
  }
})
export default class CiteWebsite extends Vue {}
</script>

<style scoped lang="scss">
#citeWebsite {
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
</style>