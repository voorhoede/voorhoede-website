import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
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
    template: `<case-pull-quote-composition
      alignment-inverse="true"
      image-url="/images/logo.svg"
      pullquote="Drop and fly is installed in over 35 airports around the globe"
      body="Drop and Fly units are placed all around the world. The user interface must be adaptable to each specific airport. So we developed a system to customise styling, texts and available languages. Now changing or adding an airport theme, language selection or text is just a matter of simple configuration.
      This way the front-end can be easily adapted to the specific demands of Sita's current and future clients. A solution they can use for years to come!"
    />`,
  }),
)
