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
          <a v-if="index <= (getEditing.authors.length - 1) && index > 0" class="button is-danger" @click="deleteAuthor(index)"><b-icon icon="minus"></b-icon></a>
          <a v-if="index <= (getEditing.authors.length - 1)" class="button is-primary" style="background-color: #30B8D2" @click="newAuthor()"><b-icon icon="plus"></b-icon></a>
          </b-field>
          <div v-if="index < (getEditing.authors.length - 1)"></div>
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
            <b-select v-model="citationMonthPublished" placeholder="Please select a month">
              <option v-for="(month, i) in monthNames" :value="i" :key="i">
                {{ month }}
              </option>
            </b-select>
            <b-input v-model.number="citationDayPublished" type="number" maxlength="2" placeholder="Day" expanded></b-input>
            <b-input v-model.number="citationYearPublished" type="number" maxlength="4" placeholder="Year" expanded></b-input>
          </b-field>
          <div class="tile is-parent">
            <article class="tile is-child notification">
              <div class="content">
                <div v-if="getEditing.authors.length == 1">{{getEditing.authors[0].lastName}}{{getEditing.authors[0].firstName}}{{getEditing.authors[0].middleName ? getEditing.authors[0].middleName: '' + ". "}}</div>
                <div v-if="citationContainer">{{'"' + citationContainer + '."'}}</div><div v-if="citationSource && citationSource != (citationPublisher ? citationPublisher: '')"><i>{{citationSource.substring(0, 1).toUpperCase() + citationSource.substring(1, citationSource.length + 1)}}</i></div><div v-if="citationPublisher">{{" " + citationPublisher + (this.getEditing.datePublished ? ", ": "")}}</div><div v-if="this.getEditing.datePublished">{{citationMonthPublished + (citationURL ? ", ": "")}}</div><div v-if="citationURL">{{citationURL + "."}}</div>
              </div>
            </article>
          </div>
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
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      abbreviatedMonths: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ]
    }
  },
  computed: {
    ...mapGetters(['getEditing', 'getCitation']),
    citationAuthors: {
      get() {
        return this.getEditing.authors
      }
    },
    citationSource: {
      get() {
        return this.getEditing.source
      },
      set(source) {
        this.$store.dispatch('setEditing', Object.assign(this.getEditing, {source: source}))
        this.$store.dispatch('setCitation', this.getEditing)
      }
    },
    citationContainer: {
      get() {
        return this.getEditing.container
      },
      set(container) {
        this.$store.dispatch('setEditing', Object.assign(this.getEditing, {container: container}))
        this.$store.dispatch('setCitation', this.getEditing)
      }
    },
    citationPublisher: {
      get() {
        return this.getEditing.publisher
      },
      set(publisher) {
        this.$store.dispatch('setEditing', Object.assign(this.getEditing, {publisher: publisher}))
        this.$store.dispatch('setCitation', this.getEditing)
      }
    },
    citationURL: {
      get() {
        return this.getEditing.url
      },
      set(url) {
        this.$store.dispatch('setEditing', Object.assign(this.getEditing, {url: url}))
        this.$store.dispatch('setCitation', this.getEditing)
      }
    },
    citationMonthPublished: {
      get() {
        return this.getEditing.datePublished.month
      },
      set(monthIndex) {
        var editing = this.getEditing
        editing.datePublished.month = monthIndex + 1
        this.$store.dispatch('setEditing', editing)
        this.$store.dispatch('setCitation', this.getEditing)
      }
    },
    citationDayPublished: {
      get() {
        return this.getEditing.datePublished.day
      },
      set(day) {
        var editing = this.getEditing
        editing.datePublished.day = day
        this.$store.dispatch('setEditing', editing)
        this.$store.dispatch('setCitation', this.getEditing)
      }
    },
    citationYearPublished: {
      get() {
        return this.getEditing.datePublished.year
      },
      set(year) {
        var editing = this.getEditing
        editing.datePublished.year = year
        this.$store.dispatch('setEditing', editing)
        this.$store.dispatch('setCitation', this.getEditing)
      }
    }
  },
  methods: {
    ...mapActions(['setCitation', 'setEditing', 'setEditingCitationAuthor', 'addNewEditingAuthor', 'removeEditingAuthor']),
    updateAuthors(authorsIndex, field, event) {
      this.$store.dispatch('setEditingCitationAuthor', {authorsIndex, field, event})
      this.$store.dispatch('setCitation', this.getEditing)
    },
    newAuthor() {
      this.$store.dispatch('addNewEditingAuthor')
      this.$store.dispatch('setCitation', this.getEditing)
    },
    deleteAuthor(index) {
      this.$store.dispatch('removeEditingAuthor', {element: this.getEditing.authors[index]})
      this.$store.dispatch('setCitation', this.getEditing)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
