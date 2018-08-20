import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
import createStore from '../../store'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import CaseMeta from './case-meta.vue'
import README from './README.md'

const stories = storiesOf('Components/Case Meta', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('case-meta', CaseMeta)

stories.add(
  'Case Meta',
  () => ({
    store: createStore(),
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <case-meta
        expertiseTitle="Expertise"
        :expertises="[{title: 'Development'}, {title: 'Prototyping'}]"
        platformTitle="Platform"
        :platforms="[{title: 'Vuejs'}, {title: 'Node.js'}, {title: 'Nuxt'}]"
        deliverableTitle="Deliverables"
        :deliverables="[{title: 'API intergration'}, {title: 'BFF (back-end for front-end)'}]"
        interestedTitle="Interested"
        interestedLinkLabel="Visit site"
        interestedLinkUrl="https://google.nl"
      />
    `,
  }),
)
