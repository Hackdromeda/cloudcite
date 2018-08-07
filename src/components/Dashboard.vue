<template>
  <div id="dashboard">
    <Bibliography/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Bibliography from './Bibliography.vue';

@Component({
  components: {
    Bibliography
  },
  data() {
    return {

    }
  },
  computed: {
    projects: {
      get() {
        return this.$store.getters.getProjects
      }
    }
  },
  methods: {
    isActive(project): boolean {
      return this.$store.state.projects[this.$store.state.selectedProject].id == project.id
    },
    select(project) {
      this.$store.dispatch('selectProject', parseInt(project.id.substring((project.id.indexOf('-') + 1), project.id.length)))
    }
  }
})
export default class ErrorPage extends Vue {}
</script>

<style scoped lang="scss">
</style>