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
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/projects/'})">Projects</a>
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/about/'})">About</a>
              <a href="https://api.cloudcite.net/" target="_blank" class="navbar-item" @click="navIsActive = false;">API</a>
              <a href="https://cloudcite.net/blog/" target="_blank" class="navbar-item" @click="navIsActive = false;">Blog</a>
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/pricing/'})">Pricing</a>
              <a href="https://status.cloudcite.net/" target="_blank" class="navbar-item" @click="navIsActive = false;">Status</a>
              <a href="https://help.cloudcite.net/" target="_blank" class="navbar-item" @click="navIsActive = false;">Help</a>
              <a href="https://feedback.cloudcite.net/" target="_blank" class="navbar-item" @click="navIsActive = false;">Feedback</a>
              <a class="navbar-item" @click="navIsActive = false; $router.push({path: '/contribute/'})">Contribute</a>
            </div>
            <div class="navbar-end">
              <div class="navbar-item">
                <sui-button v-if="!authenticated" class="navbar-item" style="color: #006DFC; border-radius: 25px;" type="button" @click="login()" disabled>Log In / Register</sui-button>
                <sui-button v-if="authenticated" class="navbar-item" style="color: #006DFC; border-radius: 25px;" type="button" @click="logout()" disabled>Log Out</sui-button>
              </div>
            </div>
          </div>
    </nav>
    <router-view :auth="auth" :authenticated="authenticated"/>
    </div>
    <footer class="footer" style="background-color: #eee; padding: 5vh;">
      <div class="content" style="display: inline-flex; text-align: center;">
        <p class="footer-text"><strong>CloudCite</strong>'s <svg height="20" class="octicon octicon-code v-align-middle fill-gray mr-1" aria-label="code" viewBox="0 0 14 16" version="1.1" width="17" role="img"><path d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"></path></svg> made with <svg height="20" class="octicon octicon-heart v-align-middle fill-gray mx-1" aria-label="love" viewBox="0 0 12 16" version="1.1" width="15" role="img"><path d="M11.2 3c-.52-.63-1.25-.95-2.2-1-.97 0-1.69.42-2.2 1-.51.58-.78.92-.8 1-.02-.08-.28-.42-.8-1-.52-.58-1.17-1-2.2-1-.95.05-1.69.38-2.2 1-.52.61-.78 1.28-.8 2 0 .52.09 1.52.67 2.67C1.25 8.82 3.01 10.61 6 13c2.98-2.39 4.77-4.17 5.34-5.33C11.91 6.51 12 5.5 12 5c-.02-.72-.28-1.39-.8-2.02V3z"></path></svg> by the <a href="https://hackdromeda.com">Hackdromeda team</a> and <a href="https://github.com/Hackdromeda/cloudcite/graphs/contributors" class="text-gray">friends</a>. The source code is licensed under <a href="https://github.com/Hackdromeda/cloudcite/blob/master/LICENSE">GNU AGPL v3.0</a>. CloudCite uses industry-standard citation styles from the <a href="https://citationstyles.org/">Citation Styles Language project</a>. Please read the <router-link to="/privacy/">privacy policy</router-link> before using CloudCite. To support CloudCite sustainability, development, and maintenance costs, consider making a time or financial contribution on our <router-link to="/contribute/">contribute page</router-link>.</p>
      </div>
      <div style="display: inline-flex;">
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

@supports (-webkit-overflow-scrolling: touch) {
  html {
    overflow-y: scroll !important; /* has to be scroll, not auto */
    -webkit-overflow-scrolling: touch;
  }
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

.v-align-middle {
    vertical-align: middle !important;
}
</style>
