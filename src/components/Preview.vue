<template>
  <div id="preview">
    <div class="csl-bib-body" :style="(cslHTML.indexOf('csl-left-margin') == -1 && cslFormat) ? ('line-height: ' + cslFormat.linespacing + ';' + 'margin-left: ' + cslFormat.hangingindent + 'em; text-indent:-' + cslFormat.hangingindent + 'em;'): ''" ref="cslBibRef">
      <div v-for="(cslEntry, i) in cslHTML" :key="i">
        <div :style="'clear: left;' + cslFormat.entryspacing ? ('margin-bottom:' + cslFormat.entryspacing + 'em;'): ''" v-html="cslEntry"/>
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
import generateCSL from '../generateCSL';
//@ts-ignore
import clipboard from "clipboard-polyfill";

@Component({
  props: ['cslObject', 'deleteOption', 'copyOption', 'editOption', 'typing'],
  components: {},
  mounted() {
    this.$data.refreshing = true;
    //@ts-ignore
    if (this.$store.getters.getPreviewsCache && this.$store.getters.getPreviewsCache.filter(previewCache => previewCache.id == this.cslData.id).length > 0 && !this.$store.getters.getPreviewsCache.filter(previewCache => previewCache.id == this.cslData.id)[0].outdated) {
      //@ts-ignore
      this.$data.cslFormat = this.$store.getters.getPreviewsCache.filter(previewCache => previewCache.id == this.cslData.id)[0].format
      //@ts-ignore
      this.$data.cslHTML = this.$store.getters.getPreviewsCache.filter(previewCache => previewCache.id == this.cslData.id)[0].html
      console.log('Preview was cached')
      this.$data.refreshing = false
    }
    else {
    rp({
        uri: 'https://api.cloudcite.net/cite',
        headers: {
          'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
        },
        method: 'POST',
        //@ts-ignore
        body: {style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: generateCSL(this.cslData)},
        json: true
        //@ts-ignore
    })
    //@ts-ignore
    .then(data => {
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
      console.log('CSL HTML: ')
      console.log(cslHTML)
      //@ts-ignore
          var html = '<div class="csl-bib-body" style="'
          //@ts-ignore
          html += ((this.$data.cslHTML.indexOf("csl-left-margin") == -1 && this.$data.cslFormat) ? ('line-height: ' + this.$data.cslFormat.linespacing + '; ' + 'margin-left: ' + this.$data.cslFormat.hangingindent + 'em; text-indent:-' + this.$data.cslFormat.hangingindent + 'em;' + '"'): "") + '>'
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
      console.log(cslHTML)
      //@ts-ignore
      this.$store.dispatch('cachePreview', {id: this.cslData.id, format: this.$data.cslFormat, html: cslHTML, copyPlainText: this.$refs.cslBibRef.textContent, copyRichText: html, outdated: false})
      this.$data.refreshing = false
    })
    //@ts-ignore
    .catch((error) => {
      console.log(error)
      this.$data.refreshing = false
    })
    }
  },
  updated() {
    //@ts-ignore
    if (this.$store.getters.getPreviewsCache.filter(preview => preview.id == this.cslData.id).length > 0) {
      //@ts-ignore
      var preview = this.$store.getters.getPreviewsCache.filter(preview => preview.id == this.cslData.id)[0]
    }
    //@ts-ignore
    this.$store.dispatch('cachePreview', {id: this.cslData.id, format: this.$data.cslFormat, html: preview.html, copyPlainText: this.$refs.cslBibRef.textContent, copyRichText: preview.copyRichText, outdated: false})
  },
  data () {
    return {
      cslHTML: [],
      cslFormat: null,
      refreshing: false
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
          html += ((this.$data.cslHTML.indexOf("csl-left-margin") == -1 && this.$data.cslFormat) ? ('line-height: ' + this.$data.cslFormat.linespacing + '; ' + 'margin-left: ' + this.$data.cslFormat.hangingindent + 'em; text-indent:-' + this.$data.cslFormat.hangingindent + 'em;' + '"'): "") + '>'
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
          var html = '<div class="csl-bib-body" style="'
          //@ts-ignore
          html += ((this.$data.cslHTML.indexOf("csl-left-margin") == -1 && this.$data.cslFormat) ? ('line-height: ' + this.$data.cslFormat.linespacing + '; ' + 'margin-left: ' + this.$data.cslFormat.hangingindent + 'em; text-indent:-' + this.$data.cslFormat.hangingindent + 'em;' + '"'): "") + '>'
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
      //@ts-ignore
      this.$store.dispatch('cachePreview', {id: this.cslData.id, format: this.$data.cslFormat, copyPlainText: this.$refs.cslBibRef.textContent, copyRichText: html, html: this.$data.cslHTML, outdated: true})
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
      //@ts-ignore
      this.$store.dispatch('cachePreview', {id: this.cslData.id, format: this.$data.cslFormat, html: this.$data.cslHTML, outdated: false, delete: true})
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
              body: {style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: generateCSL(this.cslData)},
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
          console.log('CSL HTML: ')
          console.log(cslHTML)
          //@ts-ignore
          var html = '<div class="csl-bib-body" style="'
          //@ts-ignore
          html += ((this.$data.cslHTML.indexOf("csl-left-margin") == -1 && this.$data.cslFormat) ? ('line-height: ' + this.$data.cslFormat.linespacing + '; ' + 'margin-left: ' + this.$data.cslFormat.hangingindent + 'em; text-indent:-' + this.$data.cslFormat.hangingindent + 'em;' + '"'): "") + '>'
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
          //@ts-ignore
          this.$store.dispatch('cachePreview', {id: this.cslData.id, format: this.$data.cslFormat, html: cslHTML, copyPlainText: this.$refs.cslBibRef.textContent, copyRichText: html, outdated: true})
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
