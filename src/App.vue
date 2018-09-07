<template>
    <mdc-layout-app id="app">
      <mdc-top-app-bar title="CloudCite" event="nav">
        <mdc-top-app-bar-action @click="newTab('https://cloudcite.atlassian.net/servicedesk/customer/portal/1/')" icon="help"></mdc-top-app-bar-action>
      </mdc-top-app-bar>
      <mdc-drawer toggle-on="nav" temporary>
        <mdc-drawer-list>
          <mdc-drawer-item @click="pushRoute('/')" start-icon="dashboard">Dashboard</mdc-drawer-item>
          <mdc-drawer-item @click="pushRoute('/about/')" start-icon="subject">About</mdc-drawer-item>
          <mdc-drawer-item @click="pushRoute('/install/')" start-icon="open_in_browser">Install</mdc-drawer-item>
          <mdc-drawer-item @click="pushRoute('/pricing/')" start-icon="view_list">Pricing</mdc-drawer-item>
          <mdc-drawer-item @click="pushRoute('/projects/')" start-icon="apps">Projects</mdc-drawer-item>
          <mdc-drawer-item @click="pushRoute('/contribute/')" start-icon="code">Contribute</mdc-drawer-item>
          <mdc-drawer-item @click="newTab('https://api.cloudcite.net/')" start-icon="developer_board">API</mdc-drawer-item>
          <mdc-drawer-item @click="newTab('https://status.cloudcite.net/')" start-icon="timeline">Status</mdc-drawer-item>
          <mdc-drawer-item @click="newTab('https://cloudcite.net/blog/')" start-icon="web">Blog</mdc-drawer-item>
          <mdc-drawer-item @click="newTab('https://feedback.cloudcite.net/')" start-icon="feedback">Feedback</mdc-drawer-item>
        </mdc-drawer-list>
      </mdc-drawer>
    <main>
      <router-view :auth="auth" :authenticated="authenticated"/>
    </main>
    <footer v-if="displayComponent()" class="footer" style="background-color: #eee; padding: 5vh;">
      <div class="content" style="display: inline-flex; text-align: center;">
        <p class="footer-text"><strong>CloudCite</strong>'s <svg height="20" class="octicon octicon-code v-align-middle fill-gray mr-1" aria-label="code" viewBox="0 0 14 16" version="1.1" width="17" role="img"><path d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"></path></svg> made with <svg height="20" class="octicon octicon-heart v-align-middle fill-gray mx-1" aria-label="love" viewBox="0 0 12 16" version="1.1" width="15" role="img"><path d="M11.2 3c-.52-.63-1.25-.95-2.2-1-.97 0-1.69.42-2.2 1-.51.58-.78.92-.8 1-.02-.08-.28-.42-.8-1-.52-.58-1.17-1-2.2-1-.95.05-1.69.38-2.2 1-.52.61-.78 1.28-.8 2 0 .52.09 1.52.67 2.67C1.25 8.82 3.01 10.61 6 13c2.98-2.39 4.77-4.17 5.34-5.33C11.91 6.51 12 5.5 12 5c-.02-.72-.28-1.39-.8-2.02V3z"></path></svg> by the <a href="https://hackdromeda.com">Hackdromeda team</a> and <a href="https://github.com/Hackdromeda/cloudcite/graphs/contributors" class="text-gray">friends</a>. The source code is licensed under <a href="https://github.com/Hackdromeda/cloudcite/blob/master/LICENSE">GNU AGPL v3.0</a>. CloudCite uses industry-standard citation styles from the <a href="https://citationstyles.org/">Citation Styles Language project</a>. Please read the <router-link to="/privacy/">privacy policy</router-link> before using CloudCite. To support CloudCite sustainability, development, and maintenance costs, consider making a time or financial contribution on our <router-link to="/contribute/">contribute page</router-link>.</p>
      </div>
      <div style="display: inline-flex;">
        <img width="150" height="50" src="/static/a0-badge-light.png" alt="CloudCite uses Auth0 Token Based Authentication for secure logins"/>
      </div>
    </footer>
  </mdc-layout-app>
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
      authenticated
    }
  },
  methods: {
    login,
    logout,
    pushRoute(route: string) {
      this.$router.push({path: route})
    },
    newTab(url: string) {
      window.open(url, '_blank');
    },
    displayComponent() {
      //@ts-ignore
      if(window.navigator.userAgent.includes('Headless')) {
        return false;
      }
      else{
        return true;
      }
    }
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">

$mdc-theme-primary: #005eea;
$mdc-theme-accent: #212121;
$mdc-theme-background: #fff;

@import 'vue-mdc-adapter/dist/styles';

[v-cloak] {
  display: none;
}

html {
  overflow-y: auto; // override Vue default
}

main {
  padding-top: 8vh;
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
