import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ContactPageForm from './contact-page-form.vue'
import README from './README.md'

const stories = storiesOf('Components/Contact Page Form', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('contact-page-form', ContactPageForm)

stories.add(
  'Contact Page Form',
  () => ({
    template: '<contact-page-form/>',
  }),
)
