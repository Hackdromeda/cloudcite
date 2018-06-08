<template>
    <section style="background-color: #ffffff; opacity: 0.9; border-radius: 10px;">
        <br>
        <h1 class="title">Citations</h1>
        <h3 v-if="citations.length == 0">Your citations look empty! Have you tried citing a website?</h3>
        <b-table :data="citations" detailed detail-key="url">
            <template slot-scope="props">
                <b-table-column field="url" label="Citation" :width="props.row.url.length * 20">
                    <a @click="gotoEditPage(props.row)"><b-icon icon="pencil" size="is-small"></b-icon></a>{{ " " + props.row.url }}
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
                    <div class="media-content">
                        <div class="content">
                            <div v-if="props.row.authors">{{props.row.authors.split(' ')[1] + ", " + props.row.authors.split(' ')[0] + "."}}</div><div v-if="props.row.container">{{'"' + props.row.container + '."'}}</div><div v-if="props.row.source && props.row.source != (props.row.publisher ? props.row.publisher: '')"><i>{{props.row.source.substring(0, 1).toUpperCase() + props.row.source.substring(1, props.row.source.length + 1)}}</i></div><div v-if="props.row.publisher">{{" " + props.row.publisher + (props.row.datePublished ? ", ": "")}}</div><div v-if="props.row.datePublished">{{props.row.datePublished.dateLong + (props.row.url ? ", ": "")}}</div><div v-if="props.row.url">{{props.row.url + "."}}</div>
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
                },
                set() {
                    this.$store.dispatch('setCitations', Object.values(this.$store.state.citations))
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
