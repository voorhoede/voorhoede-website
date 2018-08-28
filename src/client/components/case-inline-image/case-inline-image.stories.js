import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import CaseInlineImage from './case-inline-image.vue'
import README from './README.md'

const stories = storiesOf('Components/Case Inline Image', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('case-inline-image', CaseInlineImage)

stories.add(
  'Case Inline Image Small',
  () => ({
    template: `
      <case-inline-image
        :image="image"
        :inverse="false"
        title="The idea: leverage machine learning to detect plastic litter"
      />`,
      data() {
        return {
          image: {
            'format': 'jpeg',
            'width': 720,
            'height': 480,
            'alt': 'User confirms on drop and fly screen that bags do not contain any prohibited items',
            'url': 'https://www.datocms-assets.com/6524/1535460060-pick-up-10idea.jpg',
          },
        }
      },
  }),
)

stories.add(
  'Case Teaser Small inverse',
  () => ({
    template: `
      <case-inline-image
        :image="image"
        :inverse="true"
        title="The idea: leverage machine learning to detect plastic litter"
      />`,
      data() {
        return {
          image: {
            'format': 'jpeg',
            'width': 720,
            'height': 480,
            'alt': 'User confirms on drop and fly screen that bags do not contain any prohibited items',
            'url': 'https://www.datocms-assets.com/6524/1535460065-1526629287-pick-up-10-idea-copy.png',
          },
        }
      },
  }),
)
