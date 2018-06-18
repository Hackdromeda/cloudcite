<template>
  <div id="app">
    <div id="nav">
      <header class="navbar">
      <section class="navbar-section">
    <router-link to="/"><a class="btn btn-link">Citations</a></router-link>
    <router-link to="/about"><a class="btn btn-link">About Us</a></router-link>
    <router-link to="/pricing"><a class="btn btn-link">Pricing</a></router-link>
  </section>
  <section class="navbar-center">
    <img src="static/favicons/favicon-96x96.png"/>
  </section>
  <section class="navbar-section">
    <router-link to="/login"><a class="btn btn-link">Login</a></router-link>
  </section>
      </header>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "node_modules/spectre.css/src/spectre";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
