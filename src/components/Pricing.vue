<template>
  <div class="columns">
  <div class="column"></div>
  <div class="column is-three-quarters">
    <h1 class="title is-size-1" style="color: #ffffff;">Pricing</h1>
        <div style="background-color: #ffffff; opacity: 0.9; border-radius: 5px; justify-content: center;">
            <h1 class="is-size-2"><b>CloudCite is free forever.</b></h1>
        </div>
        <div style="background-color: #ffffff; opacity: 0.9; border-radius: 5px; justify-content: center; margin: 5px;">
            <h2 class="is-size-2"><b><a href="https://github.com/as0218PUSD/cloudcite">See Our Source Code</a></b></h2>
        </div>
    <div>
    <CitationsTable></CitationsTable>
    </div>
  </div>
  <div class="column"></div>
</div>
</template>

<script>
export default {
  name: 'Pricing'
}
</script>

<style scoped>
</style>
