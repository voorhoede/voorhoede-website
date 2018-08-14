import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import HighlightedClients from './highlighted-clients.vue'
import README from './README.md'

const stories = storiesOf('Components/Highlighted Clients', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('highlighted-clients', HighlightedClients)

stories.add(
  'Highlighted Clients',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <highlighted-clients ctaLabel="Get your name on the list"/>
    `,
  }),
)
