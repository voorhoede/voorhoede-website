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
    template: '<app-footer />',
  }),
)
