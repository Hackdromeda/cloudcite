<template>
  <div id="loadingPage">
    <div id="loadingDiv">
      <moon-loader loading="true" color="#005eea"></moon-loader>
    </div>
  </div>
</template>

<script>
  import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
  @Component({
    props: ['auth'],
    components: {
      MoonLoader
    },
    data () {
        this.auth.handleAuthentication()
        return {}
      }
  })
  export default class LoadingPage extends Vue {}
</script>

<style scoped lang="scss">
  #loadingPage {
    text-align: center;
    justify-content: center;
    background-color: #fff;
    min-height: 100vh;
  }
  #loadingDiv {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
