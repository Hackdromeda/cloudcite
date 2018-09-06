<template>
  <div id="dashboard">
  <sui-grid v-if="!creatingProject" :columns="3" stackable>
    <sui-grid-row>
      <sui-grid-column :mobile="5" :tablet="2" :computer="4">
        <h2 style="color: #000; margin-top: 20px;">Overview</h2>
        <p style="font-size: 1.3rem;">{{ projects[selectedProject].citations.length }} <span v-if="projects[selectedProject].citations.length == 1">Citation</span><span v-else>Citations</span></p>
        <LocaleChange :projectOption="$store.state.projects[$store.state.selectedProject]"/>
      </sui-grid-column>
      <sui-grid-column :mobile="10" :tablet="14" :computer="8">
        <sui-message v-if="$store.getters.getMessage.type &&  $store.getters.getMessage.type != '' && $store.getters.getMessage.description && $store.getters.getMessage.description != ''" dismissable floating :error="$store.getters.getMessage.type == 'error'" attached="top" @dismiss="dismissError()" :content="$store.getters.getMessage.description"/>
        <div class="tabs">
          <div v-for="(project, p) in $store.state.projects" :key="p" @click="selectProject(project)" :class="($store.state.selectedProject == p && !creatingProject) ? 'tab-active': 'tab'"><span v-cloak>{{ project.title }}</span></div>
          <div :class="creatingProject ? 'tab-active': 'tab'" @click="creatingProject = true">
            <span>New Project </span><sui-icon name="plus circle"/>
          </div>
        </div>
        <sui-button :disabled="projects.length <= 1" @click="removeProject(projects[selectedProject])" style="margin-top: 5vh;" type="button" negative content="Delete Project"/>
      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>
  <CreateProject v-if="creatingProject"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Bibliography from './Bibliography.vue';
//import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import LocaleChange from './LocaleChange.vue';
import CreateProject from './CreateProject.vue';
@Component({
  props: ['creatingProjectOption'],
  components: {
    LocaleChange,
    CreateProject
  },
  data() {
    return {
      creatingProject: false
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
    selectProject(project: any) {
      this.$data.creatingProject = false;
      this.$store.dispatch('selectProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)))
    },
    removeProject(project) {
      if (this.$store.getters.getProjects.length > 1) {
        this.$store.dispatch('removeProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)));
      }
    },
  }
})
export default class Dashboard extends Vue {}
</script>

<style scoped lang="scss">
  #dashboard {
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