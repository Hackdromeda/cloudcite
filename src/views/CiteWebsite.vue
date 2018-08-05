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
                <sui-input style="margin-right: 1vh;" v-model="websiteCitationData.url" placeholder="Enter website link" @keyup.enter="citeURL()"/>
                <sui-button type="button" @click="citeURL()">Cite</sui-button>
            </div>
            <moon-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="loadingCitation" color="#005eea"></moon-loader>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import WebsiteCitation from '../WebsiteCitation';
//@ts-ignore
import rp from 'request-promise-native';
import Preview from '../components/Preview.vue';
//@ts-ignore
import debounce from 'lodash/debounce';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
//@ts-ignore
import * as  _ from 'lodash/core';

@Component({
  components: {
    Preview,
    MoonLoader
  },
  data () {
      return {
        loadingCitation: false,
        //@ts-ignore
        websiteCitationData: new WebsiteCitation([{given: "", middle: "", family: "", type: "Author"}], "", "", "", "", {month: "", day: "", year: ""}, {month: "", day: "", year: ""}, ('Website/' + this.$store.getters.getCitations.filter(c => c.id.includes('Website')).length))
      }
  },
  methods: {
      formatURL(url: string) {
        var newURL: string = ""
        switch (url.substring(0, 7)) {
            case 'https:/':
                newURL = url.substring(8, url.length)
                break;
            case 'http://':
                newURL =  url.substring(7, url.length)
                break;
            default:
                newURL = url
        }
        if (newURL.substring(0, 4) == "www.") {
            newURL = newURL.substring(4, newURL.length)
        }
        return newURL
      },
      citeURL() {
        this.$data.loadingCitation = true
        rp({
                uri: 'https://api.cloudcite.net/autofill',
                headers: {
                    'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                },
                method: 'POST',
                //@ts-ignore
                body: {"url": (this.websiteCitationData.url.substring(0, 4) == 'http') ? this.websiteCitationData.url: ('http://' + this.websiteCitationData.url), "format": "website"},
                json: true
                //@ts-ignore
        }).then(data => {
            console.log(data)
            //@ts-ignore
            var contributors = [];
            if (data.author && data.author.length > 0) {
                //@ts-ignore
                data.author.forEach(author => {
                    //@ts-ignore
                    contributors.push({given: author.given ? author.given: "", middle: author.given ? (author.given.split(" ").length == 2 ? author.given.split(" ")[1]: ""): "", family: author.family ? author.family: "", type: "Author"})
                });
            }
            if (contributors.length == 0) {
                contributors.push({given: "", middle: "", family: "", type: "Author"})
            }
            //@ts-ignore
            this.$data.websiteCitationData = new WebsiteCitation(contributors, data.source ? data.source: "", data.title ? data.title: "", this.websiteCitationData.url ? this.formatURL(this.websiteCitationData.url): "", data.publisher ? data.publisher: "", {month: "", day: "", year: ""}, data.issued ? data.issued: {month: "", day: "", year: ""}, ('Website/' + this.$store.getters.getCitations.filter(c => c.id.includes('Website')).length))
            this.$data.loadingCitation = false
            //@ts-ignore
            this.$store.dispatch('setEditingProject', this.$data.websiteCitationData)
            this.$router.push({path: '/edit/website/'})
            //@ts-ignore
        }).catch(error => {
            console.log(error)
            this.$data.loadingCitation = false
        })
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