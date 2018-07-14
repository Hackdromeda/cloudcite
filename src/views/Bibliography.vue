<template>
  <div class="content" id="bibliography">
    <h1 class="title is-size-2">Bibliography</h1>
    <div v-if="$store.getters.getCitations.length == 0">
      <p>This bibliography looks a little empty. You can create your first citation on the <router-link to="/">homepage</router-link>.</p>
    </div>
    <div class="columns">
      <div class="column"/>
      <div class="column is-7">
        <div id="preview" v-for="(citation, i) in $store.getters.getCitations" :key="i">
          <Preview :cslObject="citation" :refreshInterval="0" :deleteOption="true"/>
        </div>
      </div>
      <div class="column"/>
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
    }
  }
})
export default class Bibliography extends Vue {}
</script>

<style scoped lang="scss">
#bibliographyTitle {
  color: #005eea;
}
#bibliography {
  padding: 10px;
  min-height: 100vh;
  text-align: center;
  justify-content: center;
  background-color: #fff;
}
#preview {
  margin-bottom: 20px;
}
</style>
