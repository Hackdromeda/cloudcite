<template>
  <div>
    <multiselect v-model="selectedStyle" :placeholder="getProjectStyle" :options="stylesData" :searchable="true" :loading="loading" :internal-search="false" :clear-on-select="true" :close-on-select="true" :options-limit="30" :limit="30" :max-height="100" :show-no-results="false" :hide-selected="true" @search-change="searchStyles" label="text" track-by="text"></multiselect>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

@Component({
  props: ['projectOption'],
  components: {
    Multiselect
  },
  data() {
    return {
      //styles.json file is based on styles from https://citationstyles.org/
      //@ts-ignore
      styles: require('./styles.json'),
      selectedStyle: null,
      stylesData: [],
      loading: false
    }
  },
  methods: {
    selectStyle(option: string) {
      console.log(option)
    },
    searchStyles(query) {
      this.$data.loading = true
      this.$data.stylesData = []
      //@ts-ignore
      this.$data.stylesData = this.$data.styles.filter(style => style.text.toLowerCase().includes(query.toLowerCase()) || style.key.toLowerCase().includes(query.toLowerCase()))
      this.$data.loading = false
    },
    clearStylesData () {
      this.$data.stylesData = []
    }
  },
  computed: {
    project: {
      get() {
        return this.$props.projectOption
      },
      set(value: any) {
      }
    },
    getProjectStyle: {
      get() {
        //@ts-ignore
        return this.$data.styles.filter(style => style.key === this.project.style)[0].text
      }
    }
  },
  watch: {
    //@ts-ignore
    selectedStyle() {
      this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: true}))
      //@ts-ignore
      if (!this.project.creatingProject) {
        //@ts-ignore
        this.$store.dispatch('setProjectStyle', {id: this.project.id, style: this.$data.selectedStyle.key})
      } else {
        //@ts-ignore
        this.project.style = this.$data.selectedStyle.key
      }
    }
  }
})
export default class SearchStyles extends Vue {}
</script>

<style scoped lang="scss">
</style>
