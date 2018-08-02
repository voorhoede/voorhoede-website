import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import pageHeaderDecoration from './page-header-decoration.vue'
import README from './README.md'

const stories = storiesOf('Components/Page Header', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('page-header-decoration', pageHeaderDecoration)

stories.add(
  'Page Header - with curly bracket',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <div style="padding: 5rem 0; background: var(--bg-pastel);">
        <page-header-decoration style="height: 100vh;" curly-bracket/>
      </div>
    `,
  }),
)

stories.add(
  'Page Header - without curly bracket',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: '<page-header-decoration style="height: 100vh;"/>',
  }),
)
