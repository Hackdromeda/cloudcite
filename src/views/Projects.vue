<template>
  <div id="projects">
    <div v-if="!editingProject" style="min-height: 35vh; background-color: #005eea; color: #fff;">
        <div class="container" style="padding: 7vh;">
            <h1>Projects</h1>
            <h2 class="subtitle" style="margin-top: 10vh;">
                You can manage all of your projects here.
            </h2>
        </div>
    </div>
    <div style="display: inline-flex; margin-top: 3vh;" v-if="displayComponent()">
        <sui-grid stackable v-if="!editingProject && !creatingProject">
          <sui-grid-row :columns="projects.length + 1">
            <sui-grid-column :mobile="16" :tablet="8" :computer="5" v-for="(project, p) in projects" :key="p">
              <div id="projectSegment" class="ui raised segment">
                <h4 style="color: #005eea; font-size: 1.5rem; text-align: center;" v-cloak>
                  {{ project.title.substring(0, project.title.length > 27 ? 27: project.title.length) }}
                </h4>
                <p v-if="project.style" style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Style</b>: {{ project.style.text.substring(0, project.style.text.length > 27 ? 27: project.style.text.length) }}
                </p>
                <p v-if="getLocale" style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Locale</b>: {{ getLocale.text.substring(0, getLocale.text.length > 27 ? 27: getLocale.text.length) }}
                </p>
                <p style="font-size: 1rem; text-align: left;" v-cloak>
                  <b>Number of Citations</b>: {{ project.citations.length }}
                </p>
                <div style="display: inline-flex;">
                <sui-button @click="selectProject(project.id)" style="color: #006DFC;" :disabled="selectedProject.id == project.id">{{selectedProject.id == project.id ? 'Selected': 'Select'}}</sui-button>
                <sui-button @click="editProject(project.id)" style="color: #006DFC;">Edit</sui-button>
                <sui-button @click="removeProject(project.id)" style="color: #c62828;" :disabled="(projects.length == 1) || (selectedProject.id == project.id)">Delete</sui-button>
                </div>
              </div>
            </sui-grid-column>
            <sui-grid-column :mobile="16" :tablet="8" :computer="5">
              <div id="projectSegment" class="ui raised segment" style="text-align: center;">
                <p style="font-size: 1rem; text-align: left;">
                  You can select the citation style on the new project page. Click on the button below to get started.
                </p>
                <sui-button style="color: #006DFC;" @click="createProject()">Create New Project</sui-button>
              </div>
            </sui-grid-column>
          </sui-grid-row>
      </sui-grid>
    </div>
    <div v-if="editingProject">
      <h1 style="color: #000;"  v-cloak>Editing {{ editingProject.title }}</h1>
      <sui-form id="editForm">
        <sui-form-field>
          <div class="ui labeled input">
              <div class="ui label">Project Title</div>
              <input placeholder="First Name" v-model="editingProject.title" type="text">
          </div>
        </sui-form-field>
        <sui-form-field>
          <div class="ui labeled input">
            <div class="ui label">Style</div> 
            <input :placeholder="editingProject.style.text" type="text">
          </div>
        </sui-form-field>
        <sui-form-field>
          <div class="ui labeled input">
            <sui-button type="button" @click="resetCitations(editingProject.id)" style="background-color: #b71c1c; color: #fff;">Reset Citations</sui-button>
          </div>
        </sui-form-field>
        <sui-form-field>
          <div class="ui labeled input">
            <sui-button type="button" @click="resetProject(editingProject.id)" style="background-color: #b71c1c; color: #fff;">Reset Project</sui-button>
          </div>
        </sui-form-field>
        <div is="sui-button-group">
            <sui-button type="button" @click="cancel()">Cancel</sui-button>
            <sui-button-or />
            <sui-button type="button" style="background-color: #005eea; color: #fff;" @click="saveEditingProject()" positive>Save</sui-button>
        </div>
      </sui-form>
    </div>
    <div v-if="creatingProject">
      <h1 style="color: #000;"  v-cloak>Creating {{ creatingProject.title }}</h1>
      <sui-form id="editForm">
        <sui-form-field>
          <div class="ui labeled input">
              <div class="ui label">Project Title</div>
              <input placeholder="First Name" v-model="creatingProject.title" type="text">
          </div>
        </sui-form-field>
        <sui-form-field>
          <div class="ui labeled input">
            <div class="ui label">Style</div>
          </div>
        </sui-form-field>
        <div is="sui-button-group">
          <sui-button type="button" @click="cancel()">Cancel</sui-button>
          <sui-button-or />
          <sui-button type="button" style="background-color: #005eea; color: #fff;" @click="saveNewProject()" positive>Save</sui-button>
        </div>
      </sui-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchStyles from '../components/SearchStyles.vue';
var cloneDeep = require('lodash.clonedeep');

@Component({
  components: {
    SearchStyles
  },
  data () {
    return {
      editingProject: null,
      creatingProject: null
    }
  },
  computed: {
    projects: {
        get() {
          return this.$store.getters.getProjects;
        }
    },
    selectedProject: {
      get() {
        return this.$store.getters.getSelectedProject;
      }
    },
    getLocale: {
      get() {
        return this.$store.getters.getLocale;
      }
    },
    getFavoriteStyles: {
      get() {
        return this.$store.getters.getFavoriteStyles;
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
      createProject() {
        this.$data.creatingProject = {
          "id": "id",
          "title": "New Project",
          "citations": [],
          //@ts-ignore
          "style": this.getFavoriteStyles[0]
        };
      },
      editProject(id: string) {
        //this.$router.push({path: '/projects/edit/' + project.id + '/'})
        this.$data.editingProject = cloneDeep(this.$store.getters.getProjectById(id));
      },
      selectProject(id: string) {
        this.$store.dispatch('selectProject', id);
      },
      removeProject(id: string) {
        this.$store.dispatch('removeProject', id);
      },
      resetProject(id: string) {
        this.$store.dispatch('resetProject', id).then(() => {
          this.$data.editingProject = null;
          this.$router.push({path: '/projects'});
        });
      },
      resetCitations(id: string) {
          this.$store.dispatch('resetCitations', id).then(() => {
          this.$data.editingProject = null;
          this.$router.push({path: '/projects'});
        });
      },
      cancel() {
        this.$data.editingProject = null;
        this.$data.creatingProject = null;
        this.$router.push({path: '/projects'});
      },
      saveEditingProject() {
        this.$router.push({path: '/'});
        this.$store.dispatch('addProject', this.$data.editingProject);
      },
      saveNewProject() {
        this.$router.push({path: '/'});
        this.$store.dispatch('addProject', this.$data.creatingProject);
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
    #editForm {
        margin-top: 5vh;
        margin-bottom: 5vh;
        margin-left: 2vh;
        margin-right: 2vh;
        text-align: left;
        font-size: 16px;
    }
  }
  @media (min-width: 991.98px) {
    #styleDropdown {
      width: 18vh;
    }
    #projectSegment {
      height: 30vh;
    }
    #editForm {
        margin-top: 5vh;
        margin-bottom: 5vh;
        margin-left: 45vh;
        margin-right: 45vh;
        text-align: left;
        font-size: 16px;
    }
  }

</style>