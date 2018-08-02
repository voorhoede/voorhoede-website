import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs, text } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppFooter from './app-footer.vue'
import README from './README.md'

const stories = storiesOf('Components/App Footer', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-footer', AppFooter)

stories.add(
  'App Footer',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    data: () => {
      return {
        headerTitle: text('header title', 'Make it real'),
        headerSubtitle: text('subtitle', 'Discuss your next project with us'),
        tel: text('tel number', '+31 (0)20 2610 954'),
        email: text('email address', 'post@voorhoede.nl'),
        googleMapsLink: text('google maps link', 'https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648'),
        address: text('street address', 'Rijnsburgstraat 9 - 11'),
        postalCode: text('postal code', '1059 AT Amsterdam'),
        copyright: text('copyright', '@ De Voorhoede 2018  Privacy statement'),
        legal: [
          { key: text('legal title','KvK'), value: text('legal value','56017235') },
          { key: 'BTW', value: 'NL851944620B01' },
          { key: 'IBAN', value: 'NL20ABNA0442829159' },
        ],
        social : [
          { icon: text('icon name','instagram--blue'), slug: text('icon slug','https://www.instagram.com/devoorhoede/?hl=nl') },
          { icon: 'twitter--blue', slug: 'https://twitter.com/devoorhoede' },
          { icon: 'facebook--blue', slug: 'https://www.facebook.com/DeVoorhoede/' },
          { icon: 'git-hub--blue', slug: 'https://github.com/voorhoede/' },
        ],
      }
    },
    template: `<app-footer
                :headerTitle="headerTitle"
                :headerSubtitle="headerSubtitle"
                :tel="tel"
                :email="email"
                :googleMapsLink="googleMapsLink"
                :address="address"
                :postalCode="postalCode"
                :copyright="copyright"
                :legal="legal"
                :social="social
              "/>`,
  }),
)
