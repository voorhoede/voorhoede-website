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
      <storytelling-section
        title="So, what's key?"
      />
    `,
  }),
)
