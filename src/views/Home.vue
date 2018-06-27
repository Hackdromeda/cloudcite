<template>
  <div id="home">
    <div id="hero">
      <img src="static/error/favicons/mstile-150x150.png"/>
      <h1 id="welcomeText" class="title is-size-2">Welcome to CloudCite</h1>
      <div class="container" id="cite">
        <div id="citeButtonsRow">
          <a class="button is-rounded" id="citeButton" href="#websiteSection" @click="selected='website'">Website</a>
          <a class="button is-rounded" id="citeButton">Journal</a>
          <a class="button is-rounded" id="citeButton" @click="bookModal = !bookModal">Book</a>
          <a class="button is-rounded" id="citeButton">Film/Movie</a>
          <a class="button is-rounded" id="citeButton">Digital Image</a>
          <a class="button is-rounded" id="citeButton">Podcast</a>
          <a class="button is-rounded" id="citeButton">Music</a>
        </div>
      </div>
    </div>
    <section id="websiteSection" v-if="selected == 'website'">
      <EditWebsite/>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EditWebsite from '@/components/EditWebsite.vue';

@Component({
  components: {
    EditWebsite
  },
})
export default class Home extends Vue {
  selected = null
}
</script>

<style scoped lang="scss">
  #home {
    text-align: center;
    color: #212121;
  }
  #welcomeText {
    color: #fff;
  }
  #websiteSection {
    background-color: #fff;
    height: 100vh;
    padding: 5%;
  }

  @media (max-width: 991.97px) {
  #cite {
    text-align: center;
  }
   #hero {
    padding-bottom: 25px;
    height: 130vh;
  }
  #citeButtonsRow {
    justify-content: left;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  #citeButton {
    margin: 3px;
    padding: 10px;
    color: #fff;
    font-weight: 500;
    border-color: #006DFC;
    background-color: #006DFC;
  }
  #citeButton:hover {
    opacity: 0.9;
  }
  #websiteInput {
    width: 70%;
  }
}
@media (min-width: 991.98px) {
  #cite {
    text-align: center;
  }
   #hero {
    padding-bottom: 25px;
    height: 100vh;
  }
  #citeButtonsRow {
    justify-content: center;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  #citeButton {
    margin: 10px;
    padding: 10px;
    color: #fff;
    font-weight: 500;
    border-color: #006DFC;
    background-color: #006DFC;
  }
  #citeButton:hover {
    opacity: 0.9;
  }
  #websiteInput {
    width: 50%;
  }
}
</style>
