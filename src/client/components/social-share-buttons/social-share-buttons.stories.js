import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import SocialShareButtons from './social-share-buttons.vue'
import README from './README.md'

const stories = storiesOf('Components/Social Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('social-share-buttons', SocialShareButtons)

stories.add(
  'Social Buttons',
  () => ({
    template: `
      <social-share-buttons title="Give us a shoutout" />
    `,
  }),
)