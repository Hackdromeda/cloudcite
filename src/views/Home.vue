<template>
  <div id="home">
    <div id="hero">
      <img src="static/error/favicons/mstile-150x150.png"/>
      <h1 id="welcomeText" class="title is-size-2">Welcome to CloudCite</h1>
      <Cite/>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p class="footer-text"><strong>CloudCite</strong> by the Hackdromeda team. The source code is licensed
            <a href="https://github.com/avimshah/cloudcite/blob/master/LICENSE">GNU AGPL v3.0</a>. <img width="150" height="50" src="static/a0-badge-light.png"/>
        </p>
      </div>
    </footer>
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
