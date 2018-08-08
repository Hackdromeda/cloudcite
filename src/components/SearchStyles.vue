<template>
  <div>
    <sui-modal v-model="showMoreStyles">
      <sui-modal-header style="text-align: center;">Add Favorite Styles</sui-modal-header>
      <sui-modal-content style="min-height: 80vh;" scrolling>
        <sui-modal-description>
          <sui-form>
            <sui-form-field>
              <input style="text-align: center; font-size: 1.8rem;" @input="typing = true" placeholder="Search for Styles" v-model="searchInput" type="text"/>
            </sui-form-field>
        </sui-form>
        <div>
          <div v-for="(style, i) in stylesData" :key="i" style="font-size: 1.8rem; text-align: left; margin-top: 5vh;">
            {{ style.text }} <sui-button @click="addFavoriteStyle(style)" v-if="favoriteStyles.filter(favorite => favorite.value == style.value).length == 0" type="button" circular icon="plus"/><sui-button @click="removeFavoriteStyle(style)" v-else type="button" circular icon="minus"/>
            <sui-divider/>
          </div>
        </div>
        </sui-modal-description>
      </sui-modal-content>
    </sui-modal>
    <sui-form>
      <sui-form-field>
        <sui-dropdown fluid :options="favoriteStyles" :placeholder="getProjectStyle" search selection v-model="selectedStyle" direction="downward"/>
      </sui-form-field>
      <sui-form-field>
        <sui-button @click="showMoreStyles = true" type="button" basic primary size="mini">More Styles Available</sui-button>
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
      selectedStyle: null,
      searchInput: null,
      stylesData: [],
      showMoreStyles: false,
      typing: false
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
    },
    typing: debounce(function () {
      //@ts-ignore
      this.$data.stylesData = this.$data.styles.filter(style => style.text.toLowerCase().includes(this.$data.searchInput.toLowerCase()) || style.value.toLowerCase().includes(this.$data.searchInput.toLowerCase()))
      //@ts-ignore
      this.$data.typing = false
    }, 500)
  }
})
export default class SearchStyles extends Vue {}
</script>

<style scoped lang="scss">
</style>
