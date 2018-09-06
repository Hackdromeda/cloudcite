<template>
  <div id="settings">
  <h1 style="color: #000; margin-top: 20px;">Settings</h1>
  <sui-dropdown style="margin-bottom: 3vh;" v-model="projectSelected" :options="mappedProjects" :placeholder="projects[$store.state.selectedProject].title" search selection direction="downward"/>
  <SearchStyles style="width: 40vh;" :projectOption="projects[$store.state.selectedProject]"/>
  <LocaleChange :projectOption="projects[$store.state.selectedProject]"/>
  <sui-button @click="creatingNewProject = true" type="button" style="background-color: #005eea; color: #fff;">Create Project</sui-button>
  <CreateProject v-if="creatingNewProject"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Bibliography from './Bibliography.vue';
import SearchStyles from './SearchStyles.vue';
import LocaleChange from './LocaleChange.vue';
import CreateProject from './CreateProject.vue';
@Component({
  props: ['creatingProjectOption'],
  components: {
    LocaleChange,
    SearchStyles,
    CreateProject
  },
  data() {
    return {
      creatingNewProject: false,
      //@ts-ignore
      projectSelected: this.selectedProject
    }
  },
  computed: {
    projects: {
      get() {
        return this.$store.getters.getProjects
      }
    },
    mappedProjects: {
      get() {
        let projects = this.$store.getters.getProjects;
        let mappedProjects = []
        for (let i = 0; i < projects.length; i++) {
          mappedProjects.push({key: projects[i].id, text: projects[i].title, value: projects[i].id})
        }
        return mappedProjects;
      }
    },
    selectedProject: {
      get() {
        return this.$store.state.selectedProject
      }
    },
    creatingProject: {
      get() {
        return this.$props.creatingProjectOption
      }
    }
  },
  methods: {
    dismissError() {
      //@ts-ignore
      this.$store.dispatch('setMessage', {description: null, type: null})
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
    selectProject(id: string) {
      this.$data.creatingNewProject = false;
      this.$store.dispatch('selectProject', parseInt(id.substring((id.indexOf('-') + 1), id.length)))
    },
    removeProject(project) {
      if (this.$store.getters.getProjects.length > 1) {
        this.$store.dispatch('removeProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)));
      }
    },
  },
  watch: {
    projectSelected() {
      //@ts-ignore
      this.selectProject(this.$data.projectSelected.id);
    }
  }
})
export default class Settings extends Vue {}
</script>

<style scoped lang="scss">
  #settings {
    color: #000;
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
    background-color: #f5f5f5;
    border-bottom: 3px solid #0036b7;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: #005eea;
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
    background-color: #f5f5f5;
    border-bottom: 3px solid #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: #005eea;
  }
  .tab-active:hover {
    cursor: pointer;
  }
</style>