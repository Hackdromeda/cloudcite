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
                <sui-button type="button" @click="citeEmpty()" basic primary size="mini">Manual Citation</sui-button>
            </div>
            <bounce-loader style="position: relative; margin-top: 10vh; left: 50%; right: 50%; transform: translateX(-30px)" :loading="loadingCitation" color="#005eea"/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { generateCitation } from '@/functions/generateCitation';
import { mapGetters } from 'vuex';
import { Citation } from '@/models/citation.model';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';

@Component({
    components: {
        BounceLoader
    }
})
export default class CiteWebsite extends Vue {
    loadingCitation: boolean = false;
    websiteCitationData: Citation = {type: "website", contributors: [{given: "", middle: "", family: "", type: "Author"}], source: "", title: "", URL: "", publisher: "", id: `citation-${this.$store.getters.getProjectCitations.length}`};
    URL: string = "";

    mounted() {
        //@ts-ignore
        this.$refs.websiteInput.$el.children[0].focus();
    }

    formatURL(URL: string) {
        let newURL: string;
        switch (URL.substring(0, 7)) {
            case 'https:/':
                newURL = URL.substring(8, URL.length);
                break;
            case 'http://':
                newURL =  URL.substring(7, URL.length);
                break;
            default:
                newURL = URL;
        }
        if (newURL.substring(0, 4) == "www.") {
            newURL = newURL.substring(4, newURL.length);
        }
        return newURL;
      }

    async citeURL() {
        if (this.$data.URL && this.$data.URL.length > 0) {
              this.$data.loadingCitation = true;
              const autofillData: any = await
                fetch('https://api.cloudcite.net/autofill', {
                    method: 'POST',
                    headers: {
                        'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
                    },
                    body: JSON.stringify({"URL": (this.$data.URL.substring(0, 4) == 'http') ? this.$data.URL: ('http://' + this.$data.URL), "format": "website"}),
                }).then(response => {
                    return response.json();
                });
                //@ts-ignore
                autofillData.URL = this.formatURL(this.$data.URL)
                //@ts-ignore
                autofillData.contributors = [];
                if (autofillData.author && autofillData.author.length > 0) {
                    //@ts-ignore
                    data.author.forEach(author => {
                        //@ts-ignore
                        data.contributors.push({given: author.given ? author.given.split(" ")[0]: "", middle: author.given ? (author.given.split(" ").length == 2 ? author.given.split(" ")[1]: ""): "", family: author.family ? author.family: "", type: "Author"})
                    });
                }
                if (autofillData.contributors.length == 0) {
                    autofillData.contributors.push({given: "", middle: "", family: "", type: "Author"})
                }
                const citation = generateCitation('website', autofillData)
                this.$data.loadingCitation = false
                //@ts-ignore
                this.$store.dispatch('setEditingCitation', citation);
                this.$router.push({path: '/edit/website/'});
        }
    }

    citeEmpty() {
        this.$store.dispatch('setEditingCitation', generateCitation('website', this.$data.websiteCitationData));
        this.$router.push({path: '/edit/website/'})
    }

}
</script>

<style scoped lang="scss">
#citeWebsite {
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
</style>