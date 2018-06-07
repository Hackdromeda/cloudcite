<template>
      <div>
        <h1 class="title" style="color: #ffffff">Edit Citation</h1>
        <div class="panel-block" style="background-color: #ffffff; opacity: 0.9; border-radius: 10px;">
          <form class="control">
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
          </form>
        </div>
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
