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
  methods: {

  }
})
export default class ErrorPage extends Vue {}
</script>

<style scoped lang="scss">
</style>