<template>
  <div id="settings">
  <h1 style="color: #000; margin-top: 20px;">Settings</h1>
  <mdc-select :style="'min-width:' + (projects[selectedProject].title.length + 5) + 'vh;'" v-model="projectSelected" :label="projects[selectedProject].title">
    <option v-for="(project, i) in projects" :key="i" :value="getProjectNumberFromId(project.id)" v-cloak> {{ project.title }}</option>
  </mdc-select>
  <SearchStyles style="width: 40vh;" :projectOption="projects[$store.state.selectedProject]"/>
  <LocaleChange/>
  <mdc-button @click="creatingNewProject = true" raised>Create Project</mdc-button>
  <CreateProject v-if="creatingNewProject"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import debounce from 'lodash/debounce';
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
      projectSelected: this.$store.state.selectedProject
    }
  },
  computed: {
    projects: {
      get() {
        return this.$store.getters.getProjects
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
    getProjectNumberFromId(id: string) {
      return parseInt(id.substring((id.indexOf('-') + 1)));
    }
  },
  watch: {
    typing: debounce(function () {
      //@ts-ignore
      if (this.$store.getters.getProjects[this.$store.state.selectedProject].title == "" || !this.$store.getters.getProjects[this.$store.state.selectedProject].title) {
        //@ts-ignore
        this.$store.getters.getProjects[this.$store.state.selectedProject].title = "Untitled Project"
      }
      //@ts-ignore
        this.$store.dispatch('saveState')
        //@ts-ignore
        this.$data.typing = false
    }, 3000),
    projectSelected() {
      //@ts-ignore
      this.selectProject(this.$data.projectSelected);
    }
  }
})
export default class Settings extends Vue {}
</script>

<style scoped lang="scss">
  #settings {
    color: #000;
  }
</style>