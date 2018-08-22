import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import CasePullQuoteComposition from './case-pull-quote-composition.vue'
import README from './README.md'

const stories = storiesOf('Components/Case Pull Quote Composition', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('case-pull-quote-composition', CasePullQuoteComposition)

stories.add(
  'Case Pull Quote Composition',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: '<case-pull-quote-composition/>',
  }),
)
