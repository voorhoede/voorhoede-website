import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import RichTextBlock from './rich-text-block.vue'
import README from './README.md'

const stories = storiesOf('Components/Rich Text Block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('rich-text-block', RichTextBlock)

stories.add(
  'Rich Text Block',
  () => ({
    template: '<rich-text-block/>',
  }),
)
