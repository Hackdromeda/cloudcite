<template>
  <div id="localeChange">
    <sui-dropdown button class="icon" floating icon="world" labeled :options="languages" search v-model="selectedLocale"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { styles } from '@/assets/styles';
import { locales } from '@/assets/locales';

@Component({
  props: ['projectOption'],
  components: {},
  data() {
    return {
      styles: styles,
      //locales.json file is based on locales from https://citationstyles.org/
      languages: locales,
      selectedLocale: this.$store.state.locale
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
