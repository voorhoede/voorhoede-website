import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
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
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <case-teaser
        :image="image"
        title="Self-service baggage drop-off with a web UI"
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
