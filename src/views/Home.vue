<template>
  <div id="home">
    <div id="hero">
      <img src="static/error/favicons/mstile-150x150.png"/>
      <h1 id="welcomeText" class="title is-size-2">Welcome to CloudCite</h1>
      <Cite/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cite from '@/components/Cite.vue';

@Component({
  components: {
    Cite
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
  #home {
    text-align: center;
    color: #212121;
  }
  #hero {
    padding-bottom: 25px;
    height: 60%;
  }
  #welcomeText {
    color: #fff;
  }
</style>
