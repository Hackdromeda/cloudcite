<template>
  <div id="app">
    <div id="appMain">
      <header>
        <nav id="navbar" class="navbar is-transparent">
          <div class="navbar-brand">
            <a class="navbar-item" @click="$router.push({path: '/'})">
              <h1 class="is-size-5" style="color: #005eea; font-weight: 525;">CloudCite</h1>
            </a>
            <div class="navbar-burger burger" data-target="navbarMenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item" @click="$router.push({path: '/bibliography/'})">Bibliography</a>
              <a class="navbar-item" @click="$router.push({path: '/about/'})">About</a>
              <a class="navbar-item" @click="$router.push({path: '/api/'})">API</a>
              <a class="navbar-item" @click="$router.push({path: '/pricing/'})">Pricing</a>
              <a class="navbar-item" @click="$router.push({path: '/status/'})">Status</a>
              <a class="navbar-item" @click="$router.push({path: '/support/'})">Help</a>
              <a class="navbar-item" @click="$router.push({path: '/support/'})">Donate</a>
            </div>
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="field is-grouped">
                  <p class="control">
                    <a v-if="!authenticated" class="button is-primary is-rounded" @click="login()">
                      <span>Log In / Register</span>
                    </a>
                    <a v-if="authenticated" class="button is-primary is-rounded" @click="logout()">
                      <span>Log Out</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </nav>
    </header>
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

@Component({
  components: {},
  data () {
    //@ts-ignore
    authNotifier.on('authChange', authState => {
      //@ts-ignore
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
  mounted () {
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    var $navbarItems = Array.prototype.slice.call(document.querySelectorAll('.navbar-item'), 0);
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(function ($el: any) {
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
  },
})
export default class App extends Vue {

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
