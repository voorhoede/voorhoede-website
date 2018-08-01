import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import PageTitle from './page-title.vue'
import README from './README.md'

const stories = storiesOf('Components/Page Title', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('page-title', PageTitle)

stories.add(
  'Page Title',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <page-title seo-title="We are De Voorhoede - how can we help">
        <template slot="title">
          <span>We are De Voorhoede</span>
        </template>
        <template slot="subTitle">
          <span>How can we help?</span>
        </template>
      </page-title>
    `,
  }),
)
