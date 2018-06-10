<template>
<div class="columns">
  <div class="column"></div>
  <div class="column is-three-quarters">
    <h1 class="title" style="color: #ffffff;">Welcome to CloudCite</h1>
    <br>
    <b-tabs v-model="activeTab" style="background-color: #ffffff; opacity: 0.9; border-radius: 5px; justify-content: center;">
      <b-field v-if="this.format == 'website'" :type="urlField.type" :message="urlField.message" style="justify-content: center;">
            <b-input :placeholder="'Enter ' + this.format + ' url'" v-model="url" @keyup.enter.native="cite()" :loading="this.$data.loading" ref="urlInput" maxlength="2048" :disabled="this.$data.loading" style="color: #30496B"></b-input>
              <p class="control">
                <a class="button is-primary" @click="cite()" :disabled="this.$data.loading">Cite</a>
              </p>
      </b-field>
      <b-tab-item label="Website" icon="application" @click="activeTab = 0" :disabled="this.$data.loading && this.$data.activeTab != 0">
      </b-tab-item>
      <!--<b-tab-item label="Digital Image" icon="image" @click="activeTab = 1" :disabled="this.$data.loading && this.$data.activeTab != 1">
      </b-tab-item>-->
    </b-tabs>
    <div>
    <CitationsTable></CitationsTable>
    </div>
  </div>
  <div class="column"></div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
const CitationsTable = () => import('@/components/CitationsTable');
const rp = require('request-promise-native');

export default {
  name: 'CloudCite',
  components: {
    CitationsTable
  },
  data() {
    return {
      activeTab: 0,
      url: "",
      urlField: {
        type: null,
        message: null
      },
      loading: false,
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
  },
  mounted() {
    this.$refs.urlInput.$el.children[0].focus();
  },
  computed: {
    format() {
      switch (this.activeTab) {
        case 0:
          return 'website';
          break;
        case 1: 
          return 'digital image';
          break;
        default:
          console.log('No citation format found.');
      }
    },
    ...mapGetters(['getEditing', 'getCitation', 'getCitations']),
  },
  methods: {
    ...mapActions(['setCitation', 'setEditing']),
    cite() {
      this.$refs.urlInput.$el.children[0].blur();
      var dotIndex = this.url.indexOf('.')
      var afterDot = this.url.substring(dotIndex + 1, this.url.length)
      if (this.url != null && this.url != "" && this.url.length <= 2048 && this.url.length >= 4 && this.url.indexOf('.') != -1 && afterDot != null && afterDot != "" && afterDot.length >= 2) {
        this.urlField.message = null
        this.urlField.type = 'is-success'
        this.loading = true
        var currentDate = new Date()
        if (this.url.indexOf('http') == -1) {
          this.url = 'http://' + this.url
        }
        rp({
            uri: 'https://api.cloudcite.net/autofill',
            headers: {
              'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
            },
            method: 'POST',
            body: JSON.stringify({
              "authors": [],
              "source": null,
              "title": null,
              "url": this.url,
              "format": 'website',
              "publisher": null,
              "datePublished": null,
              "dateAccessed": {
                "month": currentDate.getMonth(),
                "day": currentDate.getDate(),
                "year": currentDate.getFullYear(),
                "dateLong": this.monthNames[currentDate.getMonth() - 1] + " " + currentDate.getDate() + ", " + currentDate.getFullYear()
              }
            }),
            transform: function(body) {
                return JSON.parse(body)
            }
          }).catch((error) => {
            this.loading = false;
            this.$toast.open({
              duration: 5000,
              message: 'Error loading citation.' + (this.urlField.type == 'is-danger' ? ' Please check the URL': ' CloudCite may be experiencing an issue right now. Please check again later.'),
              position: 'is-bottom-right',
              type: 'is-danger'
            })
          }).then((citation) => {
            citation = JSON.parse(citation)
            if (citation.url.indexOf('https://') != -1) {
              citation.url = citation.url.split('https://')[1]
            } else if (citation.url.indexOf('http://') != -1){
              citation.url = citation.url.split('http://')[1]
            }
            this.$store.dispatch('setEditing', citation)
            if (!this.getEditing.datePublished || !this.getEditing.datePublished.month || !this.getEditing.datePublished.day || !this.getEditing.datePublished.year) {
              this.$store.dispatch('setEditing', Object.assign(this.getEditing, {datePublished: {month: null, day: null, year: null}}))
            }
            if (!this.getEditing.authors || this.getEditing.authors.length < 1) {
              this.$store.dispatch('setEditing', Object.assign(this.getEditing, {authors: [{first: null, middle: null, last: null}]}))
            }
            this.$store.dispatch('setCitation', citation)
            this.loading = false;
            this.$router.push({name: 'EditCitation'})
          }).catch((error) => {
              console.log(error)
              this.loading = false;
              this.$toast.open({
                duration: 5000,
                message: 'Error loading citation.' + (this.urlField.type == 'is-danger' ? ' Please check the URL': ' CloudCite may be experiencing an issue right now. Please check again later.'),
                position: 'is-bottom-right',
                type: 'is-danger'
              })
          })
      } else {
        this.loading = false
        this.urlField.type = 'is-danger'
        this.urlField.message = 'url is not valid'
        this.$toast.open({
          duration: 3000,
          message: `The website URL is invalid`,
          position: 'is-bottom-right',
          type: 'is-danger'
        })
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
