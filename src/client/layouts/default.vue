<template>
  <div class="layout-default">
    <grid-demo :show="showGrid"/>
    <app-header
      :current-url="$route.fullPath"
      :links="[
        { title: 'Services', slug: 'services' },
        { title: 'Cases', slug: 'cases' },
        { title: 'Academy', slug: 'academy' },
        { title: 'About us', slug: 'about-us' },
        { title: 'Contact', slug: 'contact', button: true },
      ]"
      :languages="[
        { locale: 'en', href: `/en/${currentUri}` },
        { locale: 'nl', href: `/nl/${currentUri}` },
      ]"
      :current-locale="$route.params.locale"
      class="grid"/>
    <nuxt class="grid"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AppHeader, GridDemo } from '~/components'

export default {
  components: { AppHeader, GridDemo },
  computed: {
    ...mapState(['showGrid']),
    currentUri() {
      const [,, uri] = /(\/[\w]+\/)(.+)/.exec(this.$route.fullPath)
      return uri
    },
  },
}
</script>

<style>
@import '../components/app-core/index.css';

.layout-default {
  background-color: var(--bg-pastel);
}
</style>
