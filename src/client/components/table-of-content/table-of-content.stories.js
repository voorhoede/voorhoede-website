import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import TableOfContent from './table-of-content.vue'
import README from './README.md'

const stories = storiesOf('Components/Table Of Content', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('table-of-content', TableOfContent)

stories.add(
  'Table Of Content',
  () => ({
    template: '<table-of-content/>',
  }),
)
