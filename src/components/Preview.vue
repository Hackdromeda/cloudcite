<template>
  <div id="preview">
    <div class="csl-bib-body" :style="(cslHTML.indexOf('csl-left-margin') == -1 && cslFormat) ? ('line-height: ' + cslFormat.linespacing + ';' + 'margin-left: ' + cslFormat.hangingindent + 'em; text-indent: -' + cslFormat.hangingindent + 'em;'): ''" ref="cslBibRef">
      <div v-for="(cslEntry, i) in cslHTML" :key="i">
        <div :style="'clear: left;' + cslFormat && cslFormat.entryspacing ? ('margin-bottom:' + cslFormat.entryspacing + 'em;'): ''" v-html="cslEntry"/>
        <div id="previewStatus" v-if="refreshing">
          Refreshing
        </div>
        <div id="previewStatus" v-if="typingStatus">
          Editing Citation
        </div>
        <div id="citationOptions" v-if="!refreshing">
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
import generateHTML from '../functions/generatePreviewHTML';
//@ts-ignore
import clipboard from "clipboard-polyfill";
//@ts-ignore
import _ from 'lodash';

@Component({
  props: ['cslObject', 'deleteOption', 'copyOption', 'editOption', 'typing', 'bibliographyOption'],
  components: {},
  async mounted() {
    this.$data.refreshing = true;
    //@ts-ignore
    if (true == false) {
      
      this.$data.refreshing = false
    }
    else {
      //@ts-ignore
      const generatedHTML = await generateHTML({style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: generateCSL(this.cslData), lang: (this.$data.styles.filter(style => style.value == this.$store.state.projects[this.$store.state.selectedProject].style)[0].loc ? null: 'en-US')})
      if (generatedHTML.error) {
        console.log(generatedHTML.error)
      } 
      else {
        this.$data.cslFormat = generatedHTML.format
        this.$data.cslHTML = generatedHTML.html
      }
      this.$data.refreshing = false
    }
  },
  data () {
    return {
      cslHTML: [],
      cslFormat: null,
      refreshing: false,
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
          html += ((this.$data.cslFormat) ? ((this.$data.cslFormat.linespacing ? ('line-height: ' + this.$data.cslFormat.linespacing + '; '): '') + (this.$data.cslFormat.hangingindent ? ('margin-left: ' + this.$data.cslFormat.hangingindent + 'em;'): '') + (this.$data.cslFormat.hangingindent ? (' text-indent: -' + this.$data.cslFormat.hangingindent + 'em;'): '')): '') + '">'
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
      /*
      this.$toast.open({
          duration: 3000,
          message: `Copied to Clipboard`,
          position: 'is-bottom-right',
          type: 'is-success'
      })
      */
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
    typingStatus() {
      //@ts-ignore
      if (this.typingStatus == false) {
        this.$data.refreshing = true;
        rp({
              uri: 'https://api.cloudcite.net/cite',
              headers: {
                  'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
              },
              method: 'POST',
              //@ts-ignore
              body: _.pickBy({style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: generateCSL(this.cslData), lang: (this.$data.styles.filter(style => style.value == this.$store.state.projects[this.$store.state.selectedProject].style)[0].loc ? null: 'en-US')}),
              json: true
              //@ts-ignore
        }).then(data => {
          console.log(data)
          this.$data.cslFormat = data[0]
          var cslHTML = data[1]
          var cslIndentIndex = data[1].indexOf('class="csl-indent"')
          var cslHTMLStart = ""
          var cslHTMLEnd = ""
          if (cslIndentIndex != -1) {
            cslHTMLStart = cslHTML.substring(0, cslIndentIndex - 1)
            cslHTMLEnd = cslHTML.substring(cslIndentIndex, cslHTML.length)
            cslHTML = cslHTMLStart + ' style="margin: .5em 0 0 2em; padding: 0 0 .2em .5em; border-left: 5px solid #ccc;" ' + cslHTMLEnd
          }
          var cslRightInlineIndex = data[1].indexOf('class="csl-right-inline"')
          if (cslRightInlineIndex != -1) {
            cslHTMLStart = cslHTML.substring(0, cslRightInlineIndex - 1)
            cslHTMLEnd = cslHTML.substring(cslRightInlineIndex, cslHTML.length)
            cslHTML = cslHTMLStart + ' style="' + 'margin: 0 .4em 0 ' + (this.$data.cslFormat.secondFieldAlign ? this.$data.cslFormat.maxOffset + this.$data.cslFormat.rightPadding : '0') + 'em;" ' + cslHTMLEnd
          }
          var cslLeftMarginIndex = data[1].indexOf('class="csl-left-margin"')
          if (cslLeftMarginIndex != -1) {
            cslHTMLStart = cslHTML.substring(0, cslLeftMarginIndex - 1)
            cslHTMLEnd = cslHTML.substring(cslLeftMarginIndex, cslHTML.length)
            cslHTML = cslHTMLStart + ' style="' + 'float: left; padding-right: ' + this.$data.cslFormat.rightpadding + 'em;' + (this.$data.cslFormat.secondFieldAlign ? 'text-align: right; width: ' + this.$data.cslFormat.maxoffset + 'em;': '') + '" ' + cslHTMLEnd
          }
          this.$data.cslHTML = cslHTML
          this.$data.refreshing = false
        })
        //@ts-ignore
        .catch((error) => {
          console.log(error)
          this.$data.refreshing = false
        })
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
