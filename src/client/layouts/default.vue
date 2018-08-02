<template>
  <div class="layout-default">
    <grid-demo :show="showGrid"/>
    <app-header
      :current-url="$route.fullPath"
      :links="localizedMenu"
      :languages="languages"
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
    ...mapState(['showGrid', 'alternateUris', 'menu']),
    languages() {
      return Object.keys(this.alternateUris)
        .reduce((list, key) =>
          [
            ...list,
            { locale: key, href: this.alternateUris[key] },
          ],
          []
        )
    },
    currentLocale() {
      try {
        const [,, locale] = /(\/)([\w]+)(\/)(.+)/.exec(this.$route.fullPath)
        return locale
      } catch (e) {
        return ''
      }
    },
    currentUri() {
      try {
        const [,, uri] = /(\/[\w]+\/)(.+)/.exec(this.$route.fullPath)
        return uri
      } catch (e) {
        return ''
      }
    },
    localizedMenu() {
      return this.menu[this.currentLocale]
    },
  },
}
</script>

<style>
@import '../components/app-core/index.css';

.layout-default {
  background-color: var(--bg-pastel);
  min-height: 100vh;
}
</style>
