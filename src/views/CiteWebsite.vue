<template>
    <div id="citeWebsite">
        <div v-if="!citationStarted">
            <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
                <div class="container" style="padding: 7vh;">
                    <h1>Cite a Website</h1>
                    <h2 class="subtitle" style="margin-top: 10vh;">
                        You can start citing a website by typing the website link and clicking on cite.
                    </h2>
                </div>
            </div>
            <div class="is-hidden-tablet" style="display: inline-flex;">
                <b-input style="padding-left: 5vh; padding-right: 2vh;" v-model="websiteCitationData.url" type="url" placeholder="Enter website link" @keyup.enter.native="citeURL()" :loading="loadingCitation"/>
                <a class="button is-primary" style="margin-right: 5vh;" @click="citeURL()">Cite</a>
            </div>
            <div class="is-hidden-mobile">
                <input id="websiteInput" v-model="websiteCitationData.url" type="url" placeholder="Enter website link" @keyup.enter="citeURL()"/>
                <a style="width: 10vh; height: 7vh; margin-left: 2vh;" class="button is-primary" @click="citeURL()">Cite</a>
            </div>
            <div v-if="loadingCitation">
                <moon-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="loadingCitation" color="#005eea"></moon-loader>
            </div>
        </div>
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

@Component({
  components: {
    Preview,
    MoonLoader
  },
  data () {
      return {
        loadingCitation: false,
        websiteCitationData: new WebsiteCitation([{given: "", middle: "", family: "", type: "Author"}], "", "", "", "", {month: null, day: null, year: null})
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
            this.$data.websiteCitationData = new WebsiteCitation(contributors, data.source ? data.source: "", data.title ? data.title: "", this.websiteCitationData.url ? this.formatURL(this.websiteCitationData.url): "", data.publisher ? data.publisher: "", data.issued ? data.issued: {month: "", day: "", year: ""})
            this.$data.loadingCitation = false
            //@ts-ignore
            this.$store.dispatch('setEditing', this.$data.websiteCitationData)
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
#websiteInput {
  padding: 5px;
  min-width: 20vh;
  min-height: 7vh;
  border-style: solid;
  background-color: #fff;
  caret-color: #000;
  border-radius: 5px;
  font-size: 1.3rem;
}
#websiteInput::placeholder {
    font-size: 1rem;
    color: #9ea7aa;
}
#websiteInput:focus {
    border-color: #0064ff;
}
input {
    padding: 5px;
    width: 20vh;
    height: 5vh;
    border-style: solid;
    background-color: #fff;
    caret-color: #000;
    border-radius: 5px;
    font-size: 1.05rem;
}
input::placeholder {
    font-size: 1rem;
    color: #9ea7aa;
}
input:focus {
    border-color: #0064ff;
}
#editFormTitle {
    color: #005eea;
}
#editForm {
    margin-left: 5vh;
    margin-right: 5vh;
}
#citeWebsite {
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
#nextColumn {
    transform: translate(0, 35%);
}
#removeContributorButton {
    color: red;
}
#addContributorButton {
    color: #005eea;
}
#submitFormDiv {
    text-align: left;
    margin: 5vh;
}
@media (max-width: 991.97px) {
    #websiteInput {
        width: 35vh;
    }
}
@media (min-width: 991.98px) {
    #editForm {
        padding-left: 20%;
        padding-right: 20%;
    }
    #websiteInput {
        width: 60vh;
    }
}
</style>