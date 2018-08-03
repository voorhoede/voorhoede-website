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
        currentUrl: '/en/services',
        languages: [
          { locale: 'en', href: '/en/services/' },
          { locale: 'nl', href: '/nl/services/' },
        ],
        links: [
          { title: 'Services', slug: 'services' },
          { title: 'Cases', slug: 'cases' },
          { title: 'Academy', slug: 'academy' },
          { title: 'About us', slug: 'about-us' },
          { title: 'Contact', slug: 'contact', button: true },
        ],
        currentLocale: 'en',
      }
    },
    template: '<app-header :currentUrl="currentUrl" :links="links" :languages="languages" :current-locale="currentLocale"/>',
  }),
)
