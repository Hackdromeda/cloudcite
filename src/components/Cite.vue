<template>
  <div class="container" id="cite">
    <div id="citeButtonsRow">
      <a class="button" id="citeButton">Website</a>
      <a class="button" id="citeButton">Academic Journal</a>
      <a class="button" id="citeButton">Digital Image</a>
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
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  color: #094b66;
  font-weight: 500;
}
#citeButton:hover {
  opacity: 0.9;
}
</style>
