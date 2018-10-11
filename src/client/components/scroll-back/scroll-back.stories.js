import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ScrollBack from './scroll-back.vue'
import README from './README.md'

const stories = storiesOf('Components/Scroll Back', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('scroll-back', ScrollBack)

stories.add(
  'Scroll Back',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
    <div style="padding: 32px;">
      <scroll-back/>
    </div>
    `,
  }),
)
