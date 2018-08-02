<template>
  <div id="preview">
    <div class="csl-bib-body" :style="cslHTML.indexOf('csl-left-margin') == -1 ? ('line-height: ' + cslFormat.linespacing + ';' + 'margin-left: ' + cslFormat.hangingindent + 'em; text-indent:-' + cslFormat.hangingindent + 'em;'): ''" ref="cslBibRef">
      <div v-for="(cslEntry, i) in cslHTML" :key="i">
        <div :style="'clear: left; margin-bottom:' + cslFormat.entryspacing + 'em;'" v-html="cslEntry"/>
        <div id="previewStatus" v-if="refreshing">
          Refreshing
        </div>
        <div id="previewStatus" v-if="typingStatus">
          Editing Citation
        </div>
        <div id="citationOptions" v-if="!refreshing">
          <span>
            <a v-if="clipboardButton" @click="copyCitation()"><i style="color: #4b636e;" class="clipboard icon" size="small"></i></a>
            <!--<a v-if="editButton" @click="editCitation()"><i style="color: #4b636e;" class="pencil icon" size="small"></i></a>-->
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
@Component({
  props: ['cslObject', 'deleteOption', 'copyOption', 'editOption', 'typing'],
  components: {},
  mounted() {
    this.$data.refreshing = true;
    rp({
        uri: 'https://api.cloudcite.net/cite',
        headers: {
          'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
        },
        method: 'POST',
        //@ts-ignore
        body: {style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: this.cslData},
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
      this.$data.refreshing = false
    })
    //@ts-ignore
    .catch((error) => {
      console.log(error)
      this.$data.refreshing = false
    })
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
    copyCitation() {
      //@ts-ignore
      this.$copyText(this.$refs.cslBibRef.textContent)
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
      this.$store.dispatch('setEditingProject', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].csl[Object.keys(this.cslData)[0]], {citationFormat: true})),
      //@ts-ignore
      this.$router.push({path: '/edit/' + this.cslData[Object.keys(this.cslData)[0]].type + '/'})
    },
    removeCitation() {
      //@ts-ignore
      this.$store.dispatch('removeCitationById', Object.keys(this.cslData)[0])
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
              body: {style: this.$store.state.projects[this.$store.state.selectedProject].style, locale: this.$store.state.projects[this.$store.state.selectedProject].locale, csl: this.cslData},
              json: true
              //@ts-ignore
        }).then(data => {
          console.log(data)
          this.$data.cslHTML = data[1]
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
