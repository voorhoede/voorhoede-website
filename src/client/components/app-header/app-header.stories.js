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
        currentUrl: '/',
        locales: ['nl', 'en'],
        links: [
          {
            title: 'Services',
            slug: '/en/services/',
          },
          {
            title: 'Cases',
            slug: '/en/cases/',
          },
          {
            title: 'Academy',
            slug: '/en/academy/',
          },
          {
            title: 'About us',
            slug: '/en/about-us/',
            button: true,
          },
          {
            title: 'Contact',
            slug: '/en/contact/',
          },
        ],
      }
    },
    template: '<app-header :currentUrl="currentUrl" :links="links" :locales="locales"/>',
  }),
)
