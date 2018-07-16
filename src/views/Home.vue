<template>
  <div id="home">
    <div id="hero">
      <div class="box" id="mainContent">
      <img src="/static/favicons/android-icon-144x144.png" alt="CloudCite is the best bibliography generator"/>
      <h1 class="title is-size-2">Welcome to CloudCite</h1>
      <h2 class="subtitle">CloudCite processes citations in the cloud so you never have to create citations manually again.</h2>
      <h3 class="subtitle is-size-6">CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago. Learn more about our commitment to a privacy and a distraction-free bibliography generation environment on our <a href="/about/">about page</a>.</h3>
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
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import rp from 'request-promise-native';
//@ts-ignore
import debounce from 'lodash/debounce';

@Component({
  components: {},
  data () {
    return {
      formats: [
        "Website",
        "Journal",
        "Book",
        "Film",
        "Digital Image",
        "Podcast",
        "Music"
      ]
    }
  },
  computed: {
    filteredFormats: {
      get() {
        return this.$data.formats.filter((option: any) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.$data.formatTitle.toLowerCase()) >= 0
        })
      }
    }
  },
  methods: {
    cite(option: string) {
      this.$data.selectedFormat = option
      this.$router.push({path: '/edit/format/' + option.toLowerCase() + '/'})
    },
    getAsyncData: debounce(function() {
      //@ts-ignore
        this.styleData = []
        //@ts-ignore
        this.isFetchingStyle = true
        //@ts-ignore
        rp({
            uri: 'https://api.cloudcite.net/style',
            headers: {
                'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
            },
            method: 'POST',
            //@ts-ignore
            body: {
              //@ts-ignore
              "search": this.$data.selectedStyleField
            },
            json: true
            //@ts-ignore
        }).then(data => {
          console.log(data)
                //@ts-ignore
                data.forEach((item) => this.styleData.push(item))
                //@ts-ignore
                this.$data.isFetchingStyle = false
            })
            //@ts-ignore
            .catch((error) => {
                //@ts-ignore
                this.$data.isFetchingStyle = false
                throw error
            })
    }, 500),
    setStyleFromDropdown(option: any) {
      if (option[Object.keys(option)[0]] != "SEARCH") {
        this.$store.dispatch('setStyle', option[Object.keys(option)[0]])
        this.$data.isFetchingStyle = false
      } else {
        this.$data.isSearchingForStyle = true
      }
    },
    selectStyle(styleOption: any) {
      if (styleOption.dependent == 0) {
        this.$data.selectedStyle = styleOption.name
        this.$store.dispatch('setStyle', this.$data.selectedStyle)
        this.$data.selectedStyleField = null
        this.$data.isSearchingForStyle = false
      } else {
        this.$data.selectedStyle = 'dependent/' + styleOption.filename
        this.$store.dispatch('setStyle', this.$data.selectedStyle)
        this.$data.selectedStyleField = null
        this.$data.isSearchingForStyle = false
      }
    }
  }
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">

  #home {
    text-align: center;
    color: #fff;
  }

  #formatSelectBox {
    display: inline-flex;
    justify-content: center;
    margin: 20px;
    padding: 0;
  }

  @media (max-width: 991.97px) {
    #mainContent {
      margin: 5vh; 
      margin-top: 2vh;
    }
    #cite {
      text-align: center;
    }
    #hero {
      padding-bottom: 25px;
      min-height: 130vh;
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
    #styleDropdown {
      width: 25vh;
    }
  }

  @media (min-width: 991.98px) {
    #mainContent {
      margin: 10vh; 
      margin-top: 5vh;
    }
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
    #styleDropdown {
      width: 18vh;
    }
  }
</style>
