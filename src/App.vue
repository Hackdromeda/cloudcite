<template>
  <div id="app">
    <div id="appMain">
        <nav class="navbar">
            <a class="navbar-title" @click="$router.push({path: '/'})">CloudCite</a>
            <a class="navbar-item" @click="$router.push({path: '/bibliography/'})">Bibliography</a>
            <a class="navbar-item" @click="$router.push({path: '/about/'})">About</a>
            <a class="navbar-item" @click="$router.push({path: '/api/'})">API</a>
            <a class="navbar-item" @click="$router.push({path: '/pricing/'})">Pricing</a>
            <a class="navbar-item" @click="$router.push({path: '/status/'})">Status</a>
            <a class="navbar-item" @click="$router.push({path: '/support/'})">Help</a>
            <a class="navbar-item" @click="$router.push({path: '/support/'})">Donate</a>
            <sui-button class="navbar-item" style="float: right;" v-if="!authenticated" type="button" @click="login()">Log In / Register</sui-button>
            <sui-button class="navbar-item" style="float: rightl" v-if="authenticated" type="button" @click="logout()">Log Out</sui-button>
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
import 'semantic-ui-css/semantic.min.css';
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
  }
})
export default class App extends Vue {

}
</script>

<style lang="scss">

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

@media (max-width: 800px) {
  .navbar-item {
    visibility: hidden;
  }
}

.navbar {
  width: 100%;
  height: 10vh;
  background-color: #fff;
  text-align: left;
  padding: 20px;
}

.navbar-title {
  color: #005eea;
  font-size: 1.2rem;
  font-weight: 525;
  padding: 10px;
}

.navbar-item {
  padding: 2vh;
  color: #000;
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
