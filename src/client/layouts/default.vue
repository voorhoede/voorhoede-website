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
    <app-footer
      :links="[].concat(layout.menu.links, layout.menu.callToAction)"
      :tel="layout.footer.telephoneNumber"
      :email="layout.footer.email"
      :google-maps-link="layout.footer.googleMapsLink"
      :address="layout.footer.address"
      :postal-code="layout.footer.postalCode"
      :copyright-label="layout.footer.copyrightLabel"
      :copyright-title="layout.footer.copyrightTitle"
      :copyright-link="layout.footer.copyrightLink"
      :privacy-label="layout.footer.privacyLabel"
      :privacy-title="layout.footer.privacyTitle"
      :privacy-link="layout.footer.privacyLink"
      :logo-alt="layout.footer.logoAlt"
      :legal="layout.footer.legal"
      :social="layout.footer.social"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AppFooter, AppHeader, AppMobileMenu, GridDemo } from '../components'

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
      }
    }
  },
}
</script>

<style>
  @import '../components/app-core/index.css';
</style>
