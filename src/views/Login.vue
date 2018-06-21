<template>
  <div id="login">
    Login
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Login extends Vue {}
</script>

<style scoped lang="scss">
  #login {
    padding: 20px;
    text-align: center;
    justify-content: center;
  }
</style>
