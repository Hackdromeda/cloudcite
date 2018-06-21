<template>
  <div class="container" id="cite">
    <b-modal :active.sync="websiteModal" id="websiteModal">
       <div id="websiteInput">
        <b-field>
          <input type="email" placeholder="Enter website url" maxlength="2048" autofocus/>
        </b-field>
      </div>
    </b-modal>
    <div id="citeButtonsRow">
      <a class="button is-rounded" id="citeButton" @click="websiteModal = !websiteModal">Website</a>
      <a class="button is-rounded" id="citeButton">Journal</a>
      <a class="button is-rounded" id="citeButton">Book</a>
      <a class="button is-rounded" id="citeButton">Film/Movie</a>
      <a class="button is-rounded" id="citeButton">Digital Image</a>
      <a class="button is-rounded" id="citeButton">Podcast</a>
      <a class="button is-rounded" id="citeButton">Music</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Cite extends Vue {
    data () {
      return {
        websiteModal: false
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (max-width: 991.97px) {
  #cite {
    text-align: center;
  }
  #websiteInput {
    color: #fff;
    font-weight: 400;
    justify-content: center;
    text-align: center;
    padding: 20px;

    input {
      background-color: transparent; 
      border-radius: 10px;
      border-color: transparent;
      font-size: 2em;
      color: #fff;
      border-bottom-color: #fff;
      caret-color: #fff;
    }
    input:focus {
      outline: none;
    }
    input::placeholder {
      color: #fff;
      opacity: 0.3;
    }
  }
  #websiteModal {
    background-color: transparentize($color: #005eea, $amount: 0.7)
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
}
@media (min-width: 991.98px) {
  #cite {
    text-align: center;
  }
  #websiteInput {
    color: #fff;
    font-weight: 400;
    justify-content: center;
    text-align: center;
    padding: 20px;

    input {
      background-color: transparent; 
      border-radius: 10px;
      border-color: transparent;
      font-size: 4em;
      color: #fff;
      border-bottom-color: #fff;
      caret-color: #fff;
    }
    input:focus {
      outline: none;
    }
    input::placeholder {
      color: #fff;
      opacity: 0.3;
    }
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
  #websiteModal {
    background-color: transparentize($color: #005eea, $amount: 0.7)
  }
}
</style>
