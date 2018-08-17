<template>
  <div class="layout">
    <grid-demo :show="showGrid"/>
    <app-header/>
    <nuxt/>
    <app-footer
      :header-title="localisedFooter.headerTitle"
      :header-subtitle="localisedFooter.headerSubtitle"
      :explore-links="localizedMenuItems"
      :tel="localisedFooter.tel"
      :email="localisedFooter.email"
      :google-maps-link="localisedFooter.googleMapsLink"
      :address="localisedFooter.address"
      :postal-code="localisedFooter.postalCode"
      :copyright="localisedFooter.copyright"
      :privacy-link-label="localisedFooter.privacyLinkLabel"
      :privacy-link="localisedFooter.privacyLink"
      :legal="localisedFooter.legal"
      :social="localisedFooter.social"
    />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { AppFooter, AppHeader, GridDemo } from '~/components'

  export default {
    components: { AppFooter, AppHeader, GridDemo },
    data() {
      return {
        currentLocale: 'en',
        footerContent: {
          en: {
            headerTitle: 'Make it real',
            headerSubtitle: 'Discuss your next project with us',
            tel: '+31 (0)20 2610 954',
            email: 'post@voorhoede.nl',
            googleMapsLink: 'https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648',
            address: 'Rijnsburgstraat 9 - 11',
            postalCode: '1059 AT Amsterdam',
            privacyLinkLabel: 'Privacy statement',
            privacyLink: 'https://www.datocms-assets.com/2850/1527667147-de-voorhoede-privacy-statement-en.pdf',
            copyright: '© De Voorhoede 2018',
            legal: [
              { key: 'KvK', value: '56017235' },
              { key: 'VAT', value: 'NL851944620B01' },
              { key: 'IBAN', value: 'NL20ABNA0442829159' },
            ],
            social : [
              { icon: 'instagram--blue', href: 'https://www.instagram.com/devoorhoede/?hl=nl' },
              { icon: 'twitter--blue', href: 'https://twitter.com/devoorhoede' },
              { icon: 'facebook--blue', href: 'https://www.facebook.com/DeVoorhoede/' },
              { icon: 'git-hub--blue', href: 'https://github.com/voorhoede/' },
            ],
          },
          nl: {
            headerTitle: 'Maak het echt',
            headerSubtitle: 'Discuss your next project with us',
            tel: '+31 (0)20 2610 954',
            email: 'post@voorhoede.nl',
            googleMapsLink: 'https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648',
            address: 'Rijnsburgstraat 9 - 11',
            postalCode: '1059 AT Amsterdam',
            privacyLinkLabel: 'Privacy statement',
            privacyLink: 'https://www.datocms-assets.com/2850/1527667154-de-voorhoede-privacy-statement-nl.pdf',
            copyright: '© De Voorhoede 2018',
            legal: [
              { key: 'KvK', value: '56017235' },
              { key: 'BTW', value: 'NL851944620B01' },
              { key: 'IBAN', value: 'NL20ABNA0442829159' },
            ],
            social : [
              { icon: 'instagram--blue', href: 'https://www.instagram.com/devoorhoede/?hl=nl' },
              { icon: 'twitter--blue', href: 'https://twitter.com/devoorhoede' },
              { icon: 'facebook--blue', href: 'https://www.facebook.com/DeVoorhoede/' },
              { icon: 'git-hub--blue', href: 'https://github.com/voorhoede/' },
            ],
          }
        }
      }
    },
    computed: {
      ...mapState(['showGrid']),
      ...mapGetters([
        'localizedMenuItems',
      ]),
      localisedFooter() {
        return this.footerContent[this.currentLocale]
      }
    },
  }
</script>

<style>
  @import '../components/app-core/index.css';

  .layout-default {
    background-color: var(--white);
    min-height: 100vh;
  }
</style>
