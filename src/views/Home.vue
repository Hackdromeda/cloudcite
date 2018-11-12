<template>
  <div id="home">
    <div>
      <div style="display: flex; justify-content: center; align-items: center; padding: 5vh; background-color: #2962ff; color: #eceff1;">
        <div>
          <h1>Welcome to CloudCite</h1>
          <p style="margin-top: 5vh;">
            CloudCite processes citations in the cloud so you never have to create citations manually again.
          </p>
          <div id="cite">
            <mdc-button id="citeButton" @click="cite('Website')">Website</mdc-button>
            <mdc-button id="citeButton" @click="cite('Book')">Book</mdc-button>
            <mdc-button id="citeButton" @click="cite('Film')">Film/Movie</mdc-button>
          </div>
        </div>
      </div>
      <div style="margin-top: 10vh; padding-bottom: 10vh;">
        <Bibliography/>
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
  import SearchStyles from '../components/SearchStyles.vue';
  import Bibliography from '../components/Bibliography.vue';

  @Component({
    components: {
      Bibliography
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
    color: #000;
  }
  #citeButton {
    background-color: #eceff1;
    margin-left: 1vh;
    margin-right: 1vh;
  }

  @media (max-width: 991.97px) {
    #cite {
      text-align: center;
    }
  }

  @media (min-width: 991.98px) {
    #cite {
      text-align: center;
    }
  }
  </style>
