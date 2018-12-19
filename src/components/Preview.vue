<template>
  <div id="preview">
    <div class="csl-bib-body" :style="`${cslHTML.indexOf('csl-left-margin') == -1 && cslFormat ? (`line-height:${cslFormat.linespacing};margin-left:${cslFormat.hangingindent}em;text-indent: -${cslFormat.hangingindent}em;`): ''}word-break: break-all;`" ref="cslBibRef">
      <div v-for="(cslEntry, i) in cslHTML" :key="i">
        <div :style="`clear: left;${cslFormat && cslFormat.entryspacing ? (`margin-bottom:${cslFormat.entryspacing}em;`): ''}`" v-html="cslEntry"/>
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
import { Component, Vue, Prop } from 'vue-property-decorator';
//@ts-ignore
import { generateCSL } from '../functions/generateCSL';
//@ts-ignore
import { generateHTML } from '../functions/generateHTML';
//@ts-ignore
import clipboard from "clipboard-polyfill";
import { styles } from '@/assets/styles';
import { simplifyObject } from '@/functions/simplifyObject';
var cloneDeep = require('lodash.clonedeep');


@Component({
  props: ['cslObject', 'typing'],
  async created() {
    //@ts-ignore
    const generatedHTML = await generateHTML({style: this.$store.getters.getProjectStyle.value, locale: this.$store.getters.getLocale.value, csl: generateCSL(this.cslData), lang: (this.$data.styles.filter(style => style.value == this.$store.getters.getProjectStyle.value)[0].loc ? null: 'en-US'), cslHTML: []})
    if (generatedHTML.error) {
      console.log(generatedHTML.error);
    } 
    else {
      this.$data.cslFormat = generatedHTML.format;
      this.$data.cslHTML = generatedHTML.html.reduce((accumulator: any, currentValue: any) => accumulator.concat([currentValue.html]), []);
    }
  },
  data () {
    return {
      cslHTML: [],
      cslFormat: null,
      styles: styles
    }
  },
  computed: {
    cslData: {
      get() {
        return simplifyObject(cloneDeep(this.$props.cslObject));
      }
    },
    typingStatus: {
      get() {
        return this.$props.typing;
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
      let html: string = `<div class="csl-bib-body" style="${((this.$data.cslFormat) ? ((this.$data.cslFormat.linespacing ? ('line-height: ' + this.$data.cslFormat.linespacing + '; '): '') + (this.$data.cslFormat.hangingindent ? (' text-indent: -' + this.$data.cslFormat.hangingindent + 'em;'): '')): '')}">${this.$data.cslHTML.reduce((accumulator: any, currentValue: any) => `<div style="clear: left;${this.$data.cslFormat.entryspacing ? (`margin-bottom:${this.$data.cslFormat.entryspacing}em;"`): '"'}${currentValue}</div>`, '')}</div>`;
      var dt = new clipboard.DT();
      //@ts-ignore
      dt.setData("text/plain", this.$refs.cslBibRef.textContent);
      dt.setData("text/html", html);
      clipboard.write(dt);
      /*
      let element = document.createElement('textarea');
      element.value = this.$refs.cslBibRef.innerText;
      this._cslBibRef.appendChild(element);
      element.focus({
        preventScroll: true
      });
      element.setSelectionRange(0, element.value.length);
      document.execCommand('copy');
      this._cslBibRef.removeChild(element);
      */
    }
  },
  watch: {
    async typingStatus() {
      //@ts-ignore
      const generatedHTML = await generateHTML({style: this.$store.getters.getProjectStyle.value, locale: this.$store.getters.getLocale.value, csl: generateCSL(this.cslData), lang: (this.$data.styles.filter(style => style.value == this.$store.getters.getProjectStyle.value)[0].loc ? null: 'en-US'), cslHTML: []})
      if (generatedHTML.error) {
        console.log(generatedHTML.error);
      } 
      else {
        this.$data.cslFormat = generatedHTML.format;
        this.$data.cslHTML = generatedHTML.html.reduce((accumulator: any, currentValue: any) => accumulator.concat([currentValue.html]), []);
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
