<template>
  <div id="home" :style="theme.backgroundColor + theme.textColor">
    <div v-if="showBanner && serviceMessage.length > 0" class="banner" :style="theme.banner.backgroundColor + theme.banner.textColor">
      <span :style="theme.banner.textColor" v-html="serviceMessage"/>
      <span style="float: right;"><a :style="theme.banner.textColor" @click="showBanner = !showBanner"><sui-icon name="times"/></a></span>
    </div>
    <div :style="theme.section.backgroundColor + theme.section.textColor + 'min-height: 35vh;'">
      <div class="container" style="padding: 3vh;">
        <h1 style="margin-top: 5vh;" >Welcome to CloudCite<sub style="font-size: 0.9rem; font-weight: 800;">alpha</sub></h1>
        <p class="subtitle" style="margin-top: 5vh;">
          CloudCite processes citations in the cloud so you never have to create citations manually again.
        </p>
        <div id="cite">
          <sui-button :style="theme.button.backgroundColor + theme.button.textColor" type="button" id="citeButton" @click="cite('Website')">Website</sui-button>
          <sui-button :style="theme.button.backgroundColor + theme.button.textColor" type="button" id="citeButton" @click="cite('Book')">Book</sui-button>
          <sui-button :style="theme.button.backgroundColor + theme.button.textColor" type="button" id="citeButton" @click="cite('Film')">Film/Movie</sui-button>
        </div>
      </div>
      <div class="tabs">
        <div v-for="(project, p) in $store.state.projects" :key="p" @click="selectProject(project)" :style="($store.state.selectedProject == p && !creatingProject) ? theme['tab-active'].backgroundColor + theme['tab-active'].textColor + theme['tab-active'].borderBottom: theme['tab-inactive'].backgroundColor + theme['tab-inactive'].textColor + theme['tab-inactive'].borderBottom" :class="($store.state.selectedProject == p && !creatingProject) ? 'tab-active': 'tab'"><span v-cloak>{{ project.title }}</span></div>
        <div :style="($store.state.selectedProject == p && !creatingProject) ? theme['tab-active'].backgroundColor + theme['tab-active'].textColor + theme['tab-active'].borderBottom: theme['tab-inactive'].backgroundColor + theme['tab-inactive'].textColor + theme['tab-inactive'].borderBottom"  :class="creatingProject ? 'tab-active': 'tab'" @click="creatingProject = true">
          <span>New Project </span><sui-icon name="plus circle"/>
        </div>
      </div>
    </div>
    <div id="mainContent" :style="theme.backgroundColor + theme.textColor + 'text-align: left;'">
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
      },
      theme: {
        get() {
          return this.$store.getters.getTheme
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
  }

  .banner {
    width: 100%;
    min-height: 5vh;
    text-align: center;
    padding-top: 1vh;
    padding-bottom: 2vh;
    font-size: 1rem;
    font-weight: 600;
  }

 .tabs {
    display: inline-flex;
    overflow-x: auto;
    white-space: nowrap; 
    width: 100%;
  }
  #closeTabButton {
    color: #90a4ae;
    padding-left: 10px;
    padding-right: 12px;
  }
  #closeTabButton:hover {
    color: red;
    cursor: pointer;
  }
  .tab {
    font-size: 1.1rem;
    padding: 10px;
    margin-left: 1vh;
    margin-right: 1vh;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .tab:hover {
    background-color: #cfd8dc;
    border-bottom: 3px solid #b0bec5;
    cursor: pointer;
    
  }
  .tab-active {
    font-size: 1.1rem;
    padding: 10px;
    margin-left: 1vh;
    margin-right: 1vh;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .tab-active:hover {
    cursor: pointer;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 500;
  }

  @media (max-width: 991.97px) {
    #mainContent {
      margin-top: 2vh;
      margin-bottom: 2vh;
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
      font-weight: 500;
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
