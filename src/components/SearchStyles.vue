<template>
  <div>
    <multiselect v-model="selectedStyle" :placeholder="project.style" open-direction="bottom" :options="stylesData" :searchable="true" :loading="loading" :internal-search="false" :clear-on-select="true" :close-on-select="true" :options-limit="30" :limit="30" :max-height="100" :show-no-results="false" :hide-selected="true" @search-change="searchStyles">
    </multiselect>
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
      for (var i=0; i < this.$data.styles.length; i++) {
        if (this.$data.styles[i].text.substring(0, query.length).toLowerCase().includes(query.toLowerCase()) || this.$data.styles[i].value.substring(0, query.length).toLowerCase().includes(query.toLowerCase())) {
          this.$data.stylesData.push(this.$data.styles[i].value)
        }
      }
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
      }
    }
  },
  watch: {
    //@ts-ignore
    selectedStyle() {
      //@ts-ignore
      this.$store.dispatch('setProjectStyle', {id: this.project.id, style: this.$data.selectedStyle})
    }
  }
})
export default class SearchStyles extends Vue {}
</script>

<style scoped lang="scss">
</style>
