<template>
  <div id="notfound">
    404 NOT FOUND
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class NotFound extends Vue {}
</script>

<style scoped lang="scss">
  #notfound {
    padding: 20px;
    text-align: center;
    justify-content: center;
  }
</style>
