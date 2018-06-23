<template>
  <div id="loadingPage">
      Loading...
  </div>
</template>

<script>
  export default {
    name: 'LodingPage',
    props: ['auth'],
    data () {
      this.auth.handleAuthentication()
      return {}
    }
  }
</script>

<style scoped lang="scss">
  #loadingPage {
    text-align: left;
    background-color: #fff;
    min-height: 100vh;
    padding: 20px;
  }
</style>
