import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import FaqItem from './faq-item.vue'
import README from './README.md'

const stories = storiesOf('Components/Faq Item', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('faq-item', FaqItem)

stories.add(
  'Faq Item',
  () => ({
    template: `
      <faq-item
        title="Why wouldn’t I just hire a freelance developer?"
        body="<p>No, we are a team: we share insights, our love for front-end, and work together on internal and open source projects. All our developers and project managers are employees of De Voorhoede.</p>"
      />
    `,
  }),
)
.add(
  'Faq Item with image',
  () => ({
    template: `
      <faq-item
        title="Why wouldn’t I just hire a freelance developer?"
        body="<p>No, we are a team: we share insights, our love for front-end, and work together on internal and open source projects. All our developers and project managers are employees of De Voorhoede.</p>"
        :image="{
          'format': 'png',
          'width': 120,
          'height': 1000,
          'alt': 'Two hands forming a heart around the sun during a sunset',
          'url': 'https://www.datocms-assets.com/6524/1535025273-screen-shot-2018-08-23-at-13-54-07.png',
        }"
      />
    `,
  }),
)
