<template>
  <div>
    <section class="hero is-primary" style="min-height: 35vh;">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-size-2">About Us</h1>
            <h2 class="subtitle" style="margin-top: 10vh;">
              CloudCite was developed by the Hackdromeda Team.
            </h2>
          </div>
        </div>
      </section>
      <div class="content" id="about"></div>
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
