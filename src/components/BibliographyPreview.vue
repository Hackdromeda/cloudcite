<template>
  <div id="bibliographyPreview">
    <div class="csl-bib-body" :style="(cslHTML.indexOf('csl-left-margin') == -1 && cslFormat) ? ('line-height: ' + cslFormat.linespacing + ';' + 'margin-left: ' + cslFormat.hangingindent + 'em; text-indent: -' + cslFormat.hangingindent + 'em;'): ''">
      <div v-for="(cslEntry, i) in cslHTML" :key="i" style="margin-bottom: 5vh;">
        <div v-if="$store.getters.getCitations.filter(citation => citation.id == cslEntry.id).length > 0">
          <div :id="cslEntry.id" :style="'clear: left;' + cslFormat && cslFormat.entryspacing ? ('margin-bottom:' + cslFormat.entryspacing + 'em;'): ''" v-html="cslEntry.html"/>
            <div id="citationOptions" v-if="!refreshing">
              <span>
                <a @click="copyCitation(cslEntry.id)"><i style="color: #4b636e;" class="clipboard icon" size="small"></i></a>
                <a @click="editCitation(cslEntry.id)"><i style="color: #4b636e;" class="pencil icon" size="small"></i></a>
                <a @click="removeCitation(cslEntry.id)"><i style="color: #4b636e;" class="trash icon" size="small"></i></a>
              </span>
            </div>
        </div>
        <div v-if="$store.getters.getCitations.length > 1 && i < $store.getters.getCitations.length - 1 && cslHTML[i + 1]">
          <sui-divider />
        </div>
      </div>
      <div id="bibliographyPreviewStatus" v-if="refreshing">
        Refreshing
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
  components: {},
  mounted() {
    //@ts-ignore
    if (this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography && this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.outdated) {
      this.$data.cslHTML = this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.html
      this.$data.cslFormat = this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography.format
      this.$data.refreshing = false
    }
    else {
      this.$data.refreshing = true;
      //@ts-ignore
      var cslData = {}
      for (let i=0; i < this.$store.getters.getCitations.length; i++) {
        //@ts-ignore
        cslData[this.$store.getters.getCitations[i].id] = generateCSL(this.$store.getters.getCitations[i])[this.$store.getters.getCitations[i].id]
      }
      rp({
          uri: 'https://api.cloudcite.net/cite',
          headers: {
            'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
          },
          method: 'POST',
          //@ts-ignore
          body: {style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: cslData},
          json: true
          //@ts-ignore
      })
      //@ts-ignore
      .then(data => {
        this.$data.cslFormat = data[0]
        for (let i=0; i < data[1].length; i++) {
          var cslHTML = data[1][i]
          var cslIndentIndex = (data[1] && data[1][i]) ? data[1][i].indexOf('class="csl-indent"'): -1
          var cslHTMLStart = ""
          var cslHTMLEnd = ""
          if (cslIndentIndex != -1) {
            cslHTMLStart = cslHTML.substring(0, cslIndentIndex - 1)
            cslHTMLEnd = cslHTML.substring(cslIndentIndex, cslHTML.length)
            cslHTML = cslHTMLStart + ' style="margin: .5em 0 0 2em; padding: 0 0 .2em .5em; border-left: 5px solid #ccc;" ' + cslHTMLEnd
          }
          var cslRightInlineIndex = (data[1] && data[1][i]) ? data[1].indexOf('class="csl-right-inline"'): -1
          if (cslRightInlineIndex != -1) {
            cslHTMLStart = cslHTML.substring(0, cslRightInlineIndex - 1)
            cslHTMLEnd = cslHTML.substring(cslRightInlineIndex, cslHTML.length)
            cslHTML = cslHTMLStart + ' style="' + 'margin: 0 .4em 0 ' + (this.$data.cslFormat.secondFieldAlign ? this.$data.cslFormat.maxOffset + this.$data.cslFormat.rightPadding : '0') + 'em;" ' + cslHTMLEnd
          }
          var cslLeftMarginIndex = (data[1] && data[1][i]) ? data[1].indexOf('class="csl-left-margin"'): -1
          if (cslLeftMarginIndex != -1) {
            cslHTMLStart = cslHTML.substring(0, cslLeftMarginIndex - 1)
            cslHTMLEnd = cslHTML.substring(cslLeftMarginIndex, cslHTML.length)
            cslHTML = cslHTMLStart + ' style="' + 'float: left; padding-right: ' + this.$data.cslFormat.rightpadding + 'em;' + (this.$data.cslFormat.secondFieldAlign ? 'text-align: right; width: ' + this.$data.cslFormat.maxoffset + 'em;': '') + '" ' + cslHTMLEnd
          }
          this.$data.cslHTML.push({id: this.$data.cslFormat.entry_ids[i][0], html: cslHTML})

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
            this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: false, html: this.$data.cslHTML, format: this.$data.cslFormat, richText: html}))
          }
        }
        this.$data.refreshing = false
      })
      //@ts-ignore
      .catch((error) => {
        console.log(error)
        //@ts-ignore
        this.$data.refreshing = false
      })
    }
  },
  data () {
    return {
      cslHTML: [],
      cslFormat: null,
      refreshing: false
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
  }
})
export default class bibliographyPreview extends Vue {}
</script>

<style scoped lang="scss">
  #bibliographyPreviewStatus {
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
  #bibliographyPreview {
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
  #bibliographyPreview {
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
