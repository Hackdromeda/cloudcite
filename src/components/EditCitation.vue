<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-three-quarters" style="background-color: #ffffff; opacity: 0.9; border-radius: 5px;">
      <h1 class="title" style="color: #149fda;">Edit Citation</h1>
        <b-field horizontal label="Author">
          <b-input placeholder="Author" :value="getEditing.authors" expanded></b-input>
        </b-field>
        <b-field horizontal label="Source">
          <b-input placeholder="Source" :value="getEditing.source" expanded></b-input>
        </b-field>
        <b-field horizontal label="Container">
          <b-input placeholder="Container" :value="getEditing.container" expanded></b-input>
        </b-field>
        <b-field horizontal label="Website">
          <b-input placeholder="Website" :value="getEditing.url" expanded></b-input>
        </b-field>
        <b-field horizontal label="Publisher">
          <b-input placeholder="Publisher" :value="getEditing.publisher" expanded></b-input>
        </b-field>
        <b-field horizontal label="Date Published">
            <b-datepicker placeholder="Type or select a date MM/DD/YYYY" icon="calendar-today" :readonly="false"></b-datepicker>
        </b-field>
        <b-field horizontal label="Date Accessed">
            <b-datepicker placeholder="Type or select a date MM/DD/YYYY" icon="calendar-today" :readonly="false"></b-datepicker>
        </b-field>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EditCitation',
  computed: {
    ...mapGetters(['getEditing'])
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
