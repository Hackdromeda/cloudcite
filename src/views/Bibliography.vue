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
      <div id="bibliographyActions" >
        <a @click="copyBibliography()"><i style="color: #fff;" class="clipboard icon" size="small"></i></a><p style="padding-left: 25px;">More Export Options Coming Soon</p>
      </div>
      <div v-if="$store.state.projects[$store.state.selectedProject].citations.length == 0" style="margin-top: 10vh;">
        This bibliography looks a little empty. You can create your first citation on the <a @click="$router.push({path: '/'})">homepage</a>.
      </div>
      <sui-grid :columns="3">
          <sui-grid-row>
            <sui-grid-column/>
            <sui-grid-column stretched>
              <div ref="cslBibRef">
                <div id="preview" v-for="(citation, i) in this.$data.citationsData" :key="i">
                  <div v-if="checkCitation(citation.id)">
                    <Preview :cslObject="citation" :copyOption="true" :editOption="true" :deleteOption="true" :typing="false"/>
                  </div>
                </div>
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
//@ts-ignore
import rp from 'request-promise-native';
import generateCSL from '../generateCSL';
@Component({
  components: {
    Preview
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
      for (let i=0; i < data[0].entry_ids.length; i++) {
        //@ts-ignore
        this.$data.citationsData.push(this.$store.getters.getCitations.filter(c => c.id == data[0].entry_ids[i])[0])
      }
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
      //@ts-ignore
      this.$copyText(this.$refs.cslBibRef.textContent)
    },
    checkCitation(id: string) {
      //@ts-ignore
      if (this.$store.getters.getCitations.filter(c => c.id == id).length > 0) {
        return true
      } else {
        return false
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
