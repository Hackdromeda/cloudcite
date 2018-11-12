<template>
  <div id="projects">
    <div style="min-height: 35vh;">
        <div style="padding: 7vh; background-color: #2962ff; color: #eceff1;">
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
              <div id="projectSegment" class="ui raised segment">
                <h4 style="color: #005eea; font-size: 1.5rem; text-align: center;" v-cloak>
                  {{ project.title }}
                </h4>
                <p v-if="project.style && project.style.value" style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Style</b>: <SearchStyles :projectOption="project"/>
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