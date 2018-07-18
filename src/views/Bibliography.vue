<template>
  <div>
    <section class="hero is-primary" style="min-height: 35vh;">
      <div class="hero-body">
        <div class="container">
          <div class="level is-hidden-tablet">
            <a id="bibliographyTitle" v-if="!editingTitle" class="title is-size-2" v-cloak>{{bibliographyTitle}}</a>
          </div>
          <div class="level is-hidden-mobile">
            <a id="bibliographyTitle" v-if="!editingTitle" class="title is-size-2" @click="editingTitle = true" v-cloak>{{bibliographyTitle}}</a>
            <div v-if="editingTitle" style="background-color: #005eea; color: #fff;">
              <div class="level-item has-text-centered">
                <div>
                  <input id="bibliographyTitleInput" @keyup.enter="editingTitle = false" @mouseout="editingTitle = false" v-model="bibliographyTitle"/>
                </div>
              </div>
            </div>
          </div>
          <h2 class="subtitle" style="margin-top: 10vh;">
            All of your citations will be here.
          </h2>
        </div>
      </div>
    </section>
    <div class="content" id="bibliography">
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
      editingTitle: false,
      typingTitle: false
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
#bibliographyTitle {
  padding: 5px;
}
#bibliographyTitle:hover {
  background-color: #104ba4;
}
#bibliographyTitleInput {
  padding: 5px;
  min-width: 20vh;
  min-height: 5vh;
  border: transparent;
  background-color: #0036b7;
  caret-color: #fff;
  color: #fff;
  border-radius: 5px;
  font-size:2rem;
}
#bibliographyTitleInput:focus {
  border-color: #fff;
  border: transparent;
}
#preview {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
