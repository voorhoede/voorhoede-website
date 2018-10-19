import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ImageGrid from './image-grid.vue'
import README from './README.md'

const stories = storiesOf('Components/Image Grid', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('image-grid', ImageGrid)

stories.add(
  'Image Grid',
  () => ({
    template: '<image-grid />',
  }),
)
