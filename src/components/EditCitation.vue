<template>
      <div>
        <h1 class="title" style="color: #ffffff">Edit Citation</h1>
        <div class="panel-block" style="background-color: #ffffff; opacity: 0.9; border-radius: 10px;">
          <form class="control">
          <b-field horizontal label="Author">
            <b-input placeholder="Author" v-model="citationAuthors" expanded></b-input>
          </b-field>
          <b-field horizontal label="Source">
            <b-input placeholder="Source" v-model="citationSource" expanded></b-input>
          </b-field>
          <b-field horizontal label="Container">
            <b-input placeholder="Container" v-model="citationContainer" expanded></b-input>
          </b-field>
          <b-field horizontal label="Website">
            <b-input placeholder="Website" v-model="citationURL" expanded></b-input>
          </b-field>
          <b-field horizontal label="Publisher">
            <b-input placeholder="Publisher" v-model="citationPublisher" expanded></b-input>
          </b-field>
          <b-field horizontal label="Date Published">
              <b-datepicker placeholder="Type or select a date MM/DD/YYYY" icon="calendar-today" :readonly="false"></b-datepicker>
          </b-field>
          <b-field horizontal label="Date Accessed">
              <b-datepicker placeholder="Type or select a date MM/DD/YYYY" icon="calendar-today" :readonly="false"></b-datepicker>
          </b-field>
          </form>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'EditCitation',
  computed: {
    ...mapGetters(['getEditing', 'getCitation']),
    citationAuthors: {
      get() {
        return this.$store.state.editing.authors
      },
      set(authors) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {authors: authors}))
      }
    },
    citationSource: {
      get() {
        return this.$store.state.editing.source
      },
      set(source) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {source: source}))
      }
    },
    citationContainer: {
      get() {
        return this.$store.state.editing.container
      },
      set(container) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {container: container}))
      }
    },
    citationPublisher: {
      get() {
        return this.$store.state.editing.publisher
      },
      set(publisher) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {publisher: publisher}))
      }
    },
    citationURL: {
      get() {
        return this.$store.state.editing.url
      },
      set(url) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {url: url}))
      }
    }
  },
  methods: {
    ...mapActions(['setCitation', 'setEditing'])
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
