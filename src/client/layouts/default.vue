<template>
  <div>
    <grid-demo :show="showGrid"/>
    <app-header/>
    <app-mobile-menu/>
    <nuxt/>
    <app-footer />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { AppFooter, AppHeader, AppMobileMenu, GridDemo } from '../components'

  export default {
    components: { AppFooter, AppHeader, AppMobileMenu, GridDemo },
    computed: {
      ...mapState(['showGrid', 'currentLocale']),
      ...mapGetters([
        'localizedMenuItems',
      ]),
    },
  }
</script>

<style>
  @import '../components/app-core/index.css';
</style>
