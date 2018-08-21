import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import FullWidthImage from './full-width-image.vue'
import README from './README.md'

const stories = storiesOf('Components/Full Width Image', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('full-width-image', FullWidthImage)

stories.add(
  'Full Width Image',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: '<full-width-image/>',
  }),
)
