<template>
  <div id="preview" :class="hangingIndent ? 'hangingIndent': ''">
    <div class="csl-bib-body" ref="cslBibRef">
      <div v-for="(cslEntry, i) in cslHTML" :key="i">
        <div v-html="cslEntry"/>
        <div id="previewStatus" v-if="refreshing">
          Refreshing
        </div>
        <div id="previewStatus" v-if="typingStatus">
          Editing Citation
        </div>
        <div id="citationOptions" v-if="!refreshing">
          <span v-if="deleteButton">
            <a @click="removeCitation"><i style="color: #4b636e;" class="trash icon" size="small"></i></a>
          </span>
          <span v-if="clipboardButton">
            <a @click="copyCitation"><i style="color: #4b636e;" class="clipboard icon" size="small"></i></a>
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
  props: ['cslObject', 'deleteOption', 'copyOption', 'typing'],
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
        body: {style: this.$store.getters.getStyle, locale: this.$store.getters.getLocale, csl: this.cslData},
        json: true
        //@ts-ignore
    })
    //@ts-ignore
    .then(data => {
      console.log(data)
      this.$data.cslHTML = data[1]
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
      hangingIndent: false,
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
              body: {style: this.$store.getters.getStyle, locale: this.$store.getters.getLocale, csl: this.cslData},
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
  .hangingIndent {
    padding-left: 10vh;
    text-indent: -5vh;
  }
@media (max-width: 991.97px) {
  #preview {
    background-color: #f5f5f5;
    color: #000;
    padding: 20px;
    border-radius: 5px;
    min-height: 23vh;
    text-align: left;
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
  }
}
</style>
