import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppFooterList from './app-footer-list.vue'
import README from './README.md'

const stories = storiesOf('Components/App Footer List', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-footer-list', AppFooterList)

stories.add(
  'App Footer List',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    data: () => {
      return {
        'title': 'Explore',
        'links': [{
          title: 'Services',
          slug: '/nl/services',
        },{
          title: 'Cases',
          slug: '/nl/cases',
        },{
          title: 'Academy',
          slug: '/nl/academy',
        },{
          title: 'About us',
          slug: '/nl/about-us',
        },{
          title: 'FAQs',
          slug: '/nl/faq',
        }],
      }
    },
    template: '<app-footer-list :title="title" :links="links"/>',
  }),
)
