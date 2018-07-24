import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import GridDemo from './grid-demo.vue'
import README from './README.md'

const stories = storiesOf('Components/Grid Demo', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('grid-demo', GridDemo)

stories.add(
  'Grid Demo',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `<grid-demo show/>`,
  }),
)

