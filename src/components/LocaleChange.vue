<template>
  <div id="localeChange">
    <sui-dropdown button class="icon" floating icon="world" labeled :options="languages" search :text="languages.filter(language => language.value == project.locale)[0].text" v-model="selectedLocale"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore

@Component({
  props: ['projectOption'],
  components: {},
  data() {
    return {
      //locales.json file is based on locales from https://citationstyles.org/
      //@ts-ignore
      languages: require('./locales.json'),
      selectedLocale: null,
      languageForced: false
    }
  },
  computed: {
    project: {
      get() {
        return this.$props.projectOption
      },
      set() {

      }
    }
  },
  watch: {
    //@ts-ignore
    selectedLocale() {
      this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: true}))
      //@ts-ignore
      this.project.locale = this.$data.selectedLocale
    }
  }
})
export default class LocaleChange extends Vue {}
</script>

<style scoped lang="scss">
  #localeChange {
    padding: 1vh;
  }
</style>
