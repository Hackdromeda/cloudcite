<template>
  <div id="localeChange">
    <mdc-select :style="'min-width:' + (locale.text.length + 5) + 'vh;'" v-model="selectedLocale" :label="locale.text">
      <option v-for="(language, i) in languages" :key="i" :value="language.value" v-cloak> {{ language.text }}</option>
    </mdc-select>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore

@Component({
  components: {},
  data() {
    return {
      styles: require('./styles.json'),
      //locales.json file is based on locales from https://citationstyles.org/
      //@ts-ignore
      languages: require('./locales.json'),
      //@ts-ignore
      selectedLocale: this.locale
    }
  },
  computed: {
    locale: {
      get() {
        return this.$store.getters.getLocale;
      }
    }
  },
  watch: {
    //@ts-ignore
    selectedLocale() {
      //@ts-ignore
      this.$store.dispatch('setLocale', this.$data.languages.filter(locale => locale.value == this.$data.selectedLocale)[0]);
      this.$store.dispatch('cacheBibliography', Object.assign(this.$store.state.projects[this.$store.state.selectedProject].cachedBibliography, {outdated: true}));
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
