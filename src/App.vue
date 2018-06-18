<template>
  <div id="app">
      <header>
        <nav class="navbar-menu" role="navigation" aria-label="main navigation">
          <div class="navbar-start">
            <router-link to="/"><a class="navbar-item">Citations</a></router-link>
            <router-link to="/about"><a class="navbar-item">About Us</a></router-link>
            <router-link to="/pricing"><a class="navbar-item">Pricing</a></router-link>
            <router-link to="/status"><a class="navbar-item">Status</a></router-link>
          </div>
          <div class="navbar-end">
            <router-link to="/login"><a class="navbar-item">Login</a></router-link>
          </div>
        </nav>
      </header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {

  }
})
export default class App extends Vue {
}
</script>


<style lang="scss">
@import "~bulma/sass/utilities/_all";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
