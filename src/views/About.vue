<template>
  <div>
    <div :style="'min-height: 35vh;' + theme.section.backgroundColor + theme.section.textColor">
      <div class="container" style="padding: 7vh;">
        <h1>About CloudCite</h1>
        <h2 class="subtitle" style="margin-top: 10vh;">
          CloudCite was developed by the Hackdromeda Team to add to the universe a clean, simple, and distraction-free bibliography generation environment.
        </h2>
      </div>
    </div>
    <div id="about" :style="theme.textColor">
      <div id="mission">
        <h3>Mission</h3>
        <p>CloudCite provides a clean, simple, and distraction-free environment for when you really need to create bibliographies and focus on research. Avoid the ad popups, data deletion countdowns, bad user interfaces,and annoying videos and switch now.</p>
        <p>CloudCite processes citations in the cloud so you never have to create citations manually again. <b>We use the same, reliable citation processing engine our major competitors use</b> so you don't have to worry about inaccurate citations! CloudCite supports the <b>over 9000 standardized citation styles</b> maintained by the Citation Styles Language (CSL) project. CSL is used by bibliography generators including Cite This For Me, Zotero, CitationMachine, BibMe, and EasyBib.</p>
      </div>
      <br>
      <div id="inspiration">
        <h3>Inspiration</h3>
        <p>Our team grew frustrated with other bibliography generators who use proprietary code which rarely seems to improve, ads with unavoidable 30-second video popups, loads tracking, slow loading, weak security, mixed SSL content, and inaccurate autofill. Research is a long process that requires a focused environment. Citing sources should not be a slow and difficult process, where we need to watch 30-second videos, take surveys, and wait an unreasonable amount of time. When our team looked for other citation services, there were few viable options. Most of them have been bought by one company and have been modified to incorporate the ad-cluttered experience we want to avoid. We decided to start the CloudCite project to offer a COMPLETELY free alternative to the other bibliography generators with a focus on <b>productivity</b> and <b>usability</b>. Our team's goal is to provide all of the features that people expect from a citation generation service with a simple workflow and clean user interface and without any distractions.</p>
      </div>
      <br>
      <div id="team">
      <h3>Our Team</h3>
      <sui-grid :columns="2" stackable>
        <sui-grid-row>
          <sui-grid-column :computer="4" :tablet="2" :mobile="1"/>
          <sui-grid-column :computer="9" :tablet="11" :mobile="13">
            <div style="display: inline-flex;">
            <div style="padding-right: 10px; padding-bottom: 5px;">
              <img style="border-radius: 50%;" src="/static/images/Naval.jpg" width="128" height="128"/>
              <h4>Naval Patel</h4>
              <p>Project co-founder and web developer. You can learn more about me on <a href="https://navalpatel.me/" target="_blank">my website</a>.</p>
            </div>
            <div style="padding-left: 10px; padding-bottom: 5px;">
              <img style="border-radius: 50%;" src="/static/images/Avi.jpg" width="128" height="128"/>
              <h4>Avi Shah</h4>
              <p>Project co-founder and backend developer. You can learn more about me on <a href="https://avimshah.com/" target="_blank">on my personal portfolio site</a>.</p>
            </div>
            </div>
          </sui-grid-column>
          <sui-grid-column :computer="4" :tablet="2" :mobile="1"/>
        </sui-grid-row>
      </sui-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
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
  #about {
    padding: 10px;
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    
    p {
      text-align: left;
      padding-left: 20%;
      padding-right: 20%;
    }
  }
</style>
