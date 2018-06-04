<template>
  <div id="app">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">CloudCite</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/about">About Us</router-link>
        </div>
      </div>
      <!--<div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=CloudCite is a free MLA citations service that has no ads and is completely free to use.&amp;hashtags=CloudCite&amp;url=http://localhost:4000">
                <span class="icon">
                  <i class="fab fa-twitter"></i>
                </span>
                <span>
                  Tweet
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>-->
    </nav>
    <section class="section">
      <div class="columns">
        <div class="column is-one-third"></div>
        <router-view/>
        <div class="column is-one-third"></div>
      </div>
    </section>
    <footer class="footer" style="position: absolute; bottom: 0; width: 100%; height: 5%;">
  <div class="container">
    <div class="content has-text-centered">
      <p>
        <strong>CloudCite</strong> by <a href="http://navalpatel.me">Naval Patel</a>. Use this service at your own risk. The developers of CloudCite are not liable for any issues with the service including but not limited to inaccurate citations.
      </p>
    </div>
  </div>
</footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
