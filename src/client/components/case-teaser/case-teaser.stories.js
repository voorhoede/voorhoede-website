import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import CaseTeaser from './case-teaser.vue'
import README from './README.md'

const stories = storiesOf('Components/Case Teaser', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('case-teaser', CaseTeaser)

stories.add(
  'Case Teaser',
  () => ({
    template: `
      <case-teaser
        :image="image"
        title="Self-service baggage drop-ofgif with a web UI"
      />`,
      data() {
        return {
          image: {
            'format': 'jpeg',
            'width': 720,
            'height': 400,
            'alt': 'User confirms on drop and fly screen that bags do not contain any prohibited items',
            'url': 'https://www.datocms-assets.com/6524/1534941302-drop-and-fly.jpg',
          },
        }
      },
  }),
)

stories.add(
  'Case Teaser Small',
  () => ({
    template: `
      <case-teaser
        :image="image"
        :small="true"
        :inverse="false"
        title="The idea: leverage machine learning to detect plastic litter"
      />`,
      data() {
        return {
          image: {
            'format': 'jpeg',
            'width': 720,
            'height': 400,
            'alt': 'User confirms on drop and fly screen that bags do not contain any prohibited items',
            'url': 'https://www.datocms-assets.com/6524/1534941302-drop-and-fly.jpg',
          },
        }
      },
  }),
)

stories.add(
  'Case Teaser Small inverse',
  () => ({
    template: `
      <case-teaser
        :image="image"
        :small="true"
        :inverse="true"
        title="The idea: leverage machine learning to detect plastic litter"
      />`,
      data() {
        return {
          image: {
            'format': 'jpeg',
            'width': 720,
            'height': 400,
            'alt': 'User confirms on drop and fly screen that bags do not contain any prohibited items',
            'url': 'https://www.datocms-assets.com/6524/1534941302-drop-and-fly.jpg',
          },
        }
      },
  }),
)
