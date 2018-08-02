<template>
  <div>
    <div style="min-height: 35vh; background-color: #005eea; color: #fff;">
      <div class="container" style="padding: 7vh;">
        <h1>About Us</h1>
        <h2 class="subtitle" style="margin-top: 10vh;">
          CloudCite was developed by the Hackdromeda Team.
        </h2>
      </div>
    </div>
    <div id="about">
      <sui-grid :columns="2" stackable>
        <sui-grid-row>
          <sui-grid-column :computer="5" :tablet="8" :mobile="14"/>
          <sui-grid-column :computer="6" :tablet="8" :mobile="14">
            <div style="display: inline-flex;">
            <div style="padding-right: 25px; padding-bottom: 5px;">
              <img style="border-radius: 50%;" src="/static/images/Naval.jpg" width="128" height="128"/>
              <h4>Naval Patel</h4>
              <p>Project co-founder and web developer. You can learn more about me on <a href="https://navalpatel.me/" target="_blank">my website</a>.</p>
            </div>
            <div style="padding-left: 25px; padding-bottom: 5px;">
              <img style="border-radius: 50%;" src="/static/images/Avi.jpg" width="128" height="128"/>
              <h4>Avi Shah</h4>
              <p>Project co-founder and backend developer. You can learn more about me on <a href="https://avimshah.tk/#about" target="_blank">my website</a>.</p>
            </div>
            </div>
          </sui-grid-column>
          <sui-grid-column :computer="5"/>
        </sui-grid-row>
      </sui-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class About extends Vue {}
</script>

<style scoped lang="scss">
  #about {
    padding: 10px;
    min-height: 100vh;
    text-align: center;
    justify-content: center;
    background-color: #fff;
    color: #000;

    h1 {
      color: #000;
    }
    h2 {
      color: #000;
    }
    h3 {
      color: #000;
    }
    p {
      text-align: left;
    }
  }
</style>
