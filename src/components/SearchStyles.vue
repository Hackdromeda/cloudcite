<template>
  <div>
    <sui-modal v-model="showMoreStyles">
      <sui-modal-header style="text-align: center; font-size: 1.8rem; font-weight: 400;">Add Favorite Styles</sui-modal-header>
      <sui-modal-content style="min-height: 80vh;" scrolling>
        <sui-modal-description>
          <sui-form>
            <sui-form-field>
              <input style="text-align: center; font-size: 1.8rem;" @input="typing = true" placeholder="Search for Styles" v-model="searchInput" type="text"/>
            </sui-form-field>
        </sui-form>
        <div>
          <div v-for="(style, i) in stylesData" :key="i" style="text-align: left; margin-top: 5vh;">
            <span style="font-size: 1.8rem; font-weight: 400; margin-top: 5vh;" v-cloak>{{ style.text.substring(0, 55)}}{{(style.text.length > 55) ? '...': ''}}</span>
            <span style="text-align: right; float: right;">
            <sui-button @click="addFavoriteStyle(style)" v-if="favoriteStyles.filter(favorite => favorite.value == style.value).length == 0" type="button" basic primary>Add Favorite</sui-button>
            <sui-button @click="removeFavoriteStyle(style)" v-else type="button" basic negative>Remove Favorite</sui-button>
            </span>
            <sui-divider/>
          </div>
        </div>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button type="button" primary @click="showMoreStyles = false">
          Finished Adding Styles
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <mdc-select :style="'min-width:' + (getProjectStyle.text.length * 2) + 'vh;'" v-model="selectedStyle" :label="getProjectStyle.text">
      <option v-for="(style, i) in favoriteStyles" :key="i" :value="style.value" v-cloak> {{ style.text }}</option>
    </mdc-select>
    <sui-form>
      <sui-form-field>
        <sui-button style="background-color: #005eea; color: #fff;" @click="showMoreStyles = true" type="button" size="mini">More Styles Available</sui-button>
      </sui-form-field>
    </sui-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import debounce from 'lodash/debounce';

@Component({
  props: ['projectOption'],
  components: {},
  data() {
    return {
      //styles.json file is based on styles from https://citationstyles.org/
      //@ts-ignore
      styles: require('./styles.json'),
      locales: require('./locales.json'),
      selectedStyle: null,
      searchInput: null,
      stylesData: [],
      showMoreStyles: false,
      typing: false
    }
  },
  methods: {
    searchStyles(query) {
      this.$data.loading = true
      this.$data.stylesData = []
      //@ts-ignore
      this.$data.stylesData = this.$data.styles.filter(style => style.text.toLowerCase().includes(query.toLowerCase()) || style.key.toLowerCase().includes(query.toLowerCase()))
      this.$data.loading = false
    },
    clearStylesData () {
      this.$data.stylesData = []
    },
    addFavoriteStyle(style) {
      this.$store.dispatch('addFavoriteStyle', style)
    },
    removeFavoriteStyle(style) {
      this.$store.dispatch('removeFavoriteStyle', style)
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
        return this.project.style
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
      this.$store.dispatch('setProjectStyle', {id: this.project.id, style: this.$data.styles.filter(style => style.value == this.$data.selectedStyle)[0]})
      //@ts-ignore
      if (this.$data.styles.filter(style => style.value == this.$data.selectedStyle).length > 0 && this.$data.styles.filter(style => style.value == this.$data.selectedStyle)[0].loc && this.$data.styles.filter(style => style.value == this.$data.selectedStyle)[0].loc.length > 0 && this.$data.styles.filter(style => style.value == this.$data.selectedStyle)[0].loc.filter(locale => locale == this.locale.value).length == 0) {
        //@ts-ignore
        this.$store.dispatch('setLocale', {id: this.project.id, locale: this.$data.styles.filter(style => style.value == this.$data.selectedStyle)[0].loc[0]})
      }
      this.$store.dispatch('cacheBibliography', {outdated: true})
    },
    typing: debounce(function () {
      //@ts-ignore
      this.$data.stylesData = this.$data.styles.filter(style => style.text.toLowerCase().includes(this.$data.searchInput.toLowerCase()) || style.value.toLowerCase().includes(this.$data.searchInput.toLowerCase())).slice(0, 50)
      //@ts-ignore
      this.$data.typing = false
    }, 500)
  }
})
export default class SearchStyles extends Vue {}
</script>

<style scoped lang="scss">
</style>
