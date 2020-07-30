<template>
  <div>
    <app-banner
      v-if="layout.banner.isVisible && isHome"
      :text="layout.banner.text"
      :link="layout.banner.link"
      :link-title="layout.banner.linkTitle"
    />
    <div class="layout-default">
      <grid-demo :show="showGrid" />
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
      <app-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppBanner from '~/components/app-banner'
import AppFooter from '~/components/app-footer'
import AppHeader from '~/components/app-header'
import AppMobileMenu from '~/components/app-mobile-menu'
import GridDemo from '~/components/grid-demo'


export default {
  components: { AppBanner, AppFooter, AppHeader, AppMobileMenu, GridDemo },
  computed: {
    ...mapState(['showGrid']),
    layout () {
      return require(`../static/data/${this.$i18n.locale}/layouts/default`)
    },
    isHome() {
      return this.$route.name && this.$route.name.includes('index')
    },
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

<style>
  .layout-default {
    position: relative;
  }
</style>
