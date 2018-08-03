<template>
  <div id="app">
    <div id="appMain">
      <nav class="navbar is-transparent">
          <div class="navbar-brand">
            <a class="navbar-item" @click="$router.push({path: '/'})">
              <a id="title" style="color: #005eea; font-weight: 600; font-size: 1.5rem;">CloudCite</a>
            </a>
            <!--https://gitlab.com/snippets/1685935-->
            <div class="navbar-burger burger" @click="toggleMenu" data-target="navbarMenu" :class="{'is-active': navIsActive}">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div id="navbarMenu" class="navbar-menu" :class="{'is-active': navIsActive}">
            <div class="navbar-start">
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/bibliography/'})">Bibliography</a>
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/about/'})">About</a>
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/api/'})">API</a>
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/pricing/'})">Pricing</a>
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/status/'})">Status</a>
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/support/'})">Help</a>
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/contribute/'})">Contribute</a>
            </div>
            <div class="navbar-end">
              <div class="navbar-item">
                <sui-button v-if="!authenticated" class="navbar-item" style="float: right; color: #006DFC; border-radius: 25px;" type="button" @click="login()" disabled>Log In / Register</sui-button>
                <sui-button v-if="authenticated" class="navbar-item" style="float: right; color: #006DFC; border-radius: 25px;" type="button" @click="logout()" disabled>Log Out</sui-button>
              </div>
            </div>
          </div>
    </nav>
    <router-view :auth="auth" :authenticated="authenticated"/>
    <div id="scrollToTopDiv">
      <a @click="scrollToTop()"><sui-icon size="large" name="arrow up icon"/></a>
    </div>
    </div>
    <footer class="footer" style="background-color: #eee; padding: 5vh;">
      <div class="content" style="text-align: left;">
        <p class="footer-text"><strong>CloudCite</strong> by the Hackdromeda team. The source code is licensed under 
          <a href="https://github.com/Hackdromeda/cloudcite/blob/master/LICENSE">GNU AGPL v3.0</a>. The citation styles are based on styles from <a href="https://citationstyles.org/">https://citationstyles.org/</a>. Please read the <router-link to="/privacy/">privacy policy</router-link> before using this service.
        </p>
      </div>
      <div style="display: inline-flex; text-align: center;">
        <img width="150" height="50" src="/static/a0-badge-light.png" alt="CloudCite uses Auth0 Token Based Authentication for secure logins"/>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
//@ts-ignore
import AuthService from './Auth/AuthService';
const auth = new AuthService()
const { login, logout, authenticated, authNotifier } = auth
import 'semantic-ui-css/semantic.min.css';

@Component({
  components: {},
  created () {
    this.$store.dispatch('setState')
  },
  data () {
    //@ts-ignore
    authNotifier.on('authChange', authState => {
      //@ts-ignore
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated,
      navIsActive: false
    }
  },
  methods: {
    login,
    logout,
    toggleMenu() {
      this.$data.navIsActive = !this.$data.navIsActive
    },
    scrollToTop() {
      //@ts-ignore
      document.querySelector('#title').scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  }
})
export default class App extends Vue {

}
</script>

<style lang="scss">

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #005eea;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
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

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

@import 'bulma/sass/components/navbar.sass';

[v-cloak] {
  display: none;
}

html {
  overflow-y: auto; // override Vue default
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff;
}

a:hover {
  cursor: pointer;
}

h1 {
  color: #fff;
  font-size: 2.3rem;
  font-weight: 600;
}

.subtitle {
  color: rgba(255, 255, 255, 0.952);
  font-size: 1.1rem;
  font-weight: 505;
}

#appMain {
  min-height: 100vh;
  font-weight: 500;
}

#scrollToTopDiv {
  position: fixed;
  bottom: 5vh;
  right: 5vh;
}

nav {
  padding: 5px;
  background-color: #fff;
}

footer {
    position: static;
    width: 100%;
}

.footer img {
  vertical-align: middle;
}

@media (max-width: 1024px) {
  .field.is-grouped {
    justify-content: center !important;
}
}
</style>
