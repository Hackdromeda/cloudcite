<template>
    <section style="background-color: #ffffff; opacity: 0.9; border-radius: 10px;">
        <br>
        <h1 class="title">Edit History</h1>
        <h3 v-if="citations.length == 0">Your citations look empty! Have you tried citing a website?</h3>
        <b-table :data="citations" detailed detail-key="url">
            <template slot-scope="props">
                <b-table-column field="url" label="Citation">
                    <a :href="'http://' + props.row.url">{{ " " + props.row.url }}</a>
                </b-table-column>
                <b-table-column field="format" label="Format">
                    {{ props.row.format }}
                </b-table-column>

                <b-table-column field="dateAccessed" label="Date Accessed" centered>
                    <span class="tag is-success">
                        {{ props.row.dateAccessed.dateLong }}
                    </span>
                </b-table-column>
            </template>

            <template slot="detail" slot-scope="props">
                    <a @click="gotoEditPage(props.row)"><b-icon icon="pencil" size="is-small"></b-icon> Edit Citation</a>
                    <div class="media-content">
                        <div class="content">
                            <span v-if="props.row.authors[0].last">
                            {{props.row.authors[0].last}}<span v-if="props.row.authors[0].first">,</span><span v-if="!props.row.authors[0].first && !props.row.authors[0].middle">.</span>
                            </span>
                            <span v-if="props.row.authors[0].first">
                            {{props.row.authors[0].first}}<span v-if="!props.row.authors[0].middle">.</span>
                            </span>
                            <span v-if="props.row.authors[0].middle">
                            {{props.row.authors[0].middle + '.'}} 
                            </span>
                            <span v-if="props.row.title">
                            "{{citationTitle}}."
                            </span>
                            <span v-if="props.row.source">
                            {{props.row.source}},
                            </span>
                            <span v-if="props.row.publisher && (props.row.publisher != props.row.source)">
                            <i>{{props.row.publisher}}</i>,
                            </span>
                            <span v-if="props.row.datePublished.day">
                            <i>{{props.row.datePublished.day}}</i>
                            </span>
                            <span v-if="props.row.datePublished.month">
                            {{abbreviatedMonths[props.row.datePublished.month]}}
                            </span>
                            <span v-if="props.row.datePublished.year">
                            {{props.row.datePublished.year}},
                            </span>
                            <span v-if="props.row.url.indexOf('http://') != -1">
                            {{props.row.url}}.
                            </span>
                        </div>
                    </div>
            </template>
        </b-table>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

    export default {
        name: 'CitationsTable',
        data() {
            return {
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                abbreviatedMonths: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ],
                defaultOpenedDetails: [0]
            }
        },
        computed: {
            ...mapGetters(['getEditing', 'getCitation, getCitations']),
            citations: {
                get() {
                    var citationsMap = this.$store.state.citations
                    var citationsArray = []
                    citationsMap.forEach(function(element) {
                        citationsArray.push(element)
                    })
                    return citationsArray
                }
            }
        },
        methods: {
            ...mapActions(['setCitation', 'setEditing']),
            gotoEditPage(citation) {
                this.$store.dispatch('setEditing', citation)
                this.$router.push({name: 'EditCitation'})
            }
        }
    }
</script>
