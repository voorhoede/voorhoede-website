import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ImageComponent from './image-component.vue'
import README from './README.md'

const stories = storiesOf('Components/Image Component', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('image-component', ImageComponent)

stories.add(
  'Image Component',
  () => ({
    template: '<image-component :image="image" />',
    data() {
      return {
        image: {
          'format': 'jpeg',
          'width': 1270,
          'height': 570,
          'title': 'The view during our lunch break',
          'alt': 'Mountain landscape with a cloudy sky',
          'url': 'https://www.datocms-assets.com/6524/1534941302-drop-and-fly.jpg',
        },
      }
    },
  }),
)
