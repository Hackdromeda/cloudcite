<template>
  <div class="home">
    <h3><b>Welcome to CloudCite!</b></h3>
    <Cite/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cite from '@/components/Cite.vue';

@Component({
  components: {
    Cite
  },
})
export default class Home extends Vue {}
</script>
