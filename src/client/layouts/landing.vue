<template>
  <div class="layout-landing">
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
        { locale: 'en', href: `/en/` },
        { locale: 'nl', href: `/nl/` },
      ]"
      :current-locale="currentLocale"
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
    currentLocale() {
      try {
        const [,, locale] = /(\/)([\w]+)(\/)/.exec(this.$route.fullPath)
        return locale
      } catch (e) {
        return ''
      }
    },
  },
}
</script>

<style>
@import '../components/app-core/index.css';

.layout-landing {
  background-color: var(--white);
}
</style>
