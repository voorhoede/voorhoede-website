import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import GetInTouchForm from './get-in-touch-form.vue'
import README from './README.md'

const stories = storiesOf('Components/Get In Touch Form', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('get-in-touch-form', GetInTouchForm)

stories.add(
  'Get In Touch Form',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <get-in-touch-form
        title="Let's discuss what we can do - together."
        name-label="My name is"
        name-placeholder="Your name"
        name-error-message="Your name is mandatory"
        email-label="You can email me at"
        email-placeholder="Email address"
        email-error-message-empty="Your email is mandatory"
        email-error-message-incorrect="Please provide a correct email address"
        phone-label="You can call me on"
        phone-placeholder="Phone number"
        phone-error-message="Your phone is mandatory"
        summary-label="My project is"
        summary-placeholder="Short summary of my project"
        summary-error-message="Your project is mandatory"
        cta-label="Get in touch"
      />
    `,
  }),
)
