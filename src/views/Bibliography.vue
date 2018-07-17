<template>
  <div>
    <section class="hero is-primary" style="height: 35vh;">
      <div class="hero-body">
        <div class="container">
          <a id="bibliographyTitle" v-if="!editingTitle" class="title is-size-2" @click="editingTitle = true">{{bibliographyTitle}}</a>
          <h2 class="subtitle" style="margin-top: 10vh;">
            All of your citations will be here.
          </h2>
        </div>
      </div>
    </section>
    <div class="content" id="bibliography">
      <div v-if="editingTitle" class="columns">
        <div class="column"/>
        <div class="column is-2">
          <b-field>
            <b-input autofocus v-model="bibliographyTitle" @keyup.native.enter="editingTitle = false" expanded/>
            <p class="control">
              <a class="button" @click="editingTitle = false"><b-icon icon="check" custom-size="mdi-24px" type="is-primary"/></a>
            </p>
          </b-field>
        </div>
        <div class="column"/>
      </div>
      <div v-if="$store.getters.getCitations.length == 0" style="margin-top: 10vh;">
        <p>This bibliography looks a little empty. You can create your first citation on the <router-link to="/">homepage</router-link>.</p>
      </div>
      <div class="columns">
        <div class="column"/>
        <div class="column is-7">
          <div id="preview" v-for="(citation, i) in $store.getters.getCitations" :key="i">
            <Preview :cslObject="citation" :deleteOption="true" :copyOption="true"/>
          </div>
        </div>
        <div class="column"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Preview from '../components/Preview.vue';
@Component({
  components: {
    Preview
  },
  data () {
    return {
      bibliographyTitle: "Bibliography",
      editingTitle: false
    }
  }
})
export default class Bibliography extends Vue {}
</script>

<style scoped lang="scss">
#bibliography {
  padding: 10px;
  min-height: 100vh;
  text-align: center;
  justify-content: center;
  background-color: #fff;
}
#preview {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
