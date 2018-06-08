<template>
      <div>
        <h1 class="title" style="color: #ffffff">Edit Citation</h1>
        <h3 class="subtitle" style="color: #ffffff">No need to click submit! Just return to the homepage to see your citations when you are done editing.</h3>
        <div class="panel-block" style="background-color: #ffffff; opacity: 0.9; border-radius: 10px;">
          <form class="control">
          <div v-for="(author, index) in citationAuthors" :key="index">
          <b-field horizontal label="Author">
            <b-input placeholder="First Name" :value="citationAuthors[index].firstName" v-on:input="updateAuthors(index, 'firstName', $event)" expanded></b-input>
            <b-input placeholder="Middle Name" :value="citationAuthors[index].middleName" v-on:input="updateAuthors(index, 'middleName', $event)" expanded></b-input>
            <b-input placeholder="Last Name" :value="citationAuthors[index].lastName" v-on:input="updateAuthors(index, 'lastName', $event)" expanded></b-input>
          </b-field>
          </div>
          <br>
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
            <b-select :placeholder="(citationDatePublished ? citationDatePublished.month: 'Please select a month')">
              <option v-for="(month, i) in monthNames" :value="month" :key="i">
                {{ month }}
              </option>
            </b-select>
          </b-field>
          <!--<div class="tile is-parent">
            <article class="tile is-child notification">
              <div class="content">
                <div v-if="citationAuthors">{{citationAuthors.split(' ')[1] + ", " + citationAuthors.split(' ')[0] + "."}}</div><div v-if="citationContainer">{{'"' + citationContainer + '."'}}</div><div v-if="citationSource && citationSource != (citationPublisher ? citationPublisher: '')"><i>{{citationSource.substring(0, 1).toUpperCase() + citationSource.substring(1, citationSource.length + 1)}}</i></div><div v-if="citationPublisher">{{" " + citationPublisher + (citationDatePublished ? ", ": "")}}</div><div v-if="citationDatePublished">{{citationDatePublished.dateLong + (citationURL ? ", ": "")}}</div><div v-if="citationURL">{{citationURL + "."}}</div>
              </div>
            </article>
          </div>-->
          </form>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'EditCitation',
  data () {
    return {
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
  },
  computed: {
    ...mapGetters(['getEditing', 'getCitation']),
    citationAuthors: {
      get() {
        return this.$store.state.editing.authors
      },
      set(authors) {
        console.log("AUTHORS: " + authors)
        this.$store.dispatch('setCitation', this.$store.state.editing)
      }
    },
    citationSource: {
      get() {
        return this.$store.state.editing.source
      },
      set(source) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {source: source}))
        this.$store.dispatch('setCitation', this.$store.state.editing)
      }
    },
    citationContainer: {
      get() {
        return this.$store.state.editing.container
      },
      set(container) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {container: container}))
        this.$store.dispatch('setCitation', this.$store.state.editing)
      }
    },
    citationPublisher: {
      get() {
        return this.$store.state.editing.publisher
      },
      set(publisher) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {publisher: publisher}))
        this.$store.dispatch('setCitation', this.$store.state.editing)
      }
    },
    citationURL: {
      get() {
        return this.$store.state.editing.url
      },
      set(url) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {url: url}))
        this.$store.dispatch('setCitation', this.$store.state.editing)
      }
    },
    citationDatePublished: {
      get() {
        return this.$store.state.editing.datePublished
      },
      set(datePublished) {
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {datePublished: datePublished}))
        this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing.datePublished, {dateLong: this.$store.state.editing.datePublished.month + " " + this.$store.state.editing.datePublished.day + ", " + this.$store.state.editing.datePublished.year}))
        this.$store.dispatch('setCitation', this.$store.state.editing)
      }
    },
  },
  methods: {
    ...mapActions(['setCitation', 'setEditing']),
    updateAuthors(index, field, event) {
      var authors = this.$store.state.editing.authors;
      switch (field) {
        case 'firstName':
          authors[index].firstName = event
          break;
        case 'middleName':
          authors[index].middleName = event
          break;
        case 'lastName':
          authors[index].lastName = event
          break;
        default:
          console.log('Invalid author field')
      }

      this.$store.dispatch('setEditing', Object.assign(this.$store.state.editing, {'authors': authors}))
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
