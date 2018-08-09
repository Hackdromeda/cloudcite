<template>
  <div>
    <div id="bibliography">
      <input id="titleInput" placeholder="Enter Project Title" @input="typing = true" v-model="$store.state.projects[$store.state.selectedProject].title"/>
      <div>
        <SearchStyles :projectOption="$store.state.projects[$store.state.selectedProject]"/>
        <sui-dropdown style="margin-top: 3vh;" button type="button" class="icon" floating icon="world" labeled :options="locales" search :text="locales.filter(item => item.value == locale)[0].text" v-model="locale"/>
      </div>
      <div style="margin-top: 5vh;" v-if="$store.state.projects[$store.state.selectedProject].citations.length > 0" id="bibliographyActions" >
        <a @click="copyBibliography()"><i style="color: #fff;" class="clipboard icon" size="small"></i></a><p style="padding-left: 25px;">More Export Options Coming Soon</p>
      </div>
      <div v-if="$store.state.projects[$store.state.selectedProject].citations.length == 0" style="margin-top: 10vh;">
        <p>Your bibliography will be here after you cite a website, book, or film.</p>
      </div>
      <div v-else>
        <BibliographyPreview/>
      </div>
    </div>
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
//@ts-ignore
import debounce from 'lodash/debounce';
import SearchStyles from './SearchStyles.vue';

@Component({
  components: {
    BibliographyPreview,
    SearchStyles
  },
  data () {
    return {
      bibliographyTitle: "Bibliography",
      citationsData: [],
      locale: this.$store.state.projects[this.$store.state.selectedProject].locale,
      locales: require('./locales.json'),
      typing: false
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
  },
  watch: {
    typing: debounce(function () {
      //@ts-ignore
      if (this.$store.getters.getProjects[this.$store.state.selectedProject].title == "" || !this.$store.getters.getProjects[this.$store.state.selectedProject].title) {
        //@ts-ignore
        this.$store.getters.getProjects[this.$store.state.selectedProject].title = "Untitled Project"
      }
      //@ts-ignore
        this.$store.dispatch('saveState')
        //@ts-ignore
        this.$data.typing = false
    }, 3000),
    locale() {
      this.$store.dispatch('setLocale', this.$data.locale)
      this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: true}))
    }
  }
})
export default class Bibliography extends Vue {}
</script>

<style scoped lang="scss">
@media (max-width: 991.97px) {
  #bibliographyActions {
    font-size: 0.9rem;
  }
}
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
  min-width: 25vh;
  color: #fff;
  font-weight: 550;
}
#titleInput {
  text-align: center;
  display: inline-flex;
  color: #005eea;
  min-height: 60px;
  font-size: 2rem;
  font-weight: 550;
  border-color: transparent;
  margin-bottom: 3vh;
}
#titleInput:focus {
  outline: none;
}
</style>
