<template>
    <sui-dropdown
      button
      class="icon"
      floating
      icon="world"
      labeled
      :options="languages"
      search
      text="Select Language"
      v-model="current"
    />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore

@Component({
  props: ['projectOption'],
  components: {
    Multiselect
  },
  data() {
    return {
      //locales.json file is based on locales from https://citationstyles.org/
      //@ts-ignore
      languages: require('./locales.json'),
      selectedLanguage: null,
      languageForced: false,
      loading: false
    }
  },
  methods: {
    selectStyle(option: string) {
      console.log(option)
    },
    searchStyles(query) {
      this.$data.loading = true
      this.$data.languagesData = []
      //@ts-ignore
      this.$data.languagesData = this.$data.languages.filter(language => language.text.toLowerCase().includes(query.toLowerCase()) || language.key.toLowerCase().includes(query.toLowerCase()) || language.value.includes(query.toLowerCase()))
      this.$data.loading = false
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
    getProjectLanguage: {
      get() {
        //@ts-ignore
        return this.$data.languages.filter(language => language.key === this.project.language)[0].text
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
        this.$store.dispatch('setProjectLanguage', {id: this.project.id, style: this.$data.selectedLanguage.key})
      } else {
        //@ts-ignore
        this.project.style = this.$data.selectedLanguage.key
      }
    }
  }
})
export default class SearchStyles extends Vue {}
</script>

<style scoped lang="scss">
</style>
