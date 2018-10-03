import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppFooter from './app-footer.vue'

const stories = storiesOf('Components/App Footer', module)
  .addDecorator(withKnobs)

Vue.component('app-footer', AppFooter)

stories.add(
  'App Footer',
  () => ({
    data: () => {
      return {
        exploreLinks: [{
          title: 'Services',
          slug: 'services',
        },{
          title: 'Cases',
          slug: 'cases',
        },{
          title: 'Academy',
          slug: 'academy',
        },{
          title: 'About us',
          slug: 'about-us',
        },{
          title: 'FAQs',
          slug: 'faq',
        }],
        headerTitle: text('header title', 'Make it real'),
        headerSubtitle: text('subtitle', 'Discuss your next project with us'),
        tel: text('tel number', '+31 (0)20 2610 954'),
        email: text('email address', 'post@voorhoede.nl'),
        googleMapsLink: text('google maps link', 'https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648'),
        address: text('street address', 'Rijnsburgstraat 9 - 11'),
        postalCode: text('postal code', '1059 AT Amsterdam'),
        privacyLinkLabel: text('privacy statment', 'Privacy statement'),
        privacyLinkTitle: 'De Voorhoede privacy statement',
        privacyLink: 'https://www.datocms-assets.com/2850/1527667154-de-voorhoede-privacy-statement-nl.pdf',
        copyrightLinkLabel: 'CC BY 4.0',
        copyrightLinkTitle: 'Creative Commons licence and disclaimer',
        copyrightLink: 'https://creativecommons.org/licenses/by/4.0/',
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
    },
    template: `<app-footer
                :explore-links="exploreLinks"
                :header-title="headerTitle"
                :header-subtitle="headerSubtitle"
                :tel="tel"
                :email="email"
                :google-maps-link="googleMapsLink"
                :address="address"
                :postal-code="postalCode"
                :privacy-link-label="privacyLinkLabel"
                :privacy-link-title="privacyLinkTitle"
                :privacy-link="privacyLink"
                :legal="legal"
                :social="social"
                :copyright-link-label="copyrightLinkLabel"
                :copyright-link-title="copyrightLinkTitle"
                :copyright-link="copyrightLink"
              />`,
  }),
)
