<template>
  <div id="preview">
    <div class="csl-bib-body" :style="(cslHTML.indexOf('csl-left-margin') == -1 && cslFormat) ? ('line-height: ' + cslFormat.linespacing + ';' + 'margin-left: ' + cslFormat.hangingindent + 'em; text-indent: -' + cslFormat.hangingindent + 'em;'): ''" ref="cslBibRef">
      <div v-for="(cslEntry, i) in cslHTML" :key="i">
        <div :style="'clear: left;' + cslFormat && cslFormat.entryspacing ? ('margin-bottom:' + cslFormat.entryspacing + 'em;'): ''" v-html="cslEntry"/>
        <div id="previewStatus" v-if="typingStatus">
          Editing Citation
        </div>
        <div id="citationOptions">
          <span>
            <a v-if="clipboardButton" @click="copyCitation()"><i style="color: #4b636e;" class="clipboard icon" size="small"></i></a>
            <a v-if="editButton" @click="editCitation()"><i style="color: #4b636e;" class="pencil icon" size="small"></i></a>
            <a v-if="deleteButton" @click="removeCitation()"><i style="color: #4b636e;" class="trash icon" size="small"></i></a>
          </span>
        </div>
      </div>
    </div>
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
  props: ['cslObject', 'deleteOption', 'copyOption', 'editOption', 'typing', 'bibliographyOption'],
  components: {},
  async created() {
    //@ts-ignore
    if (this.$store.getters.getCitations.filter(citation => citation.id == this.cslData.id)[0] && this.$store.getters.getCitations.filter(citation => citation.id == this.cslData.id)[0].cache) {
      //@ts-ignore
      let cache = this.$store.getters.getCitations.filter(citation => citation.id == this.cslData.id)[0].cache
      //@ts-ignore
      this.$data.cslFormat = cache.format
      //@ts-ignore
      this.$data.cslHTML = cache.html
      console.log('Preview was cached')
    }
    else {
      //@ts-ignore
      const generatedHTML = await generateHTML({style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: generateCSL(this.cslData), lang: (this.$data.styles.filter(style => style.value == this.$store.state.projects[this.$store.state.selectedProject].style)[0].loc ? null: 'en-US'), cslHTML: []})
      if (generatedHTML.error) {
        console.log(generatedHTML.error)
      } 
      else {
        this.$data.cslFormat = generatedHTML.format
        var html = []
        if (generatedHTML.html && generatedHTML.html.length > 0) {
          for (let i=0; i < generatedHTML.html.length; i++) {
            html.push(generatedHTML.html[i].html)
          }
        }
        //@ts-ignore
        this.$data.cslHTML = html
      }
    }
  },
  data () {
    return {
      cslHTML: [],
      cslFormat: null,
      styles: require('./styles.json')
    }
  },
  computed: {
    cslData: {
      get() {
        return this.$props.cslObject
      },
      set(value: any) {
        this.$props.cslObject = value
      }
    },
    deleteButton: {
      get() {
        return this.$props.deleteOption
      }
    },
    clipboardButton: {
      get() {
        return this.$props.copyOption
      }
    },
    editButton: {
      get() {
        return this.$props.editOption
      }
    },
    typingStatus: {
      get() {
        return this.$props.typing
      }
    },
    bibliography: {
      get() {
        return this.$props.bibliographyOption
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
    copyCitation() {
      //@ts-ignore
          var html = '<div class="csl-bib-body" style="'
          //@ts-ignore
          html += ((this.$data.cslFormat) ? ((this.$data.cslFormat.linespacing ? ('line-height: ' + this.$data.cslFormat.linespacing + '; '): '') + (this.$data.cslFormat.hangingindent ? (' text-indent: -' + this.$data.cslFormat.hangingindent + 'em;'): '')): '') + '">'
          //@ts-ignore
          for (let i=0; i < this.$data.cslHTML.length; i++) {
            html += '<div style="clear: left;'
            //@ts-ignore
            html += (this.$data.cslFormat.entryspacing ? ('margin-bottom:' + this.$data.cslFormat.entryspacing + 'em;"'): '"') + '>'
            //@ts-ignore
            html += this.$data.cslHTML[i]
            html += '</div>'
          }
          html += '</div>'
          console.log(html)
      var dt = new clipboard.DT();
      //@ts-ignore
      dt.setData("text/plain", this.$refs.cslBibRef.textContent);
      dt.setData("text/html", html);
      clipboard.write(dt);
    },
    editCitation() {
      //@ts-ignore
      if (this.cslData && this.cslData.id.includes('Website')) {
        //@ts-ignore
        this.$store.dispatch('setEditingProject', this.cslData)
        this.$router.push({path: '/edit/website/'})
      }
      //@ts-ignore
      else if (this.cslData && this.cslData.id.includes('Book')) {
        //@ts-ignore
        this.$store.dispatch('setEditingProject', this.cslData)
        this.$router.push({path: '/edit/book/'})
      }
      //@ts-ignore
      else if (this.cslData && this.cslData.id.includes('Film')) {
        //@ts-ignore
        this.$store.dispatch('setEditingProject', this.cslData)
        this.$router.push({path: '/edit/film/'})
      }
    },
    removeCitation() {
      //@ts-ignore
      this.$store.dispatch('removeCitationById', this.cslData.id)
    }
  },
  watch: {
    async typingStatus() {
      //@ts-ignore
      const generatedHTML = await generateHTML({style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: generateCSL(this.cslData), lang: (this.$data.styles.filter(style => style.value == this.$store.state.projects[this.$store.state.selectedProject].style)[0].loc ? null: 'en-US'), cslHTML: []})
      if (generatedHTML.error) {
        console.log(generatedHTML.error)
      } 
      else {
        this.$data.cslFormat = generatedHTML.format
        var html = []
        if (generatedHTML.html && generatedHTML.html.length > 0) {
          for (let i=0; i < generatedHTML.html.length; i++) {
            html.push(generatedHTML.html[i].html)
          }
        }
        //@ts-ignore
        this.$data.cslHTML = html
      }
    }
  }
})
export default class Preview extends Vue {}
</script>

<style scoped lang="scss">
  #previewStatus {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    color: #8d8d8d;
  }
  #citationOptions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
@media (max-width: 991.97px) {
  #preview {
    background-color: #f5f5f5;
    color: #000;
    padding: 20px;
    border-radius: 5px;
    min-height: 23vh;
    text-align: left;
    font-weight: normal !important;
  }
}
@media (min-width: 991.98px) {
  #preview {
    background-color: #f5f5f5;
    color: #000;
    padding: 20px;
    border-radius: 5px;
    min-height: 16vh;
    text-align: left;
    font-weight: normal !important;
  }
}
</style>
