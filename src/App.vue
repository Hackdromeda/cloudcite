<template>
  <div id="app">
    <div id="appMain">
      <nav class="navbar is-transparent">
          <div class="navbar-brand">
            <a class="navbar-item" @click="$router.push({path: '/'})">
              <a style="color: #005eea; font-weight: 525; font-size: 1.5rem;">CloudCite</a>
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
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/support/'})">Donate</a>
            </div>
            <div class="navbar-end">
              <div class="navbar-item">
                <sui-button class="navbar-item" style="float: right;" v-if="!authenticated" type="button" @click="login()">Log In / Register</sui-button>
                <sui-button class="navbar-item" style="float: rightl" v-if="authenticated" type="button" @click="logout()">Log Out</sui-button>
              </div>
            </div>
          </div>
    </nav>
    <router-view :auth="auth" :authenticated="authenticated"/>
    </div>
    <footer class="footer" style="background-color: #eee;">
      <div class="content has-text-centered">
        <p class="footer-text"><strong>CloudCite</strong> by the Hackdromeda team. CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago. Learn more about our commitment to a privacy and a distraction-free bibliography generation environment on our about page. The source code is licensed under 
          <a href="https://github.com/Hackdromeda/cloudcite/blob/master/LICENSE">GNU AGPL v3.0</a>. Please read the <router-link to="/privacy/">privacy policy</router-link> before using this service. <img width="150" height="50" src="/static/a0-badge-light.png" alt="CloudCite uses Auth0 Token Based Authentication for secure logins"/>
        </p>
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
