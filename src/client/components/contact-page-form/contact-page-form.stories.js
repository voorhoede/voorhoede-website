import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'

import '../app-core/index.css'

import ContactPageForm from './contact-page-form.vue'

const stories = storiesOf('Components/Contact Page Form', module)
  .addDecorator(withKnobs)

Vue.component('contact-page-form', ContactPageForm)

stories.add(
  'Contact Page Form',
  () => ({
    template: '<contact-page-form/>',
  }),
)
