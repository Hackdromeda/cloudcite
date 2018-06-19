<template>
  <div class="container" id="cite">
    <div id="citeButtonsRow">
      <a class="button is-rounded" id="citeButton">Website</a>
      <a class="button is-rounded" id="citeButton">Academic Journal</a>
      <a class="button is-rounded" id="citeButton">Digital Image</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Cite extends Vue {
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (max-width: 767.98px) {
  #cite {
    text-align: center;
  }
  #citeButtonsRow {
    justify-content: center;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  #citeButton {
    margin: 3px;
    padding: 10px;
    color: #1976d2;
    font-weight: 500;
  }
  #citeButton:hover {
    opacity: 0.9;
  }
}
@media (min-width: 991.98px) {
  #cite {
    text-align: center;
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
    color: #1976d2;
    font-weight: 500;
  }
  #citeButton:hover {
    opacity: 0.9;
  }
}
</style>
