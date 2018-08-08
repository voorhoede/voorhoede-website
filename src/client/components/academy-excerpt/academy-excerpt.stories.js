import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs, select } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
//import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AcademyExcerpt from './academy-excerpt.vue'
import README from './README.md'

const stories = storiesOf('Components/Academy Excerpt', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('academy-excerpt', AcademyExcerpt)

stories.add(
  'Academy Excerpt',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
    <div style="margin-top: 100px;">
      <academy-excerpt
        date-string="2018-10-31"
        current-locale="${select('locale', { en: 'en', nl: 'nl' }, 'en')}"
        heading="Simply Serverless Meetup"
        body="On 12 July we will host the Simply Serverless Meetup. We'll introduce you to cloud functions, a brand new tool for serverless Node apps and show the benefits by sharing a project built with a serverless architecture."
        ctaPrimaryLabel="Sign up"
        ctaPrimaryTo="https://google.nl"
        ctaSecondaryLabel="Learn more"
        ctaSecondaryTo="https://google.nl"
      />
    </div>
    `,
    asyncData() {
      console.log('henk')
    },
  }),
)
