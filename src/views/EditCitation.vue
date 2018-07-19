<template>
    <div id="editcitation">
        <section class="hero is-primary" style="min-height: 20vh;">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-size-2">Edit {{format}} Citation</h1>
                </div>
            </div>
        </section>
            <div class="columns">
                <div class="column is-hidden-mobile" style="margin-top: 8vh;">
                    <div style="height: 100%; width: 80%; margin-left: 10px; border-radius: 5px;">
                        <aside class="menu">
                            <p class="menu-label">
                                Citations
                            </p>
                            <ul class="menu-list">
                                <a>Creating a Citation</a>
                                <a>Editing a Citation</a>
                            </ul>
                            <p class="menu-label">
                                Bibliography
                            </p>
                            <ul class="menu-list">
                                <a>Export Options</a>
                                <a>Managing Citations</a>
                            </ul>
                        </aside>
                    </div>
                </div>
                <div class="column is-6" style="margin-top: 5vh; margin-left: 2vh; margin-right: 2vh;">

                    <sui-form style="padding-bottom: 5%; text-align: left;">
                        <div v-for="(contributor, i) in citationData.contributors" :key="i">
                            <sui-form-field>
                                <sui-dropdown fluid v-model="citationData.contributors[i].type" :options="contributorTypes" :placeholder="(format == 'Film') ? 'Director': 'Author'" direction="downward" selection/>
                            </sui-form-field>
                            <sui-form-field>
                                <input placeholder="First Name" @input="typing = true" v-model="contributor.given"/>
                            </sui-form-field>
                            <sui-form-field>
                                <input placeholder="Middle Name" @input="typing = true" v-model="contributor.middle"/>
                            </sui-form-field>
                            <sui-form-field>
                                <input placeholder="Last Name" @input="typing = true" v-model="contributor.family"/>
                            </sui-form-field>
                            <sui-form-field>
                            </sui-form-field>
                            <sui-grid-row><sui-button v-if="citationData.contributors.length == 1" type="button" style="margin-right: 2vh; margin-bottom: 3vh;" @click="citationData.clearContributor(i)">Remove Contributor</sui-button><sui-button v-if="citationData.contributors.length > 1" type="button" @click="citationData.removeContributor(i)" style="margin-right: 2vh; margin-bottom: 3vh;">Remove Contributor</sui-button><sui-button type="button" @click="citationData.contributors.push({first: '', middle: '', last: '', type: 'Author'})" style="margin-bottom: 3vh;">Add Contributor</sui-button></sui-grid-row>
                        </div>
                        <sui-form-field v-for="(field, f) in Object.keys(citationData)" :key="f" v-if="typeof citationData[field] === 'string'">
                            <input @input="typing = true" v-model="citationData[field]" :placeholder="(field.substring(0, 1).toUpperCase() + field.substring(1, field.length))">
                        </sui-form-field>
                        <div v-for="(field, f) in Object.keys(citationData)" :key="f" v-if="typeof citationData[field] === 'object' && field == 'issued'">
                            <sui-form-field>
                                <sui-dropdown fluid v-model="citationData.issued.month" :options="monthNames" placeholder="Month Published" selection search/>
                            </sui-form-field>
                            <sui-form-field>
                                <input v-if="format != 'Film'" @input="typing = true" v-model.number="citationData.issued.day" type="number" maxlength="2" placeholder="Day"/>
                            </sui-form-field>
                            <sui-form-field>
                                <input @input="typing = true" v-model.number="citationData.issued.year" type="number" maxlength="4" placeholder="Year"/>
                            </sui-form-field>
                        </div>
                        <div v-for="(field, f) in Object.keys(citationData)" :key="f" v-if="typeof citationData[field] === 'object' && field != 'issued'">
                            <sui-form-field v-if="typeof citationData[field][property] === 'string'" v-for="(property, p) in Object.keys(citationData[field])" :key="p">
                                <input @input="typing = true" v-model="citationData[field][property]" :placeholder="property"/>
                            </sui-form-field>
                        </div>
                        <sui-form-field style="margin-top: 3vh;">
                            <Preview :cslObject="citationData.toCSL()" :deleteOption="false" :copyOption="true" :typing="typing"/>
                        </sui-form-field>
                        <sui-form-field>
                            <sui-button type="button" @click="cite()">Done Editing</sui-button>
                        </sui-form-field>
                    </sui-form>
                </div>
                <div class="column is-hidden-mobile"/>
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
        typing: false,
        format: this.$route.params.format ? this.$route.params.format.substring(0, 1).toUpperCase() + this.$route.params.format.substring(1, this.$route.params.format.length): "",
        citationData: this.$store.getters.getEditing,
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
        monthNames: [
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
    methods: {
        cite() {
            this.$store.dispatch('addCitation', this.$data.citationData.toCSL())
            this.$router.push({path: '/bibliography/'})
        }
    },
    computed: {
        selectedMonth: {
            get() {
                return this.$data.citationData.issued.month
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
export default class EditCitation extends Vue {}
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