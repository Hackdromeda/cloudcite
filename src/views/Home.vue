<template>
  <div id="home">
    <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
          <div class="container" style="padding: 3vh;">
            <img src="/static/favicons/icon-150x150.png" alt="CloudCite is the best bibliography generator"/>
            <h1>Welcome to CloudCite</h1>
            <p class="subtitle" style="margin-top: 7vh;">
              CloudCite processes citations in the cloud so you never have to create citations manually again.
            </p>
            <div class="container" id="cite">
              <sui-button type="button" id="citeButton" @click="cite('Website')">Website</sui-button>
              <sui-button type="button" id="citeButton">Journal</sui-button>
              <sui-button type="button" id="citeButton" @click="cite('Book')">Book</sui-button>
              <sui-button type="button" id="citeButton" @click="cite('Film')">Film/Movie</sui-button>
              <sui-button type="button" id="citeButton">Digital Image</sui-button>
              <sui-button type="button" id="citeButton">Podcast</sui-button>
              <sui-button type="button" id="citeButton">Music</sui-button>
            </div>
          </div>
      </div>
      <div class="container" id="mainContent">
        
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
    },
    projects: {
      get() {
        return this.$store.getters.getProjects
      }
    }
  },
  methods: {
    cite(option: string) {
      this.$data.selectedFormat = option
      this.$router.push({
        path: ('/cite/' + option.toLowerCase() + '/'),
        //@ts-ignore
      })
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
      background-color: #006DFC;
    }
    #citeButton:hover {
      background-color: #207DF6;
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
      background-color: #006DFC;
    }
    #citeButton:hover {
      background-color: #207DF6;
    }
    #styleDropdown {
      width: 18vh;
    }
  }
</style>
