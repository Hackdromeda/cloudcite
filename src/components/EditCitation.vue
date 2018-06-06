<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-three-quarters" style="background-color: #ffffff; opacity: 0.9; border-radius: 5px;">
      <h1 class="title" style="color: #149fda;">Edit Citation</h1>
        <b-field horizontal label="Author">
            <b-input placeholder = "Author" expanded></b-input>
        </b-field>
        <b-field horizontal label="Source">
            <b-input placeholder = "Source" expanded></b-input>
        </b-field>
        <b-field horizontal label="Container">
            <b-input placeholder = "Container" expanded></b-input>
        </b-field>
        <b-field horizontal label="Website">
            <b-input placeholder = "Website" expanded></b-input>
        </b-field>
        <b-field horizontal label="Publisher">
            <b-input placeholder = "Publisher" expanded></b-input>
        </b-field>
        <b-field horizontal label="Date Published">
            <b-input placeholder = "Date Published" expanded></b-input>
        </b-field>
        <b-field horizontal label="Date Accessed">
            <b-input placeholder = "Date Accessed" expanded></b-input>
        </b-field>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import {store} from '../store';
const rp = require('request-promise-native');

export default {
  name: 'EditCitation',
  data() {
    return {
      url: ""
    }
  },
  /*mounted() {
    this.$refs.urlInput.$el.children[0].focus();
  },*/
  computed: {
    citations() {
      return store.getters.getCitations
    }
  },
  methods: {
    getCitation(url) {
      return store.getters.getCitation(url)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
