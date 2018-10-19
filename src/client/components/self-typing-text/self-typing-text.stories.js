import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import SelfTypingText from './self-typing-text.vue'
import README from './README.md'

const stories = storiesOf('Components/Self Typing Text', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('self-typing-text', SelfTypingText)

stories.add(
  'Self Typing Text',
  () => ({
    template: '<self-typing-text text="We are the Voorhoede" speed-index="70" />',
  }),
)
