<template>
  <div id="home">
    <div v-if="showBanner && serviceMessage.length > 0" class="banner">
      <span v-html="serviceMessage"/>
      <span style="float: right;"><a id="dismissButton" @click="showBanner = !showBanner"><sui-icon name="times"/></a></span>
    </div>
    <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
      <div class="container" style="padding: 3vh;">
        <h1 style="margin-top: 5vh;" >Welcome to CloudCite<sub style="font-size: 0.9rem; font-weight: 800;">alpha</sub></h1>
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
      <Dashboard/>
      <h2>Projects</h2>
        <sui-grid>
          <sui-grid-row :columns="projects.length + 1">
            <sui-grid-column :mobile="16" :tablet="8" :computer="4" stretched v-for="(project, p) in projects" :key="p">
              <div id="projectSegment" class="ui raised segment">
                <h4 style="color: #005eea; font-size: 1.5rem; text-align: center;" v-cloak>
                  {{ project.title }}
                </h4>
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
                <sui-button @click="editProject(project)" style="color: #006DFC;">Edit</sui-button>
              </div>
            </sui-grid-column>
            <sui-grid-column :mobile="16" :tablet="8" :computer="4" stretched>
              <div id="projectSegment" class="ui raised segment" style="text-align: center;">
                <h4 style="color: #005eea; font-size: 1.5rem; text-align: center;" v-cloak>
                  New Project
                </h4>
                <p style="font-size: 1rem; text-align: left;">
                  You can select the citation style on the new project page. Click on the button below to get started.
                </p>
                <sui-button style="color: #006DFC;" @click="createProject()">Create New Project</sui-button>
              </div>
            </sui-grid-column>
          </sui-grid-row>
      </sui-grid>
      <h2>About CloudCite</h2>
      <h3>
        CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago. You can contribute to CloudCite and support the longevity of this project by visiting the <router-link to="/contribute/">contribute page</router-link> and either donating through a supported platform or lending us your coding skills. Disabling ad-block and interacting with ads placed on the contribute page and our blog also helps support this project. We have no ads throughout the bibliography generation process to provide a focused experience.
        Learn more about our commitment to a privacy and a distraction-free bibliography generation environment on our <router-link to="/about/">about us page</router-link>.
      </h3>
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
  import Dashboard from '../components/Dashboard.vue';

  @Component({
    components: {
      SearchStyles,
      Dashboard
    },
    created() {
      fetch('/static/servicemessages.json')
        .then(response => {
          return response.json()
        })
        .then(message => {
          this.$data.serviceMessage = message
        })
        .catch(error => {
          console.log(error)
        })
    },
    data() {
      return {
        showBanner: true,
        serviceMessage: "",
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
        return ("Project-" + this.$store.state.selectedProject) == project.id
      },
      createProject() {
        this.$router.push({name: 'createproject'})
      },
      editProject(project: any) {
        this.$router.push({path: '/projects/edit/' + project.id + '/'})
      },
      selectProject(project: any) {
        this.$store.dispatch('selectProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)))
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

  .banner {
    width: 100%;
    min-height: 5vh;
    background-color: #0036b7;
    color: #fff;
    text-align: center;
    padding-top: 1vh;
    padding-bottom: 2vh;
    font-size: 1rem;
    font-weight: 600;
  }

  #dismissButton {
    color: #658aff;
  }
  #dismissButton:hover {
    color: #fff;
  }

  #formatSelectBox {
    display: inline-flex;
    justify-content: center;
    margin: 20px;
    padding: 0;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 500;
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
