import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs, array } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ScrollHighlightedText from './scroll-highlighted-text.vue'
import README from './README.md'

const stories = storiesOf('Components/Scroll Highlighted Text', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('scroll-highlighted-text', ScrollHighlightedText)

const arrayValues = [
  'We work lean and agile.',
  'Start small and iterate fast',
  'to help you from an idea,',
  'to an amazing product.',
]

stories.add(
  'Scroll Highlighted Text',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    data() {
      return {
        textLines: array('Text lines', arrayValues, ':'),
      }
    },
    template: `
      <scroll-highlighted-text
        :textLines="textLines"
      />
    `,
  }),
)
