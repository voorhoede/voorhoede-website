import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AcademyEvent from './academy-event.vue'
import README from './README.md'

const stories = storiesOf('Components/Academy Event', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('academy-event', AcademyEvent)

stories.add(
  'Academy Event',
  () => ({
    template: '<academy-event/>',
  }),
)
