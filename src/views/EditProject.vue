<template>
    <div>
        <div style="min-height: 20vh; background-color: #005eea; color: #fff; margin-bottom: 5vh;">
            <div class="container" style="padding: 7vh;">
                <h1 v-cloak>Editing {{ project.title }}</h1>
            </div>
        </div>
        <div id="editProject">
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
                            <sui-button type="button" @click="editProject()">Done Editing</sui-button>
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
        //@ts-ignore
        project: this.$store.getters.getProjects.filter(project => project.id == this.$route.params.id)[0],
        //@ts-ignore
        projectTitle: this.$store.getters.getProjects.filter(project => project.id == this.$route.params.id)[0] ? this.$store.getters.getProjects.filter(project => project.id == this.$route.params.id)[0].title: ""
    }
  },
  methods: {
      editProject() {
        if (this.$data.project && this.$data.project.title && this.$data.project.title.length > 0) {
            this.$store.dispatch('editProject', this.$data.project)
            this.$store.dispatch('updateCache', true)
        } 
        else if (this.$data.project && this.$data.project.title) {
            this.$store.dispatch('editProject', Object.assign(this.$data.project, {title: this.$data.projectTitle}))
            this.$store.dispatch('updateCache', true)
        }
        this.$router.push({path: '/projects/'})
      }
  }
})
export default class EditProject extends Vue {}
</script>

<style scoped lang="scss">
  #editProject {
    padding: 10px;
    min-height: 100vh;
    text-align: left;
    background-color: #fff;
  }
</style>
