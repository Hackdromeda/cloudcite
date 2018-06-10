<template>
  <div id="app">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <span>CloudCite</span>
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/about">About Us</router-link>
        </div>
      </div>
      <div class="navbar-end">
      </div>
    </nav>
    <section class="section">
      <div class="columns" style="justify-content: center;">
        <div class="column is-one-quarter"></div>
        <div class="column is-two-quarers"><router-view/></div>
        <div class="column is-one-quarter"></div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['getEditing', 'getCitation'])
  },
  methods: {
    ...mapActions(['setCitation', 'setEditing', 'setEditingCitationAuthor', 'addNewEditingAuthor', 'removeEditingAuthor']),
  }
}
</script>

<style lang="scss">
@import 'main.scss';

body{
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(45deg,#30496B,#30B8D2);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
