<template>
  <div id="home">
    <img src="static/error/favicons/mstile-150x150.png"/>
    <h1 class="title">Welcome to CloudCite</h1>
    <Cite/>
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
    color: #fff;
  }
  .title {
    color: #fff;
  }
</style>
