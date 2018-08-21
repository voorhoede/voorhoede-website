import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import createStore from '../../store'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppHeader from './app-header.vue'
import README from './README.md'

const stories = storiesOf('Components/App Header', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-header', AppHeader)

stories.add(
  'App Header',
  () => ({
    store: createStore(),
    template: '<app-header />',
  }),
)
