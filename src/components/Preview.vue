<template>
  <div class="content" id="preview">
    <div class="csl-bib-body">
      <div v-for="(cslEntry, i) in cslHTML" :key="i">
        <div v-html="cslEntry"/>
      </div>
      <div id="refreshInformation" v-if="refreshing">
        Refreshing
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as store from '../store';
//@ts-ignore
import rp from 'request-promise-native';
import { setInterval } from 'timers';
@Component({
  props: ['cslObject'],
  components: {},
  mounted() {
    setInterval(() => {
      this.$data.refreshing = true;
       rp({
            uri: 'https://api.cloudcite.net/cite',
            headers: {
                'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
            },
            method: 'POST',
            //@ts-ignore
            body: {style: store.default.getters.getStyle, locale: store.default.getters.getLocale, csl: this.cslData},
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
    }, 10000);
  },
  data () {
    return {
      cslHTML: [],
      refreshing: false
    }
  },
  computed: {
    cslData: {
      get() {
        return this.$props.cslObject
      }
    }
  }
})
export default class Preview extends Vue {}
</script>

<style scoped lang="scss">
  #refreshInformation {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    color: #8d8d8d;
  }
@media (max-width: 991.97px) {
  #preview {
    background-color: #f5f5f5;
    color: #000;
    padding: 20px;
    border-radius: 5px;
    min-height: 23vh;
  }
}
@media (min-width: 991.98px) {
  #preview {
    background-color: #f5f5f5;
    color: #000;
    padding: 20px;
    border-radius: 5px;
    min-height: 16vh;
  }
}
</style>
