import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import AppLogo from './app-logo.vue'
import README from './README.md'

const stories = storiesOf('Components/App Logo', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-logo', AppLogo)

stories.add(
  'App Logo',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: '<app-logo/>',
  }),
)
