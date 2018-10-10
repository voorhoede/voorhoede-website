import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import createStore from '../../store'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppFooter from './app-footer.vue'
import README from './README.md'

const stories = storiesOf('Components/App Footer', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-footer', AppFooter)

stories.add(
  'App Footer',
  () => ({
    store: createStore(),
    template: '<app-footer/>',
  }),
)
