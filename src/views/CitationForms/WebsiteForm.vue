<template>
    <div id="editcitation">
        <div style="min-height: 25vh; background-color: #005eea; color: #fff;">
            <div class="container" style="padding: 7vh;">
                <h1>Edit Website Citation</h1>
            </div>
        </div>
        <sui-form id="editForm">
            <div v-for="(contributor, i) in citationData.contributors" :key="i">
                <sui-form-field>
                    <sui-dropdown fluid @input="typing = true" v-model="contributor.type" :options="contributorTypes" placeholder="Author" direction="downward" selection/>
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
                    <sui-button v-if="contributors.length == 1" type="button"  @click="clearContributor(i)" style="background-color: #b71c1c; color: #fff;">Remove Contributor</sui-button>
                    <sui-button v-if="contributors.length > 1" type="button" @click="removeContributor(i)" style="background-color: #b71c1c; color: #fff;">Remove Contributor</sui-button>
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
                    <div class="ui label">Publisher</div>
                    <input placeholder="Publisher" @input="typing = true" v-model="citationData['container-title']">
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
            <!-- Website Form End -->
            <div style="margin-bottom: 15px;">
                <sui-form-field>
                    <sui-dropdown fluid @input="typing = true" v-model="citationData.accessed.month" :options="monthNames" placeholder="Month Accessed" selection search/>
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
                <sui-dropdown fluid @input="typing = true" v-model="citationData.issued.month" :options="monthNames" placeholder="Month Published" selection search/>
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
                <Preview :cslObject="citationData" :typing="typing"/>
            </sui-form-field>
            <div is="sui-button-group">
                <sui-button type="button" @click="cancel()">Cancel</sui-button>
                <sui-button-or />
                <sui-button type="button" style="background-color: #005eea; color: #fff;" @click="cite()" :disabled="!allowSave" positive>Save</sui-button>
            </div>
        </sui-form>
    </div>
</template>

<script>
import { Vue, Component, Watch } from 'vue-property-decorator';
import Preview from '@/components/Preview.vue';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue';
const debounce = require('lodash.debounce');

@Component({
    components: {
        Preview,
        MoonLoader
    },
    watch: {
        typing: debounce(function(newValue, previousValue) {
            this.$data.typing = false;
            console.log(
                'TYPING'
            )
        }, 2000)
    }
})
export default class WebsiteForm extends Vue {
    typing = false;
    type = "website";
    citationData = this.$store.getters.getEditingCitation;
    contributorTypes = [
        {"key":"Author","text":"Author","value":"Author"},
        {"key":"Editor","text":"Editor","value":"Editor"},
        {"key":"Translator","text":"Translator","value":"Translator"}
    ];
    monthNames = [
        {"key":"Month Accessed","text":"Month Accessed"},
        {"key":"January","text":"January","value":1},
        {"key":"February","text":"February","value":2},
        {"key":"March","text":"March","value":3},
        {"key":"April","text":"April","value":4},
        {"key":"May","text":"May","value":5},
        {"key":"June","text":"June","value":6},
        {"key":"July","text":"July","value":7},
        {"key":"August","text":"August","value":8},
        {"key":"September","text":"September","value":9},
        {"key":"October","text":"October","value":10},
        {"key":"November","text":"November","value":11},
        {"key":"December","text":"December","value":12}
    ];

    get contributors() {
        return this.$data.citationData.contributors;
    }

    get allowSave() {
        let citationExists = false
        let keys = Object.keys(this.$data.citationData)
        for (let i=0; i < keys.length; i++) {
            if (keys[i] != "id" && keys[i] != "type" && this.$data.citationData[keys[i]] && ((typeof this.$data.citationData[keys[i]] == 'string' && this.$data.citationData[keys[i]].trim() != "") || (typeof this.$data.citationData[keys[i]] == 'number'))) {
                citationExists = true
                break;
            }
            else if (this.$data.citationData[keys[i]] && (typeof this.$data.citationData[keys[i]] == 'object')) {
                let objectKeys = Object.keys(this.$data.citationData[keys[i]])
                for (let j = 0; j < objectKeys.length; j++) {
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

    cancel() {
        this.$store.dispatch('setEditingCitation', null)
        this.$router.push({path: '/'})
    }

    cite() {
        this.$store.dispatch('addCitation', this.$data.citationData)
        this.$store.dispatch('setEditingCitation', null)
        this.$router.push({path: '/'})
    }

    clearContributor(index) {
        this.$data.citationData.contributors[index] = Object.assign(this.$data.citationData.contributors[index], {given: null, middle: null, family: null, type: "Author"});
        this.typing = true;
    }

    removeContributor(index) {
        //@ts-ignore
        this.$data.citationData.contributors = this.$data.citationData.contributors.slice(0, index).concat(this.$data.citationData.contributors.slice(index + 1, this.$data.citationData.contributors.length));
        this.typing = true;
    }

    addContributor() {
        this.$data.citationData.contributors.push({given: '', middle: '', family: '', type: 'Author'});
        this.typing = true;
    }
}
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