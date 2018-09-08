<template>
    <mdc-layout-app id="app">
      <mdc-top-app-bar title="CloudCite" event="nav">
        <mdc-top-app-bar-action @click="newTab('https://cloudcite.atlassian.net/servicedesk/customer/portal/1/')" icon="help"></mdc-top-app-bar-action>
      </mdc-top-app-bar>
      <mdc-drawer toggle-on="nav" temporary>
        <mdc-drawer-list>
          <mdc-drawer-item @click="pushRoute('/')" start-icon="dashboard">Dashboard</mdc-drawer-item>
          <mdc-drawer-item @click="pushRoute('/')" start-icon="settings">Settings</mdc-drawer-item>
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
      <Footer/>
    </main>
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
  components: {
    Footer: () => import('./components/Footer.vue')
  },
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
      //@ts-ignore
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

$mdc-theme-primary: #0039cb;
$mdc-theme-secondary: #F5F5F6;
$mdc-theme-background: #ffffff;

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
  background-color: #fafafa;
}

a:hover {
  cursor: pointer;
}

h1 {
  font-size: 2.3rem;
  font-weight: 600;
}
h2 {
  font-size: 2.2rem;
  font-weight: 550;
}
h3 {
  font-size: 2.1rem;
  font-weight: 500;
}
h4 {
  font-size: 2rem;
  font-weight: 450;
}
h5 {
  font-size: 2rem;
  font-weight: 400;
}
h6 {
  font-size: 1.9rem;
  font-weight: 350;
}

.subtitle {
  font-size: 1.1rem;
  font-weight: 505;
}

nav {
  padding: 5px;
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
