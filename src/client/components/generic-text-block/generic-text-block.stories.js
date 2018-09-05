import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import GenericTextBlock from './generic-text-block.vue'
import README from './README.md'

const stories = storiesOf('Components/Generic text block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('generic-text-block', GenericTextBlock)

stories.add(
  'Generic text block',
  () => ({
    template: `
      <generic-text-block
        title="Why wouldn’t I just hire a freelance developer?"
        body="<p>No, we are a team: we share insights, our love for front-end, and work together on internal and open source projects. All our developers and project managers are employees of De Voorhoede.</p>"
      />
    `,
  })
)

stories.add(
  'Generic text block with image',
  () => ({
    template: `
      <generic-text-block
        title="Why wouldn’t I just hire a freelance developer?"
        body="<p>No, we are a team: we share insights, our love for front-end, and work together on internal and open source projects. All our developers and project managers are employees of De Voorhoede.</p>"
        :image="{
          format: 'jpeg',
          url: 'https://www.datocms-assets.com/6524/1535033232-screen-shot-2018-08-23-at-16-06-24.png',
          alt: null,
          width: 486,
          height: 650
        }"
      />
    `,
  })
)

