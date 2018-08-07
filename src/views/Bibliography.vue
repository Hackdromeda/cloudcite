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
      <div v-if="$store.state.projects[$store.state.selectedProject].citations.length > 0" id="bibliographyActions" >
        <a @click="copyBibliography()"><i style="color: #fff;" class="clipboard icon" size="small"></i></a><p style="padding-left: 25px;">More Export Options Coming Soon</p>
      </div>
      <div v-if="$store.state.projects[$store.state.selectedProject].citations.length == 0" style="margin-top: 10vh;">
        This bibliography looks a little empty. You can create your first citation on the <a @click="$router.push({path: '/'})">homepage</a>.
      </div>
      <sui-grid :columns="3">
          <sui-grid-row>
            <sui-grid-column :mobile="2" :tablet="3" :computer="5"/>
            <sui-grid-column :mobile="12" :tablet="10" :computer="6" stretched>
              <div v-if="this.$store.getters.getCitations.length >= 1" ref="cslBibRef">
                <BibliographyPreview/>
              </div>
            </sui-grid-column>
            <sui-grid-column :mobile="2" :tablet="3" :computer="5"/>
        </sui-grid-row>
      </sui-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BibliographyPreview from '../components/BibliographyPreview.vue';
//@ts-ignore
import rp from 'request-promise-native';
import generateCSL from '../generateCSL';
//@ts-ignore
import clipboard from "clipboard-polyfill";

@Component({
  components: {
    BibliographyPreview
  },
  created () {
    var cslObject = {}
    for (let i=0; i < this.$store.getters.getCitations.length; i++) {
      //@ts-ignore
      cslObject[this.$store.getters.getCitations[i].id] = generateCSL(this.$store.getters.getCitations[i])[this.$store.getters.getCitations[i].id]
    }
    rp({
        uri: 'https://api.cloudcite.net/cite',
        headers: {
          'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
        },
        method: 'POST',
        //@ts-ignore
        body: {style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: cslObject},
        json: true
        //@ts-ignore
    })
    //@ts-ignore
    .then(data => {
      console.log(data)
      this.$store.dispatch('clearProjectsCacheById', this.$store.state.projects[this.$store.state.selectedProject].id)
    })
    //@ts-ignore
    .catch(error => {
      console.log(error)
    })
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
