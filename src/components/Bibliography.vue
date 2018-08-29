<template>
  <div>
    <div id="bibliography">
      <input id="titleInput" placeholder="Enter Project Title" @input="typing = true" v-model="projects[selectedProject].title" maxlength="20"/>
      <div>
        <SearchStyles :projectOption="projects[selectedProject]"/>
      </div>
      <div style="margin-top: 5vh;" v-if="projects[selectedProject].citations.length > 0" id="bibliographyActions" >
        <a @click="copyBibliography()"><i style="color: #fff;" class="clipboard icon" size="small"></i></a><p style="padding-left: 25px;">More Export Options Coming Soon</p>
      </div>
      <div v-if="projects[selectedProject].citations.length == 0" style="margin-top: 10vh;">
        <p>Your bibliography will be here after you cite a website, book, or film.</p>
      </div>
      <div v-else>
        <div v-if="loading" style="display: inline-flex">
          <div>
            <bounce-loader color="#005eea"/>
          </div>
        </div>
        <div id="bibliographyPreview">
        <sui-segment v-if="!loading">
          <div class="csl-bib-body" :style="(cslFormat) ? (((cslFormat.linespacing) ? ('line-height: ' + cslFormat.linespacing + ';'): '') + ((cslFormat.hangingindent) ? ('margin-left: ' + cslFormat.hangingindent + 'em;'): '') + ((cslFormat.hangingindent) ? ('text-indent: -' + cslFormat.hangingindent + 'em;'): '')): ''">
            <div v-for="(cslEntry, i) in this.$data.cslHTML" :key="i">
              <div v-if="$store.getters.getCitations.filter(citation => citation.id == cslEntry.id).length > 0">
                <div :id="cslEntry.id" :style="'clear: left;' + cslFormat && cslFormat.entryspacing ? ('margin-bottom:' + cslFormat.entryspacing + 'em;'): ''" v-html="cslEntry.html"/>
                  <div id="citationOptions">
                    <span>
                      <a @click="copyCitation(cslEntry.id)"><sui-icon style="color: #4b636e;" name="clipboard" /></a>
                      <a @click="editCitation(cslEntry.id, cslEntry.type)"><sui-icon style="color: #4b636e;" name="pencil" /></a>
                      <a @click="removeCitation(cslEntry.id)"><sui-icon style="color: #4b636e;" name="trash" /></a>
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </sui-segment>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import rp from 'request-promise-native';
import generateCSL from '../functions/generateCSL';
import generateHTML from '../functions/generateHTML';
//@ts-ignore
import clipboard from "clipboard-polyfill";
//@ts-ignore
import debounce from 'lodash/debounce';
//@ts-ignore
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import SearchStyles from './SearchStyles.vue';
//@ts-ignore
import _ from 'lodash';

@Component({
  components: {
    SearchStyles,
    BounceLoader
  },
  async created() {
    this.$data.loading = true;
    //@ts-ignore
    if (this.$store.getters.getCitations.length > 0 && this.projects[this.selectedProject].cachedBibliography && !this.projects[this.selectedProject].cachedBibliography.outdated) {
      //@ts-ignore
      this.$data.cslHTML = this.projects[this.selectedProject].cachedBibliography.html
      //@ts-ignore
      this.$data.cslFormat = this.projects[this.selectedProject].cachedBibliography.type
    }
    else if (this.$store.getters.getCitations.length > 0) {
      //@ts-ignore
      var cslData = {}
      for (let i=0; i < this.$store.getters.getCitations.length; i++) {
        //@ts-ignore
        cslData[this.$store.getters.getCitations[i].id] = generateCSL(this.$store.getters.getCitations[i])[this.$store.getters.getCitations[i].id]
      }
      //@ts-ignore
      const generatedHTML = await generateHTML({style: this.projects[this.selectedProject].style, locale: this.projects[this.selectedProject].locale, csl: cslData, lang: (this.$data.styles.filter(style => style.value == this.projects[this.selectedProject].style)[0].loc ? null: 'en-US'), cslHTML: this.$data.cslHTML})
      if (generatedHTML.error) {
        console.log(generatedHTML.error)
      }
      else {
        this.$data.cslFormat = generatedHTML.format
        this.$data.cslHTML = generatedHTML.html
        //@ts-ignore
        this.$store.dispatch('cacheBibliography', Object.assign(this.projects[this.selectedProject].cachedBibliography, {outdated: false, html: this.$data.cslHTML, type: this.$data.cslFormat, richText: generatedHTML.richTextHTML ? generatedHTML.richTextHTML: ""}))
      }
    }
    this.$data.loading = false;
  },
  async updated() {
    //@ts-ignore
    if (this.$store.getters.getCitations.length > 0 && this.projects[this.selectedProject].cachedBibliography && !this.projects[this.selectedProject].cachedBibliography.outdated) {
      //@ts-ignore
      this.$data.cslHTML = this.projects[this.selectedProject].cachedBibliography.html
      //@ts-ignore
      this.$data.cslFormat = this.projects[this.selectedProject].cachedBibliography.type
    }
    else if (this.$store.getters.getCitations.length > 0) {
      //@ts-ignore
      var cslData = {}
      for (let i=0; i < this.$store.getters.getCitations.length; i++) {
        //@ts-ignore
        cslData[this.$store.getters.getCitations[i].id] = generateCSL(this.$store.getters.getCitations[i])[this.$store.getters.getCitations[i].id]
      }
      //@ts-ignore
      const generatedHTML = await generateHTML({style: this.projects[this.selectedProject].style, locale: this.projects[this.selectedProject].locale, csl: cslData, lang: (this.$data.styles.filter(style => style.value == this.projects[this.selectedProject].style)[0].loc ? null: 'en-US'), cslHTML: this.$data.cslHTML})
      if (generatedHTML.error) {
        console.log(generatedHTML.error)
      }
      else {
        this.$data.cslFormat = generatedHTML.format
        this.$data.cslHTML = generatedHTML.html
        //@ts-ignore
        this.$store.dispatch('cacheBibliography', Object.assign(this.projects[this.selectedProject].cachedBibliography, {outdated: false, html: this.$data.cslHTML, type: this.$data.cslFormat, richText: generatedHTML.richTextHTML ? generatedHTML.richTextHTML: ""}))
      }
    }
  },
  data () {
    return {
      bibliographyTitle: "Bibliography",
      citationsData: [],
      typing: false,
      cslHTML: [],
      cslFormat: null,
      styles: require('./styles.json'),
      loading: false
    }
  },
  computed: {
    style: {
      get() {
        return this.$store.state.projects[this.$store.state.selectedProject].style
      }
    },
    locale: {
      get() {
        return this.$store.state.projects[this.$store.state.selectedProject].locale
      }
    },
    projects: {
      get() {
        return this.$store.getters.getProjects
      }
    },
    selectedProject: {
      get() {
        return this.$store.state.selectedProject
      }
    }
  },
  methods: {
    copyBibliography() {
      var html = '<div class="csl-bib-body" style="';
      //@ts-ignore
      html += ((this.$data.cslFormat) ? ((this.$data.cslFormat.linespacing ? ('line-height: ' + this.$data.cslFormat.linespacing + ';'): '') + ((this.$data.cslFormat.hangingindent) ? ('text-indent: -' + this.$data.cslFormat.hangingindent + 'em;'): '') + ''): '') + '">';
      //@ts-ignore
      html += '<div style="clear: left;';
      //@ts-ignore
      html += (this.$data.cslFormat.entryspacing ? ('margin-bottom:' + this.$data.cslFormat.entryspacing + 'em;"'): '"') + '>';

      for (let i=0; i < this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.html.length; i++) {
        //@ts-ignore
        html += this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.html[i].html;
      }

      html += '</div>';
      html += '</div>';
      var dt = new clipboard.DT();
      //@ts-ignore
      dt.setData("text/plain", document.getElementById("bibliographyPreview").textContent);
      dt.setData("text/html", html);
      clipboard.write(dt);
      console.log(html)
    },
    typeURL(url: string) {
        var newURL: string = ""
        switch (url.substring(0, 7)) {
            case 'https:/':
                newURL = url.substring(8, url.length)
                break;
            case 'http://':
                newURL =  url.substring(7, url.length)
                break;
            default:
                newURL = url
        }
        if (newURL.substring(0, 4) == "www.") {
            newURL = newURL.substring(4, newURL.length)
        }
        return newURL
    },
    copyCitation(id: string) {
        //@ts-ignore
        if (this.$data.cslHTML.filter(entry => entry.id == id)[0] && this.$data.cslHTML.filter(entry => entry.id == id)[0].html) {
          //@ts-ignore
          var cslHTML = this.$data.cslHTML.filter(entry => entry.id == id)[0].html
          //@ts-ignore
          var html = '<div class="csl-bib-body" style="'
          //@ts-ignore
          html += ((this.$data.cslFormat) ? ((this.$data.cslFormat.linespacing ? ('line-height: ' + this.$data.cslFormat.linespacing + ';'): '') + ((this.$data.cslFormat.hangingindent) ? ('text-indent: -' + this.$data.cslFormat.hangingindent + 'em;'): '') + ''): '') + '">'
          //@ts-ignore
          html += '<div style="clear: left;'
          //@ts-ignore
          html += (this.$data.cslFormat.entryspacing ? ('margin-bottom:' + this.$data.cslFormat.entryspacing + 'em;"'): '"') + '>'
          //@ts-ignore
          html += cslHTML
          html += '</div>'
          html += '</div>'
          console.log(html)
          var dt = new clipboard.DT();
          //@ts-ignore
          dt.setData("text/plain", document.getElementById(id).textContent);
          dt.setData("text/html", html);
          clipboard.write(dt);
        }
    },
    editCitation(id: string, type: string) {
      //@ts-ignore
      var cslData = this.$store.getters.getCitations.filter(citation => citation.id == id)[0]
      //@ts-ignore
      cslData.contributors = cslData.contributors.map(contributor => _.pickBy(Object.assign(contributor, {given: (contributor.given && contributor.given.split(" ")[0] ? contributor.given.split(" ")[0]: null), middle: (contributor.given && contributor.given.split(" ")[1] ? contributor.given.split(" ")[1]: null)})));
      //@ts-ignore
      if (cslData && cslData.type && cslData.type == "website") {
        //@ts-ignore
        this.$store.dispatch('setEditingCitation', cslData)
        this.$router.push({path: '/edit/website/'})
      }
      //@ts-ignore
      else if (cslData && cslData.type && cslData.type == "book") {
        //@ts-ignore
        this.$store.dispatch('setEditingCitation', cslData)
        this.$router.push({path: '/edit/book/'})
      }
      //@ts-ignore
      else if (cslData && cslData.type && cslData.type == "motion_picture") {
        //@ts-ignore
        this.$store.dispatch('setEditingCitation', cslData)
        this.$router.push({path: '/edit/film/'})
      }
    },
    removeCitation(id: string) {
      //@ts-ignore
      this.$store.dispatch('removeCitationById', id)
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
    //@ts-ignore
    async style() {
      this.$data.loading = true;
      if (this.$store.getters.getCitations.length > 0) {
        this.$data.cslHTML = []
        this.$data.cslFormat = null
        //@ts-ignore
        var cslData = {}
        for (let i=0; i < this.$store.getters.getCitations.length; i++) {
          //@ts-ignore
          cslData[this.$store.getters.getCitations[i].id] = generateCSL(this.$store.getters.getCitations[i])[this.$store.getters.getCitations[i].id]
        }
        //@ts-ignore
        const generatedHTML = await generateHTML({style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: cslData, lang: (this.$data.styles.filter(style => style.value == this.$store.state.projects[this.$store.state.selectedProject].style)[0].loc ? null: 'en-US'), cslHTML: this.$data.cslHTML})
        if (generatedHTML.error) {
          console.log(generatedHTML.error)
        }
        else {
          this.$data.cslFormat = generatedHTML.format
          this.$data.cslHTML = generatedHTML.html
          //@ts-ignore
          this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: false, html: this.$data.cslHTML, type: this.$data.cslFormat, richText: generatedHTML.richTextHTML ? generatedHTML.richTextHTML: ""}))
        }
      }
      this.$data.loading = false;
    },
    async locale() {
      this.$data.loading = true;
      if (this.$store.getters.getCitations.length > 0) {
        this.$data.cslHTML = []
        this.$data.cslFormat = null
        //@ts-ignore
        var cslData = {}
        for (let i=0; i < this.$store.getters.getCitations.length; i++) {
          //@ts-ignore
          cslData[this.$store.getters.getCitations[i].id] = generateCSL(this.$store.getters.getCitations[i])[this.$store.getters.getCitations[i].id]
        }
        //@ts-ignore
        const generatedHTML = await generateHTML({style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: cslData, lang: (this.$data.styles.filter(style => style.value == this.$store.state.projects[this.$store.state.selectedProject].style)[0].loc ? null: 'en-US'), cslHTML: this.$data.cslHTML})
        if (generatedHTML.error) {
          console.log(generatedHTML.error)
        }
        else {
          this.$data.cslFormat = generatedHTML.format
          this.$data.cslHTML = generatedHTML.html
          //@ts-ignore
          this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: false, html: this.$data.cslHTML, type: this.$data.cslFormat, richText: generatedHTML.richTextHTML ? generatedHTML.richTextHTML: ""}))
        }
      }
      this.$data.loading = false;
    }
  }
})
export default class Bibliography extends Vue {}
</script>

<style scoped lang="scss">
@media (min-width: 991.98px) {
  #bibliographyPreview {
    color: #000;
    min-height: 16vh;
    text-align: left;
    font-weight: normal !important;
  }
}
@media (max-width: 991.97px) {
  #bibliographyActions {
    font-size: 0.9rem;
  }
  #bibliographyPreview {
    color: #000;
    text-align: left;
    font-weight: normal !important;
  }
}
#citationOptions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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
