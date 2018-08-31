<template>
    <div id="editcitation">
        <div style="min-height: 25vh; background-color: #005eea; color: #fff;">
            <div class="container" style="padding: 7vh;">
                <h1>Edit Book Citation</h1>
            </div>
        </div>
        <sui-form id="editForm">
            <div v-for="(contributor, i) in citationData.contributors" :key="i">
                <sui-form-field v-if="citationData && citationData.type == 'book'">
                    <sui-dropdown fluid @input="typing = true" v-model="citationData.contributors[i].type" :options="bookContributorTypes" placeholder="Book Author" direction="downward" selection/>
                </sui-form-field>
                <sui-form-field v-else>
                    <sui-dropdown fluid @input="typing = true" v-model="citationData.contributors[i].type" :options="chapterContributorTypes" placeholder="Chapter Author" direction="downward" selection/>
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
            <!-- Book Form Beginning -->
            <sui-form-field>
                <sui-dropdown fluid @input="typing = true" v-model="citationData.type" :options="bookCitationOptions" placeholder="Book" selection search/>
            </sui-form-field>
            <sui-form-field v-if="citationData && citationData.type == 'book'">
                <div class="ui labeled input">
                    <div class="ui label">Book Title</div>
                    <input placeholder="Book Title" @input="typing = true" v-model="citationData.title">
                </div>
            </sui-form-field>
            <sui-form-field v-if="citationData && citationData.type == 'chapter'">
                <div class="ui labeled input">
                    <div class="ui label">Book Title</div>
                    <input placeholder="Book Title" @input="typing = true" v-model="citationData['container-title']">
                </div>
            </sui-form-field>
            <sui-form-field v-if="citationData && citationData.type == 'chapter'">
                <div class="ui labeled input">
                    <div class="ui label">Chapter Title</div>
                    <input placeholder="Chapter Title" @input="typing = true" v-model="citationData.title">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Short Title</div>
                    <input placeholder="Short Title" @input="typing = true" v-model="citationData['title-short']">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Library Catalog</div>
                    <input placeholder="Source" @input="typing = true" v-model="citationData.source">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">ISBN</div>
                    <input placeholder="ISBN" @input="typing = true" v-model="citationData.ISBN">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Edition</div>
                    <input placeholder="Edition" @input="typing = true" v-model="citationData.edition">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Volume</div>
                    <input placeholder="Volume" @input="typing = true" v-model="citationData.volume">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Number of Pages</div>
                    <input @input="typing = true" v-model.number="citationData['number-of-pages']" type="number" placeholder="Number of Pages">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Number of Volumes</div>
                    <input @input="typing = true" v-model.number="citationData['number-of-volumes']" type="number" placeholder="Number of Volumes">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Publisher</div>
                    <input placeholder="Publisher" @input="typing = true" v-model="citationData.publisher">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Place</div>
                    <input placeholder="Place" @input="typing = true" v-model="citationData['publisher-place']">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Archive</div>
                    <input placeholder="Archive" @input="typing = true" v-model="citationData.archive">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Location in Archive</div>
                    <input placeholder="Location in Archive" @input="typing = true" v-model="citationData['archive_location']">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Call Number</div>
                    <input placeholder="Call Number" @input="typing = true" v-model="citationData['call-number']">
                </div>
            </sui-form-field>
            <sui-form-field>
                <div class="ui labeled input">
                    <div class="ui label">Abstract</div>
                    <input placeholder="Abstract" @input="typing = true" v-model="citationData.abstract">
                </div>
            </sui-form-field>
            <!-- Book Form End -->
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
            <sui-form-field v-if="allowSave" style="margin-top: 3vh;">
                <Preview :cslObject="filteredCitationData" :typing="typing"/>
            </sui-form-field>
            <div is="sui-button-group">
                <sui-button type="button" @click="cancel()">Cancel</sui-button>
                <sui-button-or />
                <sui-button type="button" style="background-color: #005eea; color: #fff;" @click="cite()" :disabled="!allowSave" positive>Save</sui-button>
            </div>
        </sui-form>
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
        citationData: _.pickBy(this.$store.getters.getEditingCitation, _.identity),
        bookCitationOptions: [
            {
                "key": "Book",
                "text": "Book",
                "value": "book"
            },
            {
                "key": "Chapter",
                "text": "Chapter",
                "value": "chapter"
            }
        ],
        bookContributorTypes: [
            {
                "key": "Author",
                "text": "Author",
                "value": "Author"
            },
            {
                "key": "Editor",
                "text": "Editor",
                "value": "Editor"
            },
            {
                "key": "Translator",
                "text": "Translator",
                "value": "Translator"
            }
        ],
        chapterContributorTypes: [
            {
                "key": "Chapter Author",
                "text": "Chapter Author",
                "value": "Container Author"
            },
            {
                "key": "Author",
                "text": "Author",
                "value": "Author"
            },
            {
                "key": "Editor",
                "text": "Editor",
                "value": "Editor"
            },
            {
                "key": "Translator",
                "text": "Translator",
                "value": "Translator"
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
    },
    allowSave: function() {
        var citationExists = false
        var keys = Object.keys(this.$data.citationData)
        for (let i=0; i < keys.length; i++) {
            if (keys[i] != "id" && keys[i] != "type" && this.$data.citationData[keys[i]] && ((typeof this.$data.citationData[keys[i]] == 'string' && this.$data.citationData[keys[i]].trim() != "") || (typeof this.$data.citationData[keys[i]] == 'number'))) {
                citationExists = true
                break;
            }
            else if (this.$data.citationData[keys[i]] && (typeof this.$data.citationData[keys[i]] == 'object')) {
                var objectKeys = Object.keys(this.$data.citationData[keys[i]])
                for (let j=0; j < objectKeys.length; j++) {
                    if (this.$data.citationData[keys[i]][objectKeys[j]] && ((typeof this.$data.citationData[keys[i]][objectKeys[j]] == 'string' && this.$data.citationData[keys[i]][objectKeys[j]].trim() != "") || (typeof this.$data.citationData[keys[i]][objectKeys[j]] == 'number'))) {
                        citationExists = true
                        break;
                    }
                }
                if (citationExists) {
                    break;
                }
            }
        }
        return citationExists
    }
  },
    methods: {
        cancel() {
            this.$store.dispatch('setEditingCitation', null)
            this.$router.push({path: '/'})
        },
        cite() {
            this.$store.dispatch('addCitation', this.$data.citationData)
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
export default class BookForm extends Vue {}
</script>

<style scoped lang="scss">
@media (max-width: 991.97px) {
    #editForm {
        margin-top: 5vh;
        margin-bottom: 5vh;
        margin-left: 2vh;
        margin-right: 2vh;
        text-align: left;
        font-size: 16px;
    }
}
@media (min-width: 991.98px) {
    #editForm {
        margin-top: 5vh;
        margin-bottom: 5vh;
        margin-left: 45vh;
        margin-right: 45vh;
        text-align: left;
        font-size: 16px;
    }
}
</style>