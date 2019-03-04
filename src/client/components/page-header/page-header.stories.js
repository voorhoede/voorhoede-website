import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'

import '../app-core/index.css'

import pageHeader from './page-header.vue'
import README from './README.md'

const byline = 'We are De Voorhoede'
const headline = 'We build web apps like no other'
const headingOptions = [ 'byline', 'headline' ]

const stories = storiesOf('Components/Page Header', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('page-header', pageHeader)

stories.add(
  'Page Header',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <div style="background: var(--bg-pastel);">
        <page-header
          headline="${text('headline', headline) }"
          byline="${text('byline', byline) }"
          heading="${select('heading', headingOptions)}"
          :fill-screen="${boolean('fill-screen', false)}"
          :has-curly-bracket="${boolean('has-curly-bracket', false)}"
          :image="image">
        </page-header>
      </div>
    `,
    data: () => {
      return {
        image: {
          'url': 'https://www.datocms-assets.com/6524/1535638068-drop-fly.svg',
          'alt': '',
        },
      }
    }
  }),
)
