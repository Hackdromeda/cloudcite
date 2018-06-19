<template>
  <div id="home">
    <div id="hero">
      <img src="static/favicons/android-icon-144x144.png"/>
      <h1 class="title">Welcome to CloudCite</h1>
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
  .title {
    color: #094b66;
  }
  #home {
    text-align: center;
    color: #212121;
  }
  #hero {
    padding-bottom: 20px;
    height: 60%;
    margin-bottom: 10px;
    background-color: #fff;
  }
</style>
