<template>
  <div class="content" id="about">
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

@Component({
  components: {
  },
})
export default class About extends Vue {}
</script>

<style scoped lang="scss">
  #about {
    text-align: left;
    background-color: #fff;
    min-height: 100vh;
    padding: 20px;
  }
</style>
