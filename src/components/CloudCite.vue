<template>
<div class="columns">
  <div class="column"></div>
  <div class="column is-three-quarters">
    <h1 class="title" style="color: #ffffff;">
      Welcome to CloudCite
    </h1>
    <b-tabs v-model="activeTab" style="background-color: #ffffff; opacity: 0.9; border-radius: 5px; justify-content: center;">
      <b-field :type="urlField.type" :message="urlField.message" style="justify-content: center;">
            <b-input :placeholder="'Enter ' + this.format + ' url'" v-model="url" @keyup.enter.native="cite()" :loading="this.$data.loading" ref="urlInput" maxlength="2048" :disabled="this.$data.loading" style="color: #ffffff"></b-input>
              <p class="control">
                <a class="button is-primary" @click="cite()" :disabled="this.$data.loading">Cite</a>
              </p>
      </b-field>
      <b-tab-item label="Website" icon="application" @click="activeTab = 0" :disabled="this.$data.loading && this.$data.activeTab != 0">
      </b-tab-item>
      <b-tab-item label="Digital Image" icon="image" @click="activeTab = 1" :disabled="this.$data.loading && this.$data.activeTab != 1">
      </b-tab-item>
    </b-tabs>
  </div>
  <div class="column"></div>
</div>
</template>

<script>
import {store} from '../store';
const rp = require('request-promise-native');

export default {
  name: 'CloudCite',
  data() {
    return {
      activeTab: 0,
      url: "",
      urlField: {
        type: null,
        message: null
      },
      loading: false
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
    citations() {
      return store.getters.getCitations
    },
  },
  methods: {
    getCitation(url) {
      return store.getters.getCitation(url)
    },
    getEditing() {
      return store.getters.getEditing
    },
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
            uri: 'https://q4s3hew332.execute-api.us-east-1.amazonaws.com/prod/CloudCite',
            headers: {
              'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
            },
            method: 'POST',
            body: JSON.stringify({
              "authors": null,
              "source": null,
              "container": null,
              "url": 'http://navalpatel.me',
              "format": 'website',
              "publisher": null,
              "datePublished": null,
              "dateAccessed": {
                "month": currentDate.getMonth(),
                "day": currentDate.getDate(),
                "year": currentDate.getFullYear()
              }
            }),
            transform: function(body) {
                return JSON.parse(body)
            }
          }).then((citation) => {
            citation = JSON.parse(citation)
            store.dispatch('setEditing', citation)
            console.log('Editing: ' + this.getEditing())
            this.loading = false;
            this.$router.push({name: 'EditCitation'})
          }).catch((error) => {
              console.log(error)
              this.loading = false;
          })
      } else {
        this.loading = false
        this.urlField.type = 'is-danger'
        this.urlField.message = 'url is not valid'
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
