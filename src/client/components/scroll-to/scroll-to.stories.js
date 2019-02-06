import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ScrollTo from './scroll-to.vue'
import README from './README.md'

const stories = storiesOf('Components/Scroll To', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('scroll-to', ScrollTo)

stories.add(
  'Scroll To pointing down',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
    <div style="padding: 32px;">
      <scroll-to point-down />
    </div>
    `,
  }),
)
.add(
  'Scroll To pointing up',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
    <div style="padding: 32px;">
      <scroll-to direction="up" />
    </div>
    `,
  }),
)
