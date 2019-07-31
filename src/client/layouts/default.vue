<template>
  <div>
    <grid-demo :show="showGrid"/>
    <!--
      Set focus on this element on route change, so that the user can
      tab to the next focusable element. Giving a negative tabindex
      makes the element only focusable using .focus() but prevents the
      element from being focusable using the keyboard.
    -->
    <a id="top" ref="id" class="sr-only" tabindex="-1">{{ $t('top_of_page') }}</a>
    <app-header
      :title="layout.menu.title"
      :links="layout.menu.links"
      :call-to-action="layout.menu.callToAction"
    />
    <app-mobile-menu
      :title="layout.menu.title"
      :links="[].concat(layout.menu.links, layout.menu.callToAction)"
    />
    <nuxt />
    <app-footer/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppFooter from '~/components/app-footer'
import AppHeader from '~/components/app-header'
import AppMobileMenu from '~/components/app-mobile-menu'
import GridDemo from '~/components/grid-demo'

export default {
  components: { AppFooter, AppHeader, AppMobileMenu, GridDemo },
  data() {
    return {
      layout: require(`../static/data/${this.$i18n.locale}/layouts/default`), // layout data should always be bundled
    }
  },
  computed: {
    ...mapState(['showGrid']),
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      link: [
        { rel: 'manifest', type: 'application/manifest+json', href: `/manifest-${this.$i18n.locale}.json` },
      ]
    }
  },
}
</script>
