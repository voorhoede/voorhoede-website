import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppMobileMenu from './app-mobile-menu.vue'
import README from './README.md'

const stories = storiesOf('Components/App Mobile Menu', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-mobile-menu', AppMobileMenu)

stories.add(
  'App Mobile Menu',
  () => ({
    template: '<app-mobile-menu/>',
  }),
)
