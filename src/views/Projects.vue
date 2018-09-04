<template>
  <div id="projects">
    <div :style="'min-height: 35vh;' + theme.section.backgroundColor + theme.section.textColor">
        <div class="container" style="padding: 7vh;">
            <h1>Projects</h1>
            <h2 class="subtitle" style="margin-top: 10vh;">
                You can manage all of your projects here.
            </h2>
        </div>
    </div>
    <div style="padding: 5vh; display: inline-flex;" v-if="displayComponent()">
        <sui-grid stackable>
          <sui-grid-row :columns="projects.length + 1">
            <sui-grid-column :mobile="16" :tablet="8" :computer="4" stretched v-for="(project, p) in projects" :key="p">
              <div :style="theme.section.backgroundColor + theme.section.textColor" id="projectSegment" class="ui raised segment">
                <h4 :style="'font-size: 1.5rem; text-align: center;' + theme.section.textColor" v-cloak>
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
                <sui-button v-if="compareProject(project) == false" @click="selectProject(project)" :style="theme.button.backgroundColor + theme.button.textColor">Select</sui-button>
                <sui-button v-if="compareProject(project) == true" @click="selectProject(project)" :style="theme.button.backgroundColor + theme.button.textColor" disabled>Selected</sui-button>
                <sui-button @click="editProject(project)" :style="theme.button.backgroundColor + theme.button.textColor">Edit</sui-button>
              </div>
            </sui-grid-column>
            <sui-grid-column :mobile="16" :tablet="8" :computer="4" stretched>
              <div :style="'text-align: center' + theme.section.backgroundColor + theme.primaryColor" id="projectSegment" class="ui raised segment">
                <h4 :style="'font-size: 1.5rem; text-align: center;' + theme.primaryColor" v-cloak>
                  New Project
                </h4>
                <p :style="'font-size: 1rem; text-align: left;' + theme.primaryColor">
                  You can select the citation style on the new project page. Click on the button below to get started.
                </p>
                <sui-button :style="theme.button.backgroundColor + theme.button.textColor" @click="createProject()">Create New Project</sui-button>
              </div>
            </sui-grid-column>
          </sui-grid-row>
      </sui-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchStyles from '../components/SearchStyles.vue';
@Component({
  components: {
    SearchStyles
  },
  computed: {
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
        this.$router.push({path: '/create/project/'})
      },
      editProject(project: any) {
        this.$router.push({path: '/projects/edit/' + project.id + '/'})
      },
      selectProject(project: any) {
        this.$store.dispatch('selectProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)))
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
export default class Projects extends Vue {}
</script>

<style scoped lang="scss">
    h3 {
        font-size: 1.1rem;
        font-weight: 500;
    }
  @media (max-width: 991.97px) {
    #projectSegment {
      padding: 10px;
      margin: 20px;
    }
    @media (min-width: 991.98px) {
        #styleDropdown {
            width: 18vh;
        }
        #projectSegment {
            padding: 10px;
            margin: 20px;
        }
    }
  }

</style>