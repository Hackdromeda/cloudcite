<template>
  <div id="preview">
    <div class="csl-bib-body" :style="(cslHTML.indexOf('csl-left-margin') == -1 && cslFormat) ? ('line-height: ' + cslFormat.linespacing + ';' + 'margin-left: ' + cslFormat.hangingindent + 'em; text-indent: -' + cslFormat.hangingindent + 'em;'): '' + 'word-break: break-all;'" ref="cslBibRef">
      <div v-for="(cslEntry, i) in cslHTML" :key="i">
        <div :style="'clear: left;' + cslFormat && cslFormat.entryspacing ? ('margin-bottom:' + cslFormat.entryspacing + 'em;'): ''" v-html="cslEntry"/>
        <div id="previewStatus" v-if="typingStatus">
          Editing Citation
        </div>
        <div id="citationOptions">
          <span>
            <a @click="copyCitation()"><i style="color: #4b636e;" class="clipboard icon" size="small"></i></a>
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
//@ts-ignore
import generateCSL from '../functions/generateCSL';
//@ts-ignore
import generateHTML from '../functions/generateHTML';
//@ts-ignore
import clipboard from "clipboard-polyfill";
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep';

@Component({
  props: ['cslObject','typing'],
  components: {},
  async created() {
      //@ts-ignore
      const generatedHTML = await generateHTML({style: this.$store.state.projects[this.$store.state.selectedProject].style.value, locale: this.locale.value, csl: await generateCSL(this.cslData), lang: (this.$data.styles.filter(style => style.value == this.$store.state.projects[this.$store.state.selectedProject].style.value)[0].loc ? null: 'en-US'), cslHTML: []})
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
        return cloneDeep(this.$props.cslObject)
      }
    },
    typingStatus: {
      get() {
        return this.$props.typing
      }
    },
    locale: {
      get() {
        return this.$store.getters.getLocale;
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
    }
  },
  watch: {
    async typingStatus() {
      //@ts-ignore
      const generatedHTML = await generateHTML({style: this.$store.state.projects[this.$store.state.selectedProject].style.value, locale: this.locale.value, csl: await generateCSL(this.cslData), lang: (this.$data.styles.filter(style => style.value == this.$store.state.projects[this.$store.state.selectedProject].style.value)[0].loc ? null: 'en-US'), cslHTML: []})
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
    background-color: #fff;
    color: #000;
    border: 1px solid #e0e0e0;
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
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 5px;
    min-height: 16vh;
    text-align: left;
    font-weight: normal !important;
  }
}
</style>
