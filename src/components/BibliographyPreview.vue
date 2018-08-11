<template>
  <div id="bibliographyPreview">
    <sui-segment>
    <div class="csl-bib-body" :style="(cslFormat) ? (((cslFormat.linespacing) ? ('line-height: ' + cslFormat.linespacing + ';'): '') + ((cslFormat.hangingindent) ? ('margin-left: ' + cslFormat.hangingindent + 'em;'): '') + ((cslFormat.hangingindent) ? ('text-indent: -' + cslFormat.hangingindent + 'em;'): '')): ''">
      <div v-for="(cslEntry, i) in this.$data.cslHTML" :key="i">
        <div v-if="$store.getters.getCitations.filter(citation => citation.id == cslEntry.id).length > 0">
          <div :id="cslEntry.id" :style="'clear: left;' + cslFormat && cslFormat.entryspacing ? ('margin-bottom:' + cslFormat.entryspacing + 'em;'): ''" v-html="cslEntry.html"/>
            <div id="citationOptions">
              <span>
                <a @click="copyCitation(cslEntry.id)"><sui-icon style="color: #4b636e;" name="clipboard" /></a>
                <a @click="editCitation(cslEntry.id)"><sui-icon style="color: #4b636e;" name="pencil" /></a>
                <a @click="removeCitation(cslEntry.id)"><sui-icon style="color: #4b636e;" name="trash" /></a>
              </span>
            </div>
        </div>
      </div>
    </div>
    </sui-segment>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import rp from 'request-promise-native';
import WebsiteCitation from '../WebsiteCitation';
import generateCSL from '../functions/generateCSL';
import generateHTML from '../functions/generateHTML';
//@ts-ignore
import clipboard from "clipboard-polyfill";
//@ts-ignore
import _ from 'lodash';

@Component({
  components: {},
  async created() {
    //@ts-ignore
    if (this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography && !this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.outdated) {
      this.$data.cslHTML = this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.html
      this.$data.cslFormat = this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.format
    }
    else {
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
        this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: false, html: this.$data.cslHTML, format: this.$data.cslFormat, richText: generatedHTML.richTextHTML ? generatedHTML.richTextHTML: ""}))
      }
    }
  },
  data () {
    return {
      cslHTML: [],
      cslFormat: null,
      showPreview: true,
      styles: require('./styles.json')
    }
  },
  updated() {
    if (this.$data.cslFormat && this.$data.cslHTML.length > 0) {
      //@ts-ignore
      var html = '<div class="csl-bib-body" style="'
      //@ts-ignore
      html += ((this.$data.cslFormat) ? ((this.$data.cslFormat.linespacing ? ('line-height: ' + this.$data.cslFormat.linespacing + '; '): '') + (this.$data.cslFormat.hangingindent ? ('margin-left: ' + this.$data.cslFormat.hangingindent + 'em;'): '') + (this.$data.cslFormat.hangingindent ? (' text-indent: -' + this.$data.cslFormat.hangingindent + 'em;'): '')): '') + '">'
      //@ts-ignore
      for (let i=0; i < this.$data.cslHTML.length; i++) {
        html += '<div style="clear: left;'
        //@ts-ignore
        html += (this.$data.cslFormat && this.$data.cslFormat.entryspacing ? ('margin-bottom:' + this.$data.cslFormat.entryspacing + 'em;"'): '"') + '>'
        //@ts-ignore
        html += this.$data.cslHTML[i].html
        html += '</div>'
      }
      html += '</div>'
      //@ts-ignore
      this.$store.dispatch('cacheBibliography', {outdated: false, html: this.$data.cslHTML, format: this.$data.cslFormat, plainText: document.getElementById('bibliographyPreview').textContent, richText: html})
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
    }
  },
  methods: {
    formatURL(url: string) {
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
          html += ((this.$data.cslFormat) ? ((this.$data.cslFormat.linespacing ? ('line-height: ' + this.$data.cslFormat.linespacing + ';'): '') + ((this.$data.cslFormat.hangingindent) ? ('margin-left: ' + this.$data.cslFormat.hangingindent + 'em;text-indent: -' + this.$data.cslFormat.hangingindent + 'em;'): '') + ''): '') + '">'
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
          /*
          this.$toast.open({
              duration: 3000,
              message: `Copied to Clipboard`,
              position: 'is-bottom-right',
              type: 'is-success'
          })
          */
        }
    },
    editCitation(id: string) {
      //@ts-ignore
      var cslData = this.$store.getters.getCitations.filter(citation => citation.id == id)[0]
      //@ts-ignore
      if (id.includes('Website') && cslData) {
        //@ts-ignore
        this.$store.dispatch('setEditingProject', cslData)
        this.$router.push({path: '/edit/website/'})
      }
      //@ts-ignore
      else if (id.includes('Book') && cslData) {
        //@ts-ignore
        this.$store.dispatch('setEditingProject', cslData)
        this.$router.push({path: '/edit/book/'})
      }
      //@ts-ignore
      else if (id.includes('Film') && cslData) {
        //@ts-ignore
        this.$store.dispatch('setEditingProject', cslData)
        this.$router.push({path: '/edit/film/'})
      }
    },
    removeCitation(id: string) {
      //@ts-ignore
      this.$store.dispatch('removeCitationById', id)
      /*
      this.$toast.open({
          duration: 3000,
          message: `Removed Citation`,
          position: 'is-bottom-right',
          type: 'is-success'
      })
      */
    }
  },
  watch: {
    //@ts-ignore
    async style() {
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
        this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: false, html: this.$data.cslHTML, format: this.$data.cslFormat, richText: generatedHTML.richTextHTML ? generatedHTML.richTextHTML: ""}))
      }
    },
    async locale() {
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
        this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: false, html: this.$data.cslHTML, format: this.$data.cslFormat, richText: generatedHTML.richTextHTML ? generatedHTML.richTextHTML: ""}))
      }
    }
  }
})
export default class BibliographyPreview extends Vue {}
</script>

<style scoped lang="scss">
  #citationOptions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
@media (max-width: 991.97px) {
  #bibliographyPreview {
    color: #000;
    text-align: left;
    font-weight: normal !important;
  }
}
@media (min-width: 991.98px) {
  #bibliographyPreview {
    color: #000;
    min-height: 16vh;
    text-align: left;
    font-weight: normal !important;
  }
}
</style>
