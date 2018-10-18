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
    template: `<contact-page-form
      subject-title="What can we help you with?"
      contact-title="About me"
      name-label="My name is"
      name-placeholder="Your name"
      name-error-message="Your name is mandatory"
      email-label="You can email me at"
      email-placeholder="Email address"
      email-error-message-empty="Your email address is mandatory"
      email-error-message-incorrect="Please provide a correct email address"
      phone-label="You can call me on"
      phone-placeholder="Phone number"
      phone-error-message="Your phone number is mandatory"
      business-label="My business is"
      business-placeholder="Company name"
      website-label="My website is"
      website-placeholder="Website URL"
      subject-label="I need help with"
      subject-options=""
      budget-label="And have a budget of"
      budget-options=""
      project-label="My project is"
      project-placeholder="Summary of my project..."
      cta-label="Send" />`,
  }),
)
