<template>
    <div>
        <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
            <div class="container" style="padding: 7vh;">
                <h1>Create Project</h1>
                <h2 class="subtitle" style="margin-top: 10vh;">
                    You can edit the title and style of your new project here.
                </h2>
            </div>
        </div>
        <div id="createProject">
            <sui-grid :columns="3">
                <sui-grid-row>
                    <sui-grid-column :mobile="2" :tablet="2" :computer="5"/>
                    <sui-grid-column :mobile="12" :tablet="10" :computer="8">
                        <sui-form>
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">Project Title</div>
                                    <input v-model="project.title" placeholder="Project Title"/>
                                </div>
                            </sui-form-field>
                            <sui-form-field style="text-align: left;">
                                <SearchStyles :projectOption="project"/>
                            </sui-form-field>
                            <sui-form-field>
                                <div class="ui labeled input">
                                    <div class="ui label">Locale</div>
                                    <p style="padding: 5px;" v-cloak>{{ project.locale }}</p>
                                </div>
                            </sui-form-field>
                            <sui-button type="button" @click="createProject()">Done Editing</sui-button>
                        </sui-form>
                    </sui-grid-column>
                    <sui-grid-column :mobile="2" :tablet="2" :computer="5"/>
                </sui-grid-row>
            </sui-grid>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchStyles from '../components/SearchStyles.vue';
//@ts-ignore
import debounce from 'lodash/debounce';
//@ts-ignore
import * as _ from 'lodash';

@Component({
  components: {
    SearchStyles
  },
  data() {
    return {
        project: {
            "id": "Project-" + (this.$store.state.projects.length),
            "title": "Project " + (this.$store.state.projects.length + 1),
            "citations": [],
            "style": "modern-language-association",
            "locale": "locales-en-US",
            "cachedBibliography": {outdated: true},
            "message": {
                "type": null,
                "description": null
            },
            "creatingProject": true
        }
    }
  },
  methods: {
      createProject() {
        this.$store.dispatch('createProject', _.pickBy(Object.assign(this.$data.project, {creatingProject: null}), _.identity))
        this.$router.push({path: '/projects/'})
      }
  }
})
export default class CreateProject extends Vue {}
</script>

<style scoped lang="scss">
  #createProject {
    padding: 10px;
    min-height: 100vh;
    text-align: left;
    background-color: #fff;
  }
</style>
