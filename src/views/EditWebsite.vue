<template>
    <div id="editwebsite">
        <div v-if="!citationStarted">
            <h1 class="title is-size-2">Cite a Website</h1>
            <b-field id="websiteInputField">
                <div class="field has-addons">
                    <div class="control" id="websiteInput">
                        <b-input v-model="websiteCitationData.url" type="url" placeholder="Enter website link" @keyup.enter.native="citeURL()" :loading="loadingCitation"/>
                    </div>
                    <div class="control">
                        <a class="button is-primary" @click="citeURL()">Cite</a>
                    </div>
                </div>
            </b-field>
        </div>
        <div v-if="citationStarted">
            <h1 id="editFormTitle" class="title is-size-4">Edit Website Citation</h1>
            <div class="container" id="editForm">
                <b-field grouped v-for="(contributor, i) in websiteCitationData.contributors" :key="i">
                    <b-field expanded>
                        <b-select v-model="websiteCitationData.contributors[i].type" :placeholder="contributor.type">
                            <option v-for="(type, j) in contributorTypes" :value="type" :key="j" v-cloak>
                                {{ type }}
                            </option>  
                        </b-select>
                    </b-field>
                    <b-field expanded>
                        <b-input placeholder="First Name" @input="typing = true" v-model="contributor.given"></b-input>
                    </b-field>
                    <b-field expanded>
                        <b-input placeholder="Middle Name" @input="typing = true" v-model="contributor.middle"></b-input>
                    </b-field>
                    <b-field expanded>
                        <b-input placeholder="Last Name" @input="typing = true" v-model="contributor.family"></b-input>
                    </b-field>
                    <b-field expanded>
                        <b-tooltip label="Remove Contributor" position="is-top" animated>
                            <a v-if="websiteCitationData.contributors.length == 1" id="removeContributorButton" @click="websiteCitationData.clearContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                            <a v-if="websiteCitationData.contributors.length > 1" id="removeContributorButton" @click="websiteCitationData.removeContributor(i)"><b-icon icon="minus-circle" custom-size="mdi-24px"></b-icon></a>
                        </b-tooltip>
                        <b-tooltip label="Add Contributor" position="is-top" animated>
                            <a id="addContributorButton" @click="websiteCitationData.contributors.push({first: null, middle: null, last: null, type: 'Author'})"><b-icon icon="plus-circle" custom-size="mdi-24px"></b-icon></a>
                        </b-tooltip>
                    </b-field>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Source" @input="typing = true" v-model="websiteCitationData.source" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Title" @input="typing = true" v-model="websiteCitationData.title" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Website URL" @input="typing = true" v-model="websiteCitationData.url" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-input placeholder="Publisher" @input="typing = true" v-model="websiteCitationData.publisher" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <b-select v-model="websiteCitationData.issued.month" placeholder="Month Published">
                        <option v-for="(month, i) in monthNames" :value="i + 1" :key="i" v-cloak>
                            {{ month }}
                        </option>
                    </b-select>
                    <b-input @input="typing = true" v-model.number="websiteCitationData.issued.day" type="number" maxlength="2" placeholder="Day" expanded></b-input>
                    <b-input @input="typing = true" v-model.number="websiteCitationData.issued.year" type="number" maxlength="4" placeholder="Year" expanded></b-input>
                </b-field>
                <b-field expanded>
                    <Preview :cslObject="websiteCitationData.toCSL()" :deleteOption="false" :copyOption="true" :typing="typing"/>
                </b-field>
                <b-field expanded>
                    <div id="submitFormDiv">
                        <a class="button is-primary" @click="cite()">Done Editing</a>
                    </div>
                </b-field>
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

@Component({
  components: {
    Preview
  },
  data () {
      return {
        loadingCitation: false,
        typing: false,
        citationStarted: false,
        contributorTypes: ["Author", "Editor"],
        websiteCitationData: new WebsiteCitation([{given: "", middle: "", family: "", type: "Author"}], null, null, null, null, {month: null, day: null, year: null}),
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Month Published"]
      }
  },
  methods: {
      formatURL(url: string) {
          if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
              return 'http://' + url
          } else {
              return url
          }
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
                body: {"url": this.formatURL(this.websiteCitationData.url), "format": "website"},
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
            this.$data.websiteCitationData = new WebsiteCitation(contributors, data.source ? data.source: "", data.title ? data.title: "", this.websiteCitationData.url ? this.websiteCitationData.url: "", data.publisher ? data.publisher: "", data.issued ? data.issued: {month: "", day: "", year: ""})
            this.$data.loadingCitation = false
            this.$data.citationStarted = !this.$data.citationStarted;
            //@ts-ignore
        }).catch(error => {
            console.log(error)
            this.$data.loadingCitation = false
            this.$data.citationStarted = !this.$data.citationStarted;
        })
    },
    cite() {
        this.$store.dispatch('addCitation', this.$data.websiteCitationData.toCSL())
        this.$router.push({path: '/bibliography/'})
    }
  },
  computed: {
    selectedMonth: {
        get() {
            return this.$data.websiteCitationData.issued.month
        }
    }
  },
  watch: {
    selectedMonth() {
        this.$data.typing = true
    },
    typing: debounce(function () {
    //@ts-ignore
    this.$data.typing = false
    }, 5000)
  }
})
export default class EditWebsite extends Vue {
}
</script>

<style scoped lang="scss">
#websiteInputField {
    justify-content: center;
    display: inline-flex;
}
#editFormTitle {
    color: #005eea;
}
#editwebsite {
    padding: 10px;
    height: 100vh;
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