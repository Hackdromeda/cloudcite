<template>
      <div>
        <h1 class="title" style="color: #ffffff">Edit Citation</h1>
        <h3 class="subtitle" style="color: #ffffff">No need to click submit! Just return to the homepage to see your citations when you are done editing.</h3>
        <div class="panel-block" style="background-color: #ffffff; opacity: 0.9; border-radius: 10px;">
          <form class="control">
          <div v-for="(author, index) in editing.authors" :key="index">
          <b-field horizontal label="Author">
            <b-input placeholder="First Name" v-model="editing.authors[index].first" expanded></b-input>
            <b-input placeholder="Middle Name" v-model="editing.authors[index].middle" expanded></b-input>
            <b-input placeholder="Last Name" v-model="editing.authors[index].last" expanded></b-input>
          <a v-if="index <= (editing.authors.length - 1) && index > 0" class="button is-danger" @click="deleteAuthor(index)"><b-icon icon="minus"></b-icon></a>
          <a v-if="index <= (editing.authors.length - 1)" class="button is-primary" style="background-color: #30B8D2" @click="newAuthor()"><b-icon icon="plus"></b-icon></a>
          </b-field>
          <div v-if="index < (editing.authors.length - 1)"></div>
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
              <div class="hangingIndent" v-if="editing.authors.length == 1">
                <span v-if="citationAuthors[0].last">
                  {{citationAuthors[0].last + ','}}
                </span>
                <span v-if="citationAuthors[0].first">
                  {{citationAuthors[0].first}} 
                </span>
                <span v-if="citationAuthors[0].middle">
                  {{citationAuthors[0].middle + '.'}} 
                </span>
                <span v-if="citationContainer">
                  "{{citationContainer}}."
                </span>
                <span v-if="citationSource">
                  {{citationSource}},
                </span>
                <span v-if="citationPublisher">
                  <i>{{citationPublisher}}</i>,
                </span>
                <span v-if="citationDayPublished">
                  <i>{{citationDayPublished}}</i>
                </span>
                <span v-if="citationMonthPublished">
                  {{this.abbreviatedMonths[citationMonthPublished]}}
                </span>
                <span v-if="citationYearPublished">
                  {{citationYearPublished}},
                </span>
                <span>
                  {{citationURL}}.
                </span>
                <!--<i>{{(citationSource && citiationPublisher || citiationSource && citationMonthPublished || citationSource && citationURL) ? citationSource + ',': ''}}</i>
                <i>{{((citationSource && !citationPublisher) && (citationSource && !citationMonthPublished) && (citationSource && !citationURL)) ? citationSource + '.': ''}}</i>-->
              </div>
            </article>
          </div>
          <div style="text-align: center;">
            <a class="button is-success" @click="doneEditing()">Done Editing</a>
          </div>
          </form>
        </div>
      </div>
</template>

<script>
const _ = require('lodash');
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'EditCitation',
  data () {
    return {
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      abbreviatedMonths: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ],
      editing: _.cloneDeep(this.$store.state.editing)
    }
  },
  computed: {
    citationAuthors: {
      get() {
        return this.editing.authors
      }
    },
    citationSource: {
      get() {
        return this.editing.source
      },
      set(source) {
        this.editing.source = source
      }
    },
    citationContainer: {
      get() {
        return this.editing.container
      },
      set(container) {
        this.editing.container = container
      }
    },
    citationPublisher: {
      get() {
        return this.editing.publisher
      },
      set(publisher) {
        this.editing.publisher = publisher
      }
    },
    citationURL: {
      get() {
        return this.editing.url
      },
      set(url) {
        this.editing.url = url
      }
    },
    citationMonthPublished: {
      get() {
        return this.editing.datePublished.month
      },
      set(monthIndex) {
        this.editing.datePublished.month = monthIndex + 1
      }
    },
    citationDayPublished: {
      get() {
        return this.editing.datePublished.day
      },
      set(day) {
        this.editing.datePublished.day = day
      }
    },
    citationYearPublished: {
      get() {
        return this.editing.datePublished.year
      },
      set(year) {
        this.editing.datePublished.year = year
      }
    }
  },
  methods: {
    newAuthor() {
      this.editing.authors.push({
        first: null,
        middle: null,
        last: null
      })
    },
    deleteAuthor(index) {
      this.editing.authors = this.editing.authors.filter(element => element !== this.editing.authors[index]);
    },
    doneEditing() {
      this.$store.dispatch('setCitation', this.editing)
      this.$router.push({name: 'CloudCite'})
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
