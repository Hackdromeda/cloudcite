<template>
    <div>
        <div class="tile is-parent">
            <article class="tile is-child notification" v-if="citation.format == 'website'">
              <div class="hangingIndent" v-if="citation.authors.length == 1" v-cloak>
                <span v-if="citation.authors[0].last">
                  {{citation.authors[0].last}}<span>{{citation.authors[0].middle || citation.authors[0].first ? ',': '.'}}</span>
                </span>
                <span v-if="citation.authors[0].first">
                  {{citation.authors[0].first}}<span>{{citation.authors[0].middle ? '': '.'}}</span>
                </span>
                <span v-if="citation.authors[0].middle">
                  {{citation.authors[0].middle + '.'}} 
                </span>
                <span v-if="citation.title">
                  "{{citation.title}}."
                </span>
                <span v-if="citation.source">
                  <i>{{citation.source}}</i><span>{{(citation.publisher || citation.datePublished.day || citation.datePublished.month || citation.datePublished.year) ? ',': '.'}}</span>
                </span>
                <span v-if="citation.publisher && (citation.publisher != citation.source)">
                  {{citation.publisher}}<span>{{citation.source == citation.publisher ? '': (citation.datePublished.day || citation.datePublished.month || citation.datePublished.year) ? ',': '.'}}</span>
                </span>
                <span v-if="citation.datePublished.day">
                  {{this.citation.datePublished.month ? this.citation.datePublished.day: ''}}
                </span>
                <span v-if="citation.datePublished.month">
                  {{abbreviatedMonths[citation.datePublished.month - 1]}}<span v-if="citation.datePublished.month && abbreviatedMonths[citation.datePublished.month - 1].indexOf('.') == -1">{{citation.url ? ',': '.'}}</span>
                </span>
                <span v-if="citation.datePublished.year">
                  {{citation.datePublished.year}}<span>{{citation.url ? ',': '.'}}</span>
                </span>
                  {{citation.url}}.
              </div>
            </article>
              <div style="display-block;">
                <div v-if="canCopy" style="padding-left: 5px;"><a><b-icon icon="content-copy" size="is-small"></b-icon></a></div>
                <div v-if="canEdit" style="padding-left: 5px;"><a @click="gotoEditPage(citation)"><b-icon icon="pencil" size="is-small"></b-icon></a></div>
                <div v-if="canDownload" style="padding-left: 5px;"><a><b-icon icon="download" size="is-small"></b-icon></a></div>
              </div>
          </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: 'CitationPreview',
        props: ['preview', 'showCopyIcon', 'showEditIcon', 'showDownloadIcon'],
        data() {
            return {
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                abbreviatedMonths: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ]
            }
        },
        computed: {
            citation: {
              get() {
                return Object.assign(this.preview, {url: this.preview.url.replace(/(^\w+:|^)\/\//, '')})
              }
            },
            canCopy: {
              get() {
                return this.showCopyIcon
              }
            },
            canEdit: {
              get() {
                return this.showEditIcon
              }
            },
            canDownload: {
              get() {
                return this.showDownloadIcon
              }
            },
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
