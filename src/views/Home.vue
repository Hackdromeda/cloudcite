<template>
  <div id="home">
    <div id="hero">
      <img src="static/error/favicons/mstile-150x150.png"/>
      <h1 id="welcomeText" class="title is-size-2">Welcome to CloudCite</h1>
      <div class="container" id="cite">
        <div id="citeButtonsRow">
          <a class="button is-rounded" id="citeButton" @click="cite('Website')">Website</a>
          <a class="button is-rounded" id="citeButton">Journal</a>
          <a class="button is-rounded" id="citeButton" @click="cite('Book')">Book</a>
          <a class="button is-rounded" id="citeButton" @click="cite('Film')">Film/Movie</a>
          <a class="button is-rounded" id="citeButton">Digital Image</a>
          <a class="button is-rounded" id="citeButton">Podcast</a>
          <a class="button is-rounded" id="citeButton">Music</a>
        </div>
        <div class="box" id="formatSelectBox">
            <b-autocomplete v-model="formatTitle" size="is-large" ref="autocomplete" :data="filteredFormats" placeholder="I would like to cite..." @select="option => cite(option)" v-cloak>
                <template slot="empty">No results for {{formatTitle}}</template>
            </b-autocomplete>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Home extends Vue {
  formats: string[] = [
    "Website",
    "Journal",
    "Book",
    "Film",
    "Digital Image",
    "Podcast",
    "Music"
  ]
  formatTitle: string = ''
  selectedFormat: string = ''

  get filteredFormats() {
    return this.formats.filter((option) => {
      return option
        .toString()
        .toLowerCase()
        .indexOf(this.formatTitle.toLowerCase()) >= 0
    })
  }

  cite(option: string) {
    this.selectedFormat = option
    this.$router.push({name: 'edit' + option.toLowerCase()})
  }
}
</script>

<style scoped lang="scss">
  #home {
    text-align: center;
    color: #fff;
  }
  #welcomeText {
    color: #fff;
  }
  #websiteSection {
    background-color: #fff;
    height: 100vh;
    padding: 5%;
  }

  #formatSelectBox {
    display: inline-flex;
    justify-content: center;
    margin: 20px;
    padding: 0;
  }

  @media (max-width: 991.97px) {
  #cite {
    text-align: center;
  }
   #hero {
    padding-bottom: 25px;
    height: 130vh;
  }
  #citeButtonsRow {
    justify-content: left;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  #citeButton {
    margin: 3px;
    padding: 10px;
    color: #fff;
    font-weight: 500;
    border-color: #006DFC;
    background-color: #006DFC;
  }
  #citeButton:hover {
    opacity: 0.9;
  }
  #websiteInput {
    width: 70%;
  }
}
@media (min-width: 991.98px) {
  #cite {
    text-align: center;
  }
   #hero {
    padding-bottom: 25px;
    height: 100vh;
  }
  #citeButtonsRow {
    justify-content: center;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  #citeButton {
    margin: 10px;
    padding: 10px;
    color: #fff;
    font-weight: 500;
    border-color: #006DFC;
    background-color: #006DFC;
  }
  #citeButton:hover {
    opacity: 0.9;
  }
  #websiteInput {
    width: 50%;
  }
}
</style>
