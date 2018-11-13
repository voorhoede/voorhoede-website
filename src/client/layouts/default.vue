<template>
  <div>
    <grid-demo :show="showGrid"/>
    <!--
      Set focus on this element on route change, so that the user can
      tab to the next focusable element. Giving a negative tabindex
      makes the element only focusable using .focus() but prevents the
      element from being focusable using the keyboard.
    -->
    <h1 class="sr-only" ref="topOfPage" tabindex="-1">De Voorhoede</h1>
    <app-header/>
    <app-mobile-menu/>
    <nuxt/>
    <app-footer
      :explore-links="localizedMenuItems"
      :tel="layoutData.footer.telephoneNumber"
      :email="layoutData.footer.email"
      :google-maps-link="layoutData.footer.googleMapsLink"
      :address="layoutData.footer.address"
      :postal-code="layoutData.footer.postalCode"
      :copyright-label="layoutData.footer.copyrightLabel"
      :copyright-title="layoutData.footer.copyrightTitle"
      :copyright-link="layoutData.footer.copyrightLink"
      :privacy-label="layoutData.footer.privacyLabel"
      :privacy-title="layoutData.footer.privacyTitle"
      :privacy-link="layoutData.footer.privacyLink"
      :legal="layoutData.footer.legal"
      :social="layoutData.footer.social"
    />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { AppFooter, AppHeader, AppMobileMenu, GridDemo } from '../components'

  export default {
    components: { AppFooter, AppHeader, AppMobileMenu, GridDemo },
    computed: {
      ...mapState(['showGrid', 'currentLocale', 'layoutData']),
      ...mapGetters(['localizedMenuItems'])
    },
    watch: {
      $route() {
        this.$refs.topOfPage.focus()
      }
    }
  }
</script>

<style>
  @import '../components/app-core/index.css';
</style>
