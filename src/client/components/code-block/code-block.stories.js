import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import CodeBlock from './code-block.vue'
import README from './README.md'

const stories = storiesOf('Components/Code Block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('code-block', CodeBlock)

stories.add(
  'Code Block',
  () => ({
    template: '<code-block/>',
  }),
)
