import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import QuoteBlock from './quote-block.vue'
import README from './README.md'

const stories = storiesOf('Components/Quote Block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('quote-block', QuoteBlock)

stories.add(
  'Quote Block',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <quote-block
        quote="Drop &amp; Fly allows passengers to check in their own baggage. In less than a minute, with state-of-the-art technology."
        cite="The Drop &amp; fly team"
      />
    `,
  }),
)
