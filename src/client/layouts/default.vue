<template>
  <div>
    <grid-demo :show="showGrid"/>
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
      :copyright-link-label="layoutData.footer.copyrightLabel"
      :copyright-link-title="layoutData.footer.copyrightTitle"
      :copyright-link="layoutData.footer.copyrightLink"
      :privacy-link-label="layoutData.footer.privacyLabel"
      :privacy-link-title="layoutData.footer.privacyTitle"
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
  }
</script>

<style>
  @import '../components/app-core/index.css';
</style>
