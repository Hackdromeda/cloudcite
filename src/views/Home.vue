<template>
  <div id="home">
    <section class="hero is-primary" style="min-height: 35vh;">
        <div class="hero-body">
          <div class="container">
            <img src="/static/favicons/icon-150x150.png" alt="CloudCite is the best bibliography generator"/>
            <h1 class="title is-size-2">Welcome to CloudCite</h1>
            <h2 class="subtitle" style="margin-top: 10vh;">
              CloudCite processes citations in the cloud so you never have to create citations manually again.
            </h2>
          </div>
        </div>
      </section>
      <div class="container" id="mainContent">
        <h1 class="is-size-3" style="font-weight: 500;">Citation Options</h1>
        <div class="container" id="cite">
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
    color: #000;
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
      margin-bottom: 2vh;
      color: #000;
    }
    #cite {
      text-align: center;
    }
    #hero {
      padding-bottom: 25px;
      min-height: 130vh;
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
      background-color: #207DF6;
      border-color: #207DF6;
    }
  }

  @media (min-width: 991.98px) {
    #mainContent {
      margin: 10vh; 
      margin-bottom: 5vh;
      margin-top: 5vh;
      color: #000;
    }
    #cite {
      text-align: center;
    }
    #hero {
      padding-bottom: 25px;
      height: 100vh;
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
      background-color: #207DF6;
      border-color: #207DF6;
    }
    #styleDropdown {
      width: 18vh;
    }
  }
</style>
