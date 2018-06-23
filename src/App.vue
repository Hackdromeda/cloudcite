<template>
  <div id="app">
      <header>
        <nav id="navbar" class="navbar is-transparent">
          <div class="navbar-brand">
            <a class="navbar-item" @click="$router.push({path: '/'})">
              <h1 class="is-size-5">CloudCite</h1>
            </a>
            <div class="navbar-burger burger" data-target="navbarMenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item" @click="$router.push({path: '/pricing'})">
                Pricing
              </a>
              <a class="navbar-item" @click="$router.push({path: '/about'})">
                About Us
              </a>
              <a class="navbar-item" @click="$router.push({path: '/status'})">
                Status
              </a>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="field is-grouped">
                  <p class="control">
                    <a class="button is-primary" @click="login()">
                      <span>Login</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </nav>
    </header>
    <keep-alive>
      <router-view :auth="auth" :authenticated="authenticated"/>
    </keep-alive>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>CloudCite</strong> by the Hackdromeda team. The source code is licensed
          <a href="https://github.com/avimshah/cloudcite/blob/master/LICENSE">GNU AGPL v3.0</a>. <img width="150" height="50" src="static/a0-badge-light.png"/>
        </p>
      </div>
    </footer>
  </div>
</template>
<script>

import AuthService from './Auth/AuthService'

const auth = new AuthService()

const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'App',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  },
  mounted() {
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
          var target = $el.dataset.target;
          var $target = document.getElementById(target);
          $el.classList.toggle('is-active');
          if ($target) {
            $target.classList.toggle('is-active');
          }
        });
      });
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #005eea;
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
@import '~bulma-pricingtable/src/sass/index';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  background-image: radial-gradient(#005eea,#32363c);
}

nav {
  padding: 5px;
  background-color: #fff;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
