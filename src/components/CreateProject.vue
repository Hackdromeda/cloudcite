<template>
    <div id="createProject">
        <sui-grid :columns="3">
            <sui-grid-row>
                <sui-grid-column :mobile="2" :tablet="2" :computer="5"/>
                <sui-grid-column :mobile="12" :tablet="10" :computer="8">
                    <sui-form>
                        <sui-form-field>
                            <input id="titleInput" placeholder="Enter Project Title" v-model="project.title" maxlength="20" ref="projectTitle"/>
                        </sui-form-field>
                        <sui-form-field>
                            <SearchStyles :projectOption="project"/>
                        </sui-form-field>
                        <sui-button type="button" style="background-color: #005eea; color: #fff;" @click="createProject()">Save</sui-button>
                    </sui-form>
                </sui-grid-column>
                <sui-grid-column :mobile="2" :tablet="2" :computer="5"/>
            </sui-grid-row>
        </sui-grid>
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
            "style": {
                "key":"modern-language-association",
                "text":"Modern Language Association 8th edition (MLA)",
                "value":"modern-language-association"
            },
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
    text-align: center;
    justify-content: center;
    background-color: #fff;
}
#titleInput {
    text-align: center;
    display: inline-flex;
    color: #005eea;
    min-height: 60px;
    font-size: 2rem;
    font-weight: 550;
    border-color: transparent;
    margin-bottom: 3vh;
}
#titleInput:focus {
    outline: none;
}
</style>
