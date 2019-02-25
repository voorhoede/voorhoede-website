import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ContactForm from './contact-form.vue'
import README from './README.md'

const stories = storiesOf('Components/Get In Touch Form', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('contact-form', ContactForm)

stories.add(
  'Get In Touch Form',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <contact-form
        title="Let's discuss what we can do - together."
      />
    `,
  }),
)
