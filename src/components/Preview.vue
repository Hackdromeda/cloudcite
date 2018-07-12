<template>
  <div class="content" id="preview">
    <div class="csl-bib-body">
      <div v-for="(cslEntry, i) in cslHTML" :key="i">
        <div v-html="cslEntry"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import rp from 'request-promise-native';

@Component({
  props: ['cslObject'],
  components: {},
  mounted() {
    setTimeout(() => {
       rp({
            uri: 'https://api.cloudcite.net/cite',
            headers: {
                'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
            },
            method: 'POST',
            //@ts-ignore
            body: this.cslData,
            json: true
            //@ts-ignore
        }).then(data => {
            console.log(data)
            this.$data.cslHTML = data[1]
        })
        //@ts-ignore
        .catch((error) => {
          console.log(error)
        })
    }, 5000);
  },
  data () {
    return {
      cslHTML: []
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
  #preview {
    background-color: rgba(255, 255, 255, 0.932);
    padding: 20px;
  }
  #csl-bib-body {
    padding-left: 22px;
    text-indent: -22px;
  }
</style>
