<template>
  <div class="container">
    <h1 class="title">
      Welcome to CloudCite
    </h1>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Website" icon="application" @click="activeTab = 0" :disabled="this.$data.loading && this.$data.activeTab != 0">
      </b-tab-item>
      <b-tab-item label="Digital Image" icon="image" @click="activeTab = 1" :disabled="this.$data.loading && this.$data.activeTab != 1"></b-tab-item>
    </b-tabs>
    <b-field :type="urlField.type" :message="urlField.message">
      <b-input :placeholder="'Enter ' + this.format + ' url'" v-model="url" @keyup.enter.native="cite()" :loading="this.$data.loading" ref="urlInput" maxlength="50" :disabled="this.$data.loading"></b-input>
      <p class="control">
        <a class="button is-primary" @click="cite()" :disabled="this.$data.loading">Cite</a>
      </p>
    </b-field>
  </div>
</template>

<script>
import {store} from '../store'

export default {
  name: 'CloudCite',
  data() {
    return {
      activeTab: 0,
      url: "",
      urlField: {
        type: 'is-light',
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
    cite() {
      this.$refs.urlInput.$el.children[0].blur();
      var dotIndex = this.url.indexOf('.')
      var afterDot = this.url.substring(dotIndex + 1, this.url.length)
      if (this.url != null && this.url != "" && this.url.length <= 50 && this.url.length >= 4 && this.url.indexOf('.') != -1 && afterDot != null && afterDot != "" && afterDot.length >= 2) {
        this.urlField.message = null
        this.urlField.type = 'is-success'
        this.loading = true
        var currentDate = new Date()
        if (this.url.indexOf('http') == -1) {
          this.url = 'http://' + this.url
        }
        fetch('https://q4s3hew332.execute-api.us-east-1.amazonaws.com/prod/CloudCite', {
          body: JSON.stringify({
            "authors": null,
            "source": null,
            "container": null,
            "url": this.url,
            "format": this.format,
            "publisher": null,
            "datePublished": null,
            "dateAccessed": {
              "month": currentDate.getMonth(),
              "day": currentDate.getDate(),
              "year": currentDate.getFullYear()
            }
          }),
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
          },
          method: 'POST',
          mode: 'cors',
        }).then((response) => {
            response = JSON.parse(response)
            console.log(response)
            console.log(this.citations)
            console.log(this.getCitation(this.url))
            this.loading = false
        }).catch((error) => {
          console.log(error)
        })
        //store.dispatch('setCitation', {url: this.url, format: this.format, author: null, publisher: null, datePublished: null, dateAccessed: {month: currentDate.getMonth(), day: currentDate.getDate(), year: currentDate.getFullYear()}})
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
