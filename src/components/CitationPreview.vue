<template>
    <div>
        <div class="tile is-parent">
            <article class="tile is-child notification" v-if="citation.format == 'website'">
              <div class="hangingIndent" v-if="citation.authors.length == 1" v-cloak>
                <span v-if="citation.authors[0].last">
                  {{citation.authors[0].last}}<span v-if="citation.authors[0].first">,</span><span v-if="!citation.authors[0].first && !citation.authors[0].middle">.</span>
                </span>
                <span v-if="citation.authors[0].first">
                  {{citation.authors[0].first}}<span v-if="!citation.authors[0].middle">.</span>
                </span>
                <span v-if="citation.authors[0].middle">
                  {{citation.authors[0].middle + '.'}} 
                </span>
                <span v-if="citation.title">
                  "{{citation.title}}."
                </span>
                <span v-if="citation.source && !citation.publisher || citation.source == citation.publisher">
                  {{citation.source}}.
                </span>
                <span v-else>
                  {{citation.source}},
                </span>
                <span v-if="citation.publisher && (citation.publisher != citation.source)">
                  <i>{{citation.publisher}}</i>,
                </span>
                <span v-if="citation.datePublished.day">
                  <i>{{citation.datePublished.day}}</i>
                </span>
                <span v-if="citation.datePublished.month">
                  {{abbreviatedMonths[citation.datePublished.month]}}
                </span>
                <span v-if="citation.datePublished.year">
                  {{citation.datePublished.year}},
                </span>
                <span v-if="citation.url.indexOf('http://') != -1">
                  {{citation.url}}.
                </span>
              </div>
            </article>
            <li>
              <ul><div style="padding-left: 5px;"><a><b-icon icon="content-copy" size="is-small"></b-icon></a></div></ul>
              <ul><div style="padding-left: 5px;"><a @click="gotoEditPage(citation)"><b-icon icon="pencil" size="is-small"></b-icon></a></div></ul>
              <ul><div style="padding-left: 5px;"><a><b-icon icon="download" size="is-small"></b-icon></a></div></ul>
            </li>
          </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: 'CitationPreview',
        props: ['preview'],
        data() {
            return {
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                abbreviatedMonths: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ]
            }
        },
        computed: {
            citation: {
              get() {
                return this.preview
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
