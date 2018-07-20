<template>
  <div>
    <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
      <div class="container" style="padding: 7vh;">
        <h1>About Us</h1>
        <h2 class="subtitle" style="margin-top: 10vh;">
          CloudCite was developed by the Hackdromeda Team.
        </h2>
      </div>
    </div>
    <div id="about"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class About extends Vue {}
</script>

<style scoped lang="scss">
  #about {
    padding: 10px;
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
  }
</style>
