import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import AppCaseExcerpt from './app-case-excerpt.vue'
import README from './README.md'

const stories = storiesOf('Components/App Case Excerpt', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('app-case-excerpt', AppCaseExcerpt)

stories.add(
  'App Case Excerpt',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `<div style="margin-top: 25px;">
                <app-case-excerpt />
              </div>`,
  }),
)
