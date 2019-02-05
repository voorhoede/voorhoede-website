import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
//import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AcademyExcerpt from './academy-excerpt.vue'
import README from './README.md'
import createStore from '../../store'

const stories = storiesOf('Components/Academy Excerpt', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('academy-excerpt', AcademyExcerpt)

stories.add(
  'Academy Excerpt - with image',
  () => ({
    store: createStore(),
    template: `
    <div style="margin-top: 100px;">
      <academy-excerpt
        date-string="2018-10-31"
        title="Simply Serverless Meetup"
        description="On 12 July we will host the Simply Serverless Meetup. We'll introduce you to cloud functions, a brand new tool for serverless Node apps and show the benefits by sharing a project built with a serverless architecture."
        ctaPrimaryTo="https://google.nl"
        ctaSecondaryTo="https://google.nl"
        :image="{
          url: 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
          format: 'jpeg',
          width: 1280,
          height: 720,
        }"
      />
    </div>
    `,
  }),
)

stories.add(
  'Academy Excerpt - without image',
  () => ({
    store: createStore(),
    template: `
    <div style="margin-top: 100px;">
      <academy-excerpt
        date-string="2018-10-31"
        title="Simply Serverless Meetup"
        description="On 12 July we will host the Simply Serverless Meetup. We'll introduce you to cloud functions, a brand new tool for serverless Node apps and show the benefits by sharing a project built with a serverless architecture."
        ctaPrimaryLabel="Sign up"
        ctaPrimaryTo="https://google.nl"
        ctaSecondaryLabel="Learn more"
        ctaSecondaryTo="https://google.nl"
      />
    </div>
    `,
  }),
)
