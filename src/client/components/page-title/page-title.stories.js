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
      <page-title pageTitle="The (not visible) h1 goes here">
        <template slot="title">
          <p>We are De Voorhoede</p>
        </template>
        <template slot="subTitle">
          <p>How can we help?</p>
        </template>
      </page-title>
    `,
  }),
)
