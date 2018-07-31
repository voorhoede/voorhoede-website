import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs, text } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppIcon from './app-icon.vue'
import README from './README.md'

const stories = storiesOf('Components/App Icon', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-icon', AppIcon)

stories.add(
  'App Icon',
  () => ({
    data () {
      return {
        name: text('icon name', 'eye-active'),
        alt: text('image alt text', ''),
      }
    },
    i18n: new VueI18n({ locale: 'en' }),
    template: '<app-icon :name="name" :alt="alt" />',
  }),
)

stories.add(
  'App Icon - in text',
  () => ({
    data () {
      return {
        name: text('icon name', 'eye-active'),
        alt: text('image alt text', ''),
      }
    },
    i18n: new VueI18n({ locale: 'en' }),
    template: '<p> I was hit in the <app-icon :name="name" :alt="alt" /> Awfully hard</p>',
  }),
)
