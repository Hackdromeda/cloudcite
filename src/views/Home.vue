<template>
  <div id="home">
    <div style="min-height: 40vh; background-color: #005eea; color: #fff;">
      <div class="container" style="padding: 3vh;">
        <h1 style="margin-top: 5vh;" >Welcome to CloudCite</h1>
        <p class="subtitle" style="margin-top: 5vh;">
          CloudCite processes citations in the cloud so you never have to create citations manually again.
        </p>
        <div id="cite">
          <sui-button type="button" id="citeButton" @click="cite('Website')">Website</sui-button>
          <sui-button type="button" id="citeButton" @click="cite('Book')">Book</sui-button>
          <sui-button type="button" id="citeButton" @click="cite('Film')">Film/Movie</sui-button>
        </div>
      </div>
    </div>
    <div id="mainContent" style="text-align: left;">
      <h1 style="color: #000;">Projects</h1>
        <sui-grid>
          <sui-grid-row :columns="projects.length + 1">
            <sui-grid-column :mobile="16" :tablet="16" :computer="4" stretched v-for="(project, p) in projects" :key="p">
              <div id="projectSegment" class="ui raised segment">
                <p style="color: #005eea; font-size: 1.5rem; text-align: center;" v-cloak>
                  {{ project.title }}
                </p>
                <p v-if="project.style" style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Style</b>: <SearchStyles :projectOption="project"/>
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
                <sui-button v-if="compareProject(project) == false" @click="selectProject(project)" style="color: #006DFC;">Select</sui-button>
                <sui-button v-if="compareProject(project) == true" @click="selectProject(project)" style="color: #006DFC;" disabled>Selected</sui-button>
              </div>
            </sui-grid-column>
            <sui-grid-column :mobile="16" :tablet="16" :computer="4" stretched>
              <div id="projectSegment" class="ui raised segment" style="text-align: center;">
                <p style="color: #005eea; font-size: 1.5rem; text-align: center;" v-cloak>
                  New Project
                </p>
                <p style="font-size: 1rem; text-align: left;">
                  You can select the citation style on the new project page. Click on the button below to get started.
                </p>
                <sui-button style="color: #006DFC;" @click="createProject()">Create New Project</sui-button>
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
  import SearchStyles from '../components/SearchStyles.vue';

  @Component({
    components: {
      SearchStyles
    },
    data() {
      return {
        formats: [
          "Website",
          "Journal",
          "Book",
          "Film",
          "Digital Image",
          "Podcast",
          "Music"
        ],
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
          return this.$store.state.projects
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
      compareProject(project: any) {
        return ("Project/" + this.$store.state.selectedProject) === project.id
      },
      createProject() {
        this.$router.push({name: 'createproject'})
      },
      selectProject(project: any) {
        this.$store.dispatch('selectProject', parseInt(project.id.substring((project.id.indexOf('/') + 1), project.id.length)))
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
      padding: 10px;
      margin-bottom: 20px;
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
      padding: 10px;
      margin-bottom: 20px;
    }
  }
  </style>
