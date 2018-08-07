<template>
  <div>
    <div id="bibliography">
      <!-- START HERE -->
      <div v-if="$store.state.projects[$store.state.selectedProject].citations.length > 0" id="bibliographyActions" >
        <a @click="copyBibliography()"><i style="color: #fff;" class="clipboard icon" size="small"></i></a><p style="padding-left: 25px;">More Export Options Coming Soon</p>
      </div>
      <p v-if="$store.state.projects[$store.state.selectedProject].citations.length == 0" style="margin-top: 10vh;">
        Your bibliography will be here after you cite a website, book, or film.
      </p>
      <sui-grid :columns="3">
          <sui-grid-row>
            <sui-grid-column :mobile="1" :tablet="3" :computer="5"/>
            <sui-grid-column :mobile="16" :tablet="10" :computer="6" stretched>
              <div v-if="this.$store.getters.getCitations.length >= 1" ref="cslBibRef">
                <BibliographyPreview/>
              </div>
            </sui-grid-column>
            <sui-grid-column :mobile="1" :tablet="3" :computer="5"/>
        </sui-grid-row>
      </sui-grid>
    </div>
    <!-- END HERE -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BibliographyPreview from './BibliographyPreview.vue';
//@ts-ignore
import rp from 'request-promise-native';
import generateCSL from '../generateCSL';
//@ts-ignore
import clipboard from "clipboard-polyfill";

@Component({
  components: {
    BibliographyPreview
  },
  data () {
    return {
      bibliographyTitle: "Bibliography",
      citationsData: []
    }
  },
  methods: {
    copyBibliography() {
      if (this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography && this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.plainText && this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.richText) {
        console.log(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.richText)
        var dt = new clipboard.DT();
        //@ts-ignore
        dt.setData("text/plain", this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.plainText);
        dt.setData("text/html", this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.richText);
        clipboard.write(dt);
      }
    }
  }
})
export default class Bibliography extends Vue {}
</script>

<style scoped lang="scss">
#bibliography {
  padding: 10px;
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
#bibliographyActions {
  display: inline-flex;
  background-color: #0066ff;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 3vh;
  min-width: 30vh;
  color: #fff;
  font-weight: 550;
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
