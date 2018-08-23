import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import StorytellingSection from './storytelling-section.vue'
import README from './README.md'

const stories = storiesOf('Components/Storytelling Section', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('storytelling-section', StorytellingSection)

stories.add(
  'Storytelling Section',
  () => ({
    template: `
    <div>
      <storytelling-section
        title="So, what's key?"
        :items="[
          {
            title: 'Communication',
            body: '<p>all developers use the same vocabulary for all parts of the website. Designers, back-end developers and other stakeholders understand and use this terminology as well. The same goes for coding conventions (guidelines on how to write your code).',
            image: { url: 'https://www.datocms-assets.com/6524/1535025273-screen-shot-2018-08-23-at-13-54-07.png' }
          },
          {
            title: 'Independence',
            body: '<p>all teams should be able to work and make progress independently of each other. This also applies to all disciplines within a team.</p>',
          },
          {
            title: 'Reuse',
            body: '<p>Each team is responsible for a different part of the website.</p>',
            image: { url: '/images/logo--blue.svg' }
          },
          {
            title: 'Transparency',
            body: '<p>all developers use the same vocabulary for all parts of the website. Designers, back-end developers and other stakeholders understand and use this terminology as well. The same goes for coding conventions (guidelines on how to write your code).</p><p>all developers use the same vocabulary for all parts of the website. Designers, back-end developers and other stakeholders understand and use this terminology as well. The same goes for coding conventions (guidelines on how to write your code).</p><p>When it’s always clear what’s being done by each team, you prevent them doing the same thing twice. Transparency also allows you to review and improve each other’s work.</p>',
            image: { url: 'https://www.datocms-assets.com/6524/1535025270-screen-shot-2018-08-23-at-13-53-51.png' }
          },
          {
            body: '<p>all developers use the same vocabulary for all parts of the website. Designers, back-end developers and other stakeholders understand and use this terminology as well. The same goes for coding conventions (guidelines on how to write your code).</p><p>When it’s always clear what’s being done by each team, you prevent them doing the same thing twice. Transparency also allows you to review and improve each other’s work.</p>',
            image: { url: '/images/logo--blue.svg' }
          },
        ]"
      />
      </div>
    `,
  }),
)
