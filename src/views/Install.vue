<template>
  <div>
    <div :style="'min-height: 35vh;' + theme.section.backgroundColor + theme.section.textColor">
      <div class="container" style="padding: 7vh;">
        <h1>Install CloudCite</h1>
        <h2 class="subtitle" style="margin-top: 10vh;">
          CloudCite is available as a progressive web app (PWA), extension, and/or native application on these platforms:
        </h2>
      </div>
    </div>
    <div id="install" :style="theme.textColor">
        <div id="iOS">
          <h3>iOS</h3>
          <p>To install the CloudCite app to your iPhone, iPod, or iPad go to Safari, press the share icon, and choose "Add to Home Screen."</p>
          <div id="preview" style="display: block;">
            <a href="https://www.wikihow.tech/Add-a-Link-Button-to-the-Home-Screen-of-an-iPhone" target="_blank">
              <img src="/static/images/iosapp.png" style="width:150px">
            </a>
          </div>
        </div>
        <div id="Android">
          <h3>Android</h3>
          <p>To install the CloudCite app on your Android device, open chrome, tap the the overflow button (three vertical dots), and select "Add to Home Screen"</p>
          <div id="preview" style="display: block;">
            <a href="#">
              <img src="/static/images/androidapp.png" style="width:150px">
            </a>
          </div>            
        </div>
        <div id="Windows">
          <h3>Windows</h3>
          <p>Open Microsoft Edge, click on the overflow button (three horizontal dots) and select "Pin this page to Start" or "Pin this page to the Taskbar."</p>
          <div id="preview" style="display: block;">
            <a href="https://www.lifewire.com/pin-web-page-to-windows-10-start-menu-4103663" target="_blank">
              <img src="/static/images/windowstile.png" style="width:150px">
            </a>
          </div>            
        </div>
        <div id="MacOS">
          <h3>MacOS</h3>
          <p><i>Coming Soon</i></p>
          <div id="preview" style="display: block;">
          </div>           
        </div>
        <br>
        <div id="Extensions">
          <h3>Chrome and Firefox Extensions</h3>
          <p><i>Coming Soon</i></p>
          <div id="preview" style="display: block;">
          </div>           
        </div>
        <br>
        <div id="Classic">
          <h3>Classic Browsers</h3>
          <p>Save a Bookmark for CloudCite! Click on the browser icons below to learn how to add a bookmark.</p>
          <div id="preview" style="display: block;">
            <a href="https://support.google.com/chrome/answer/188842?co=GENIE.Platform%3DDesktop&hl=en" target="_blank">
              <img src="/static/images/chrome/chrome_128x128.png">
            </a>
            <a href="https://support.mozilla.org/en-US/kb/bookmarks-firefox" target="_blank">
              <img src="/static/images/firefox/firefox_128x128.png">
            </a>
            <a href="https://support.apple.com/guide/safari/bookmark-pages-ibrw1039/mac" target="_blank">
              <img src="/static/images/safari/safari_128x128.png">
            </a>
            <a href="https://www.opera.com/computer/features/bookmarks" target="_blank">
              <img src="/static/images/opera/opera_128x128.png">
            </a>
            <a href="https://community.brave.com/search?q=Add%20Bookmark" target="_blank">
              <img src="/static/images/brave/brave_128x128.png">
            </a>
            <a href="https://www.samsung.com/uk/support/mobile-devices/how-do-i-bookmark-a-page-in-the-internet-browser-on-my-samsung-galaxy-smartphone/" target="_blank">
              <img src="/static/images/samsung-internet/samsung-internet_128x128.png">
            </a>
            <a href="https://support.microsoft.com/en-us/help/4027306/windows-add-a-site-to-my-favorites-in-microsoft-edge" target="_blank">
              <img src="/static/images/edge/edge_128x128.png">
            </a>           
          </div>           
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  computed: {
    theme: {
      get() {
        return this.$store.getters.getTheme
      }
    }
  }
})
export default class About extends Vue {}
</script>
<style scoped lang="scss">
  #install {
    padding: 10px;
    min-height: 100vh;
    text-align: center;
    justify-content: center;

    p {
      text-align: center;
      padding-left: 20%;
      padding-right: 20%;
    }
  }
  #preview a,
  #preview svg {
    display: inline-block;
    vertical-align: middle;
  }
  #preview a {
    margin: 20px;
    color: #34495e;
  }
  #preview svg {
    margin-right: 5px;
  }
</style>
