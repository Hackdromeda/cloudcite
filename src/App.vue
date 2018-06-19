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

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #149fda;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  background: linear-gradient(45deg,#30496B,#30B8D2);
}

nav {
  padding: 5px;
  background-color: #fff;
}
</style>
