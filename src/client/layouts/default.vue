<template>
  <div class="layout">
    <grid-demo :show="showGrid"/>
    <app-header class="grid"/>
    <nuxt class="grid"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { AppHeader, GridDemo } from '~/components'

  export default {
    components: { AppHeader, GridDemo },
    computed: {
      ...mapState(['showGrid'])
    },
  }
</script>

<style>
  @import '../components/app-core/index.css';

  .layout {
    background-color: var(--white);
  }
</style>
