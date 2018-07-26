import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppHeader from './app-header.vue'
import README from './README.md'

const stories = storiesOf('Components/App Header', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-header', AppHeader)

stories.add(
  'App Header',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    data() {
      return {
        currentUrl: '/en/services/',
        languages: [
          { locale: 'en', href: '/en/services/' },
          { locale: 'nl', href: '/nl/services/' },
        ],
        links: [
          { title: 'Services', href: '/en/services/' },
          { title: 'Cases', href: '/en/cases/' },
          { title: 'Academy', href: '/en/academy/' },
          { title: 'About us', href: '/en/about-us/',
            button: true },
          { title: 'Contact', href: '/en/contact/' },
        ],
      }
    },
    template: '<app-header :currentUrl="currentUrl" :links="links" :languages="languages"/>',
  }),
)
