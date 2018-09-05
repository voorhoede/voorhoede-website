import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'

import '../app-core/index.css'

import pageHeader from './page-header.vue'
import README from './README.md'

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
          title="We are De Voorhoede"
          sub-title="How can we help?"
          :image="image">
        </page-header>
      </div>
    `,
    data: () => {
      return {
        image: {
          'url': 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
          'alt': '',
        },
      }
    }
  }),
)

stories.add(
  'Page Header Home',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <div style="background: var(--bg-pastel);">
        <page-header style="height: 100vh;"
          isHomepage
          title="We are De Voorhoede"
          sub-title="How can we help?"
          :image="image">
        </page-header>
      </div>
    `,
    data: () => {
      return {
        image: {
          'url': 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
          'alt': '',
        },
      }
    }
  }),
)
