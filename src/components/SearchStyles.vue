<template>
  <div>
    <sui-form>
      <sui-form-field>
        <sui-dropdown fluid :options="favoriteStyles" :placeholder="getProjectStyle" search selection v-model="selectedStyle" direction="downward"/>
      </sui-form-field>
      <sui-form-field>
        <sui-button type="button" basic primary size="mini">More Styles Available</sui-button>
      </sui-form-field>
    </sui-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: ['projectOption'],
  components: {},
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
        return this.$data.styles.filter(style => style.key == this.$store.state.projects[this.$store.state.selectedProject].style)[0].text
      }
    },
    favoriteStyles: {
      get() {
        return this.$store.getters.getFavoriteStyles
      }
    }
  },
  watch: {
    //@ts-ignore
    selectedStyle() {
      //@ts-ignore
      this.$store.dispatch('setProjectStyle', {id: this.project.id, style: this.$data.selectedStyle})
      this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: true}))
    }
  }
})
export default class SearchStyles extends Vue {}
</script>

<style scoped lang="scss">
</style>
