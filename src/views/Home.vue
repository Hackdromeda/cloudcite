<template>
  <div id="home">
    <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
          <div class="container" style="padding: 3vh;">
            <img src="/static/favicons/icon-150x150.png" width="125" height="125" alt="CloudCite is the best bibliography generator"/>
            <h1>Welcome to CloudCite</h1>
            <p class="subtitle" style="margin-top: 7vh;">
              CloudCite processes citations in the cloud so you never have to create citations manually again.
            </p>
            <div id="cite">
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
      <div id="mainContent">
        <sui-grid :columns="3" stackable textAlign="left">
          <sui-grid-row v-for="(row, r) in projects" :key="r" v-if="(r == 0) || ((r % 3) == 0)">
            <sui-grid-column :width="4" v-for="(project, p) in projects.slice((r * 3), (r * 3 + 3))" :key="p">
              <div id="projectSegment" class="ui raised segment">
                <p style="color: #005eea; font-size: 1.5rem; text-align: center;" v-cloak>
                  {{ project.title }}
                </p>
                <p v-if="project.style && project.style.length <= 27" style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Style</b>: {{ project.style }}
                </p>
                <p v-if="project.style && project.style.length > 27" style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Style</b>: {{ project.style.substring(0, 27) + '...' }}
                </p>
                <p v-if="project.locale && project.locale.length <= 27" style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Locale</b>: {{ project.locale }}
                </p>
                <p v-if="project.locale && project.locale.length > 27" style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Locale</b>: {{ project.locale.substring(0, 27) + '...'}}
                </p>
                <p style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Number of Citations</b>: {{ project.citations.length }}
                </p>
                <sui-button v-if="compareProject(project) == false" style="color: #006DFC;">Select</sui-button>
                <sui-button v-if="compareProject(project) == true" style="color: #006DFC;" disabled>Selected</sui-button>
              </div>
            </sui-grid-column>
            <sui-grid-column v-if="(projects.slice((r * 3), (r * 3 + 3)).length < 3)">
              <div id="projectSegment" class="ui raised segment">
                <p style="color: #005eea; font-size: 1.5rem; text-align: center;">
                  New Project
                </p>
                <p style="font-size: 1rem; text-align: left;">
                  <b>Style</b>: Select Style
                </p>
                <p style="font-size: 1rem; text-align: left;">
                  <b>Locale</b>: Select Locale
                </p>
                <p style="font-size: 1rem; text-align: left;">
                  <b>Number of Citations</b>: 0
                </p>
                <sui-button style="color: #006DFC;">Create Project</sui-button>
              </div>
            </sui-grid-column>
          </sui-grid-row>
          <sui-grid-row v-if="(projects.length % 3 == 0)">
            <sui-grid-column>
              <div id="projectSegment" class="ui raised segment" style="text-align: center; padding: vh;">
                <sui-button style="color: #006DFC;">Create New Project</sui-button>
              </div>
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
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
    },
    compareProject(project: any) {
      return this.$store.getters.getSelectedProject.id === project.id
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
    #projectSegment {
      min-width: 35vh; 
      min-height: 35vh;
    }
  }

  @media (min-width: 991.98px) {
    #mainContent {
      margin: 10vh; 
      margin-bottom: 5vh;
      margin-top: 2vh;
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
    #projectSegment {
      width: 35vh; 
      height: 35vh;
    }
  }
</style>
