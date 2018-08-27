<template>
  <div id="dashboard">
    <div class="tabs">
      <div v-for="(project, p) in projects" :key="p" :class="($store.state.selectedProject == p) ? 'tab-active': 'tab'"><span @click="selectProject(project)" v-cloak>{{ project.title }}</span><!--<sui-icon @click="removeProject(project)" id="closeTabButton" name="minus circle"/>--></div>
    </div>
  <sui-grid :columns="3" stackable>
    <sui-grid-row>
      <sui-grid-column :mobile="5" :tablet="2" :computer="4">
        <h2 style="color: #000; margin-top: 20px;">Overview</h2>
        <p style="font-size: 1.3rem;">{{ projects[selectedProject].citations.length }} <span v-if="projects[selectedProject].citations.length == 1">Citation</span><span v-else>Citations</span></p>
        <LocaleChange :projectOption="$store.state.projects[$store.state.selectedProject]"/>
      </sui-grid-column>
      <sui-grid-column :mobile="10" :tablet="14" :computer="8">
        <sui-message v-if="$store.getters.getMessage.type &&  $store.getters.getMessage.type != '' && $store.getters.getMessage.description && $store.getters.getMessage.description != ''" dismissable floating :error="$store.getters.getMessage.type == 'error'" attached="top" @dismiss="dismissError()" :content="$store.getters.getMessage.description"/>
        <Bibliography/>
      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Bibliography from './Bibliography.vue';
//import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import LocaleChange from './LocaleChange.vue';

@Component({
  components: {
    Bibliography,
    LocaleChange
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
    }
  },
  methods: {
    selectProject(project) {
      this.$store.dispatch('selectProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)));
    },
    removeProject(project) {
      this.$store.dispatch('removeProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)));
    },
    dismissError() {
      //@ts-ignore
      this.$store.dispatch('setMessage', {description: null, type: null})
    }
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
    width: 100%;
    overflow-x: auto;
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
    padding-right: 5px;
    border-bottom: 3px solid #e0e0e0;
    margin: 2px;
    background-color: #f5f5f5;
  }
  .tab:hover {
    background-color: #cfd8dc;
    border-bottom: 3px solid #b0bec5;
    cursor: pointer;
    
  }
  .tab-active {
    font-size: 1.1rem;
    padding: 10px;
    padding-right: 5px;
    margin: 2px;
    background-color: #f5f5f5;
    border-bottom: 3px solid #005eea;
  }
  .tab-active:hover {
    cursor: pointer;
  }
</style>