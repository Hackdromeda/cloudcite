<template>
    <div id="editcitation">
        <div style="min-height: 25vh; background-color: #005eea; color: #fff;">
            <div class="container" style="padding: 7vh;">
                <h1>Edit Website Citation</h1>
            </div>
        </div>
            <sui-grid :columns="3">
                <sui-grid-row>
                    <sui-grid-column :mobile="2" :tablet="3" :computer="4"/>
                    <sui-grid-column :mobile="12" :tablet="10" :computer="8" stretched>
                        <sui-form style="padding-top: 5%; padding-bottom: 5%; text-align: left;">
                            <div v-for="(contributor, i) in citationData.contributors" :key="i">
                                <sui-form-field>
                                    <sui-dropdown fluid v-model="citationData.contributors[i].type" :options="contributorTypes" :placeholder="(type == 'motion_picture') ? 'Director': 'Author'" direction="downward" selection/>
                                </sui-form-field>
                                <sui-form-field>
                                    <div class="ui labeled input">
                                        <div class="ui label">First Name</div>
                                        <input placeholder="First Name" @input="typing = true" v-model="contributor.given" type="text">
                                    </div>
                                </sui-form-field>
                                <sui-form-field>
                                    <div class="ui labeled input">
                                        <div class="ui label">Middle Name</div>
                                        <input placeholder="Middle Name" @input="typing = true" v-model="contributor.middle" type="text">
                                    </div>
                                </sui-form-field>
                                <sui-form-field>
                                    <div class="ui labeled input">
                                        <div class="ui label">Last Name</div>
                                        <input placeholder="Last Name" @input="typing = true" v-model="contributor.family" type="text">
                                    </div>
                                </sui-form-field>
                                <div is="sui-button-group" style="margin-bottom: 3vh;">
                                    <sui-button v-if="citationData.contributors.length == 1" type="button"  @click="clearContributor(i)" style="background-color: #b71c1c; color: #fff;">Remove Contributor</sui-button>
                                    <sui-button v-if="citationData.contributors.length > 1" type="button" @click="removeContributor(i)" style="background-color: #b71c1c; color: #fff;">Remove Contributor</sui-button>
                                    <sui-button-or />
                                    <sui-button type="button" style="background-color: #005eea; color: #fff;" @click="addContributor()" positive>Add Contributor</sui-button>
                                </div>
                            </div>
                            <!-- Website Form Beginning -->
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">URL</div>
                                    <input placeholder="URL" @input="typing = true" v-model="citationData.URL">
                                </div>
                            </sui-form-field>
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">Website Title</div>
                                    <input placeholder="Title" @input="typing = true" v-model="citationData['container-title']">
                                </div>
                            </sui-form-field>
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">Title</div>
                                    <input placeholder="Title" @input="typing = true" v-model="citationData.title">
                                </div>
                            </sui-form-field>
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">Website Type</div>
                                    <input placeholder="Website Type" @input="typing = true" v-model="citationData.genre">
                                </div>
                            </sui-form-field>
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">Source</div>
                                    <input placeholder="Source" @input="typing = true" v-model="citationData.source">
                                </div>
                            </sui-form-field>
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">Publisher</div>
                                    <input placeholder="Publisher" @input="typing = true" v-model="citationData.publisher">
                                </div>
                            </sui-form-field>
                            <!-- Website Form End -->
                            <div style="margin-bottom: 15px;">
                                <sui-form-field>
                                    <sui-dropdown fluid @input="typing = true" v-model="citationData.accessed.month" :options="monthAccessedNames" placeholder="Month Accessed" selection search/>
                                </sui-form-field>
                                <sui-form-field>
                                    <div class="ui labeled input">
                                        <div class="ui label">Day Accessed</div>
                                        <input @input="typing = true" v-model.number="citationData.accessed.day" type="number" maxlength="2" placeholder="Day">
                                    </div>
                                </sui-form-field>
                                <sui-form-field>
                                    <div class="ui labeled input">
                                        <div class="ui label">Year Accessed</div>
                                        <input @input="typing = true" v-model.number="citationData.accessed.year" type="number" maxlength="4" placeholder="Year">
                                    </div>
                                </sui-form-field>
                            </div>
                            <sui-form-field>
                                <sui-dropdown fluid @input="typing = true" v-model="citationData.issued.month" :options="monthPublishedNames" placeholder="Month Published" selection search/>
                            </sui-form-field>
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">Day Published</div>
                                    <input @input="typing = true" v-model.number="citationData.issued.day" type="number" maxlength="2" placeholder="Day">
                                </div>
                            </sui-form-field>
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">Year Published</div>
                                    <input @input="typing = true" v-model.number="citationData.issued.year" type="number" maxlength="4" placeholder="Year">
                                </div>
                            </sui-form-field>
                            <sui-form-field style="margin-top: 3vh;">
                                <Preview :cslObject="filteredCitationData" :typing="typing"/>
                            </sui-form-field>
                            <div is="sui-button-group">
                                <sui-button type="button" @click="cancel()">Cancel</sui-button>
                                <sui-button-or />
                                <sui-button type="button" style="background-color: #005eea; color: #fff;" @click="cite()" positive>Save</sui-button>
                            </div>
                        </sui-form>
                    </sui-grid-column>
                    <sui-grid-column :mobile="2" :tablet="3" :computer="4"/>
            </sui-grid-row>
        </sui-grid>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
//@ts-ignore
import rp from 'request-promise-native';
import Preview from '@/components/Preview.vue';
//@ts-ignore
import debounce from 'lodash/debounce';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue';
//@ts-ignore
import * as _ from 'lodash';
@Component({
    components: {
        Preview,
        MoonLoader
    },
  data () {
      return {
        typing: false,
        type: "website",
        citationData: this.$store.getters.getEditingCitation,
        contributorTypes: [
            {
                "key": "Author",
                "text": "Author",
                "value": "Author"
            },
            {
                "key": "Director",
                "text": "Director",
                "value": "Director"
            },
            {
                "key": "Editor",
                "text": "Editor",
                "value": "Editor"
            },
            {
                "key": "Producer",
                "text": "Producer",
                "value": "Producer"
            },
            {
                "key": "Writer",
                "text": "Writer",
                "value": "Writer"
            }
        ],
        monthAccessedNames: [
            {
                "key": "Month Accessed",
                "text": "Month Accessed",
                "value": ""
            },
            {
                "key": "January",
                "text": "January",
                "value": 1
            },
            {
                "key": "February",
                "text": "February",
                "value": 2
            },
            {
                "key": "March",
                "text": "March",
                "value": 3
            },
            {
                "key": "April",
                "text": "April",
                "value": 4
            },
            {
                "key": "May",
                "text": "May",
                "value": 5
            },
            {
                "key": "June",
                "text": "June",
                "value": 6
            },
            {
                "key": "July",
                "text": "July",
                "value": 7
            },
            {
                "key": "August",
                "text": "August",
                "value": 8
            },
            {
                "key": "September",
                "text": "September",
                "value": 9
            },
            {
                "key": "October",
                "text": "October",
                "value": 10
            },
            {
                "key": "November",
                "text": "November",
                "value": 11
            },
            {
                "key": "December",
                "text": "December",
                "value": 12
            }
        ],
        monthPublishedNames: [
            {
                "key": "Month Published",
                "text": "Month Published",
                "value": ""
            },
            {
                "key": "January",
                "text": "January",
                "value": 1
            },
            {
                "key": "February",
                "text": "February",
                "value": 2
            },
            {
                "key": "March",
                "text": "March",
                "value": 3
            },
            {
                "key": "April",
                "text": "April",
                "value": 4
            },
            {
                "key": "May",
                "text": "May",
                "value": 5
            },
            {
                "key": "June",
                "text": "June",
                "value": 6
            },
            {
                "key": "July",
                "text": "July",
                "value": 7
            },
            {
                "key": "August",
                "text": "August",
                "value": 8
            },
            {
                "key": "September",
                "text": "September",
                "value": 9
            },
            {
                "key": "October",
                "text": "October",
                "value": 10
            },
            {
                "key": "November",
                "text": "November",
                "value": 11
            },
            {
                "key": "December",
                "text": "December",
                "value": 12
            }
        ]
      }
  },
  computed: {
    filteredCitationData: {
        get() {
            return _.pickBy(this.$data.citationData)
        }
    }
  },
    methods: {
        cancel() {
            this.$store.dispatch('setEditingCitation', null)
            this.$router.push({path: '/'})
        },
        cite() {
            console.log('CITATION DATA')
            this.$store.dispatch('addCitation', this.$data.citationData)
            console.log(Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: true}))
            this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: true}))
            this.$store.dispatch('setEditingCitation', null)
            this.$router.push({path: '/'})
        },
        clearContributor(index: number) {
            this.$data.citationData.contributors[index] = Object.assign(this.$data.citationData.contributors[index], {given: null, middle: null, family: null, type: "Author"})
            this.$data.typing = true
        },
        removeContributor(index: number) {
            //@ts-ignore
            this.$data.citationData.contributors = this.$data.citationData.contributors.slice(0, index).concat(this.$data.citationData.contributors.slice(index + 1, this.$data.citationData.contributors.length))
            this.$data.typing = true
        },
        addContributor() {
            this.$data.citationData.contributors.push({given: '', middle: '', family: '', type: 'Author'})
            this.$data.typing = true
        }
    },
    watch: {
        typing: debounce(function () {
        //@ts-ignore
        this.$data.typing = false
        }, 3000)
    }
})
export default class WebsiteForm extends Vue {}
</script>

<style scoped lang="scss">
#contributorInput {
    padding: 5px;
    width: 20vh;
    height: 5vh;
    border-style: solid;
    background-color: #fff;
    caret-color: #000;
    border-radius: 5px;
    font-size: 1.05rem;
}
#contributorInput::placeholder {
    font-size: 1rem;
    color: #9ea7aa;
}
#contributorInput:focus {
    border-color: #0064ff;
}
</style>