<template>
  <div>
    <grid-demo :show="showGrid"/>
    <h1 class="sr-only">De Voorhoede</h1>
    <app-header/>
    <app-mobile-menu/>
    <nuxt/>
    <app-footer
      :explore-links="localizedMenuItems"
      :tel="localizedFooter.tel"
      :email="localizedFooter.email"
      :google-maps-link="localizedFooter.googleMapsLink"
      :address="localizedFooter.address"
      :postal-code="localizedFooter.postalCode"
      :copyright-link-label="localizedFooter.copyrightLinkLabel"
      :copyright-link-title="localizedFooter.copyrightLinkTitle"
      :copyright-link="localizedFooter.copyrightLink"
      :privacy-link-label="localizedFooter.privacyLinkLabel"
      :privacy-link-title="localizedFooter.privacyLinkTitle"
      :privacy-link="localizedFooter.privacyLink"
      :legal="localizedFooter.legal"
      :social="localizedFooter.social"
    />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { AppFooter, AppHeader, AppMobileMenu, GridDemo } from '../components'

  export default {
    components: { AppFooter, AppHeader, AppMobileMenu, GridDemo },
    data() {
      return {
        footerContent: {
          en: {
            tel: '+31 (0)20 2610 954',
            email: 'post@voorhoede.nl',
            googleMapsLink: 'https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648',
            address: 'Rijnsburgstraat 9 - 11',
            postalCode: '1059 AT Amsterdam',
            privacyLinkLabel: 'Privacy statement',
            privacyLinkTitle: 'De Voorhoede privacy statement',
            privacyLink: 'https://www.datocms-assets.com/2850/1527667147-de-voorhoede-privacy-statement-en.pdf',
            copyrightLinkLabel: 'CC BY 4.0',
            copyrightLinkTitle: 'Creative Commons licence and disclaimer',
            copyrightLink: 'https://creativecommons.org/licenses/by/4.0/',
            legal: [
              { key: 'KvK', value: '56017235' },
              { key: 'VAT', value: 'NL851944620B01' },
              { key: 'IBAN', value: 'NL20ABNA0442829159' },
            ],
            social : [
              { icon: 'instagram--blue', href: 'https://www.instagram.com/devoorhoede/?hl=nl', label: 'instagram' },
              { icon: 'twitter--blue', href: 'https://twitter.com/devoorhoede', label: 'twitter' },
              { icon: 'facebook--blue', href: 'https://www.facebook.com/DeVoorhoede/', label: 'facebook' },
              { icon: 'git-hub--blue', href: 'https://github.com/voorhoede/', label: 'github' },
            ],
          },
          nl: {
            tel: '+31 (0)20 2610 954',
            email: 'post@voorhoede.nl',
            googleMapsLink: 'https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648',
            address: 'Rijnsburgstraat 9 - 11',
            postalCode: '1059 AT Amsterdam',
            privacyLinkLabel: 'Privacy statement',
            privacyLinkTitle: 'De Voorhoede privacy statement',
            privacyLink: 'https://www.datocms-assets.com/2850/1527667154-de-voorhoede-privacy-statement-nl.pdf',
            copyrightLinkLabel: 'CC BY 4.0',
            copyrightLinkTitle: 'Creative Commons licence en disclaimer',
            copyrightLink: 'https://creativecommons.org/licenses/by/4.0/',
            legal: [
              { key: 'KvK', value: '56017235' },
              { key: 'BTW', value: 'NL851944620B01' },
              { key: 'IBAN', value: 'NL20ABNA0442829159' },
            ],
            social : [
              { icon: 'instagram--blue', href: 'https://www.instagram.com/devoorhoede/?hl=nl', label: 'instagram' },
              { icon: 'twitter--blue', href: 'https://twitter.com/devoorhoede', label: 'twitter' },
              { icon: 'facebook--blue', href: 'https://www.facebook.com/DeVoorhoede/', label: 'facebook' },
              { icon: 'git-hub--blue', href: 'https://github.com/voorhoede/', label: 'github' },
            ],
          }
        }
      }
    },
    computed: {
      ...mapState(['showGrid', 'currentLocale']),
      ...mapGetters([
        'localizedMenuItems',
      ]),
      localizedFooter() {
        return this.footerContent[this.currentLocale]
      }
    },
  }
</script>

<style>
  @import '../components/app-core/index.css';
</style>
