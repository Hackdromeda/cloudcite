<template>
  <div id="home">
    <div style="min-height: 92vh;">
      <div v-if="showBanner && serviceMessage.length > 0" class="banner">
        <span v-html="serviceMessage"/>
        <span style="float: right;"><a id="dismissButton" @click="showBanner = !showBanner"><sui-icon name="times"/></a></span>
      </div>
      <div style="color: #fff; display: flex; justify-content: center; align-items: center; margin-top: 15vh;">
        <div>
          <h1>Welcome to CloudCite</h1>
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
      <div style="background-color: #005eea; margin-top: 10vh; padding-bottom: 10vh;">
        <Bibliography/>
      </div>
    </div>
    <div id="mainContent" style="text-align: left;">
      <Dashboard v-if="displayComponent()" :creatingProjectOption="creatingProject"/>
      <h2 style="margin-top: 20vh; margin-left: 1vh; margin-right: 1vh;">About CloudCite</h2>
      <h3 style="margin-left: 1vh; margin-right: 1vh;">CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago, Turabian, Harvard, IEEE, and Vancouver. You can contribute to CloudCite and support the longevity of this project by visiting the <router-link to="/contribute/">contribute page</router-link> and either donating through a supported platform or lending us your coding skills. Disabling ad-block and interacting with ads placed on the contribute page and our blog also helps support this project. We have no ads throughout the bibliography generation process to provide a focused experience. Learn more about our commitment to a privacy on our <router-link to="/privacy/">privacy page</router-link> and about our the distraction-free bibliography generation environment we wanted to exist in the universe on our <router-link to="/about/">about us page</router-link>.</h3>
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
  import Bibliography from '../components/Bibliography.vue';
  import Dashboard from '../components/Dashboard.vue';

  @Component({
    components: {
      SearchStyles,
      Bibliography,
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
        ],
        creatingProject: false
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
        this.$data.creatingProject = false;
        this.$store.dispatch('selectProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)))
      },
      removeProject(project) {
        if (this.$store.getters.getProjects.length > 1) {
          this.$store.dispatch('removeProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)));
        }
      },
      displayComponent() {
        //@ts-ignore
        if(window.navigator.userAgent.includes('Headless')) {
          return false;
        }
        else{
          return true;
        }
      }
    }
  })
  export default class Home extends Vue {}
</script>

<style scoped lang="scss">

  #home {
    text-align: center;
    background-color: #005eea;
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

  h1 {
    font-size: 3rem;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 500;
  }

  @media (max-width: 991.97px) {
    #mainContent {
      margin-top: 2vh;
      margin-bottom: 2vh;
      background-color: #fff;
      padding-left: 5vh;
      padding-right: 5vh;
      color: #000;
    }
    #cite {
      text-align: center;
    }
    #citeButton {
      margin: 3px;
      padding: 10px;
      color: #fff;
      font-weight: 550;
      background-color: #006dfc;
      border-radius: 5px;
    }
    #citeButton:hover {
      background-color: #207df6;
    }
    #projectSegment {
      padding: 10px;
      margin-bottom: 20px;
    }
  }

  @media (min-width: 991.98px) {
    #mainContent {
      margin-bottom: 5vh;
      margin-top: 2vh;
      background-color: #fff;
      padding-left: 5vh;
      padding-right: 5vh;
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
      font-weight: 550;
      background-color: #006dfc;
      border-radius: 5px;
    }
    #citeButton:hover {
      background-color: #207df6;
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
