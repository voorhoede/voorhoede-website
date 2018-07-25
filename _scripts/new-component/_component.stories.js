import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import __NAME_PASCAL__ from './__NAME_KEBAB__.vue'
import README from './README.md'

const stories = storiesOf('Components/__NAME_START__', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('__NAME_KEBAB__', __NAME_PASCAL__)

stories.add(
  '__NAME_START__',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: '<__NAME_KEBAB__/>',
  }),
)
