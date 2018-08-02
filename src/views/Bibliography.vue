<template>
  <div>
    <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
        <div class="container" style="padding: 7vh;">
          <h1 v-cloak>{{ bibliographyTitle }}</h1>
          <h2 class="subtitle" style="margin-top: 10vh;">
            All of your citations will be here.
          </h2>
        </div>
    </div>
    <div id="bibliography">
      <div v-if="$store.state.projects[$store.state.selectedProject].citations.length == 0" style="margin-top: 10vh;">
        This bibliography looks a little empty. You can create your first citation on the <a @click="$router.push({path: '/'})">homepage</a>.
      </div>
      <sui-grid :columns="3">
          <sui-grid-row>
            <sui-grid-column/>
            <sui-grid-column stretched>
              <div id="preview" v-for="(citation, i) in $store.state.projects[$store.state.selectedProject].citations" :key="i">
                <Preview :cslObject="citation" :copyOption="true" :editOption="true" :deleteOption="true" />
              </div>
            </sui-grid-column>
            <sui-grid-column/>
        </sui-grid-row>
      </sui-grid>
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
      bibliographyTitle: "Bibliography"
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
  color: #fff;
  font-size: 2.3rem;
  font-weight: 600;
}
#bibliographyTitle:hover {
  background-color: #104ba4;
}
#editTitle {
  background-color: transparent;
  border-color: transparent;
  color: #fff;
}
#editTitle::selection {
  color: #fff;
}
#preview {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
