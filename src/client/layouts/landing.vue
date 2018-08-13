<template>
  <div class="layout-landing">
    <grid-demo :show="showGrid"/>
    <app-header
      :current-url="$route.fullPath"
      :links="localizedMenu"
      :languages="languages"
      :current-locale="currentLocale"/>
    <nuxt/>
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
        const [,, locale] = /(\/)([\w]+)(\/)/.exec(this.$route.fullPath)
        return locale
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

.layout-landing {
  background-color: var(--white);
}
</style>
