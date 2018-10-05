import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import InputField from './input-field.vue'
import README from './README.md'

const stories = storiesOf('Components/Input Field', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('input-field', InputField)

stories.add(
  'Input Field',
  () => ({
    template: `<input-field
      type="text"
      id="name"
      label="My name is"
      placeholder-label="Your name"
    />`,
  }),
)
