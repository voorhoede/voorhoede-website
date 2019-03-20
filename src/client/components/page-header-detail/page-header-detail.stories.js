import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'

import '../app-core/index.css'

import PageHeaderDetail from './page-header-detail.vue'
import README from './README.md'

const stories = storiesOf('Components/Page Header Detail', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('page-header-detail', PageHeaderDetail)

stories.add(
  'Page Header Detail - with brick',
  () => ({
    template: `
              <page-header-detail
                hasBrick
                title="Drop & fly"
                sub-title="Case page"
                :image="image">
              </page-header-detail>
              `,
    data: () => {
      return {
        image: {
          'url': 'https://www.datocms-assets.com/6524/1535638068-drop-fly.svg',
          'alt': 'drop and fly illustration',
        },
      }
    }
  }),
)
.add(
  'Page Header Detail - without brick',
  () => ({
    template: `
              <page-header-detail
                title="Peer-to-peer APIs"
                sub-title="Blog"
                :image="image">
              </page-header-detail>
              `,
    data: () => {
      return {
        image: {
          'url': 'https://www.datocms-assets.com/6524/1535638068-drop-fly.svg',
          'alt': 'drop and fly illustration',
        },
      }
    }
  }),
)