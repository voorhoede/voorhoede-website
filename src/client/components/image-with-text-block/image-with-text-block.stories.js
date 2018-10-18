import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ImageWithTextBlock from './image-with-text-block.vue'
import README from './README.md'

const stories = storiesOf('Components/Image With Text Block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('image-with-text-block', ImageWithTextBlock)

stories.add(
  'Image With Text Block',
  () => ({
    template: `
      <div style="background-color: var(--bg-pastel); height: 100vh;">
        <image-with-text-block
          title="Misfits, every one of them"
          body="We’re on board as secret weapons and the biggest supporters of our clients. We’re not interested in taking a backseat. We believe that the best work is being made in a great atmosphere."
          :image="image" />
      </div>`,
    data() {
      return {
        image: {
          'format': 'jpeg',
          'width': 720,
          'height': 480,
          'alt': 'User confirms on drop and fly screen that bags do not contain any prohibited items',
          'url': 'https://www.datocms-assets.com/6524/1538054782-voorhoede-31.jpg',
        },
      }
    },
}),
)

stories.add(
  'Image With Text Block - inverse',
  () => ({
    template: `
      <div style="background-color: var(--bg-pastel); height: 100vh;">
        <image-with-text-block
          title="Misfits, every one of them"
          body="We’re on board as secret weapons and the biggest supporters of our clients. We’re not interested in taking a backseat. We believe that the best work is being made in a great atmosphere."
          :image="image"
          inverse="true" />
      </div>`,
    data() {
      return {
        image: {
          'format': 'jpeg',
          'width': 720,
          'height': 480,
          'alt': 'User confirms on drop and fly screen that bags do not contain any prohibited items',
          'url': 'https://www.datocms-assets.com/6524/1538054782-voorhoede-31.jpg',
        },
      }
    },
}),
)
