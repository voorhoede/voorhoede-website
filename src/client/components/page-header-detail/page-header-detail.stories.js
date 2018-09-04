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
    template: `<div class="grid page">
                <page-header-detail
                  hasBrick
                  title="Drop & fly"
                  sub-title="Case page">
                  <img slot="image" src="https://www.datocms-assets.com/6524/1535373222-screen-shot-2018-08-27-at-14-10-21.png" alt="">
                </page-header-detail>
              </div>`,
  }),
)
.add(
  'Page Header Detail - without brick',
  () => ({
    template: `<div class="grid page">
                <page-header-detail
                  title="Peer-to-peer APIs"
                  sub-title="Blog">
                  <img slot="image" src="https://www.datocms-assets.com/6524/1535465393-unicorn.svg" alt="">
                </page-header-detail>
              </div>`,
  }),
)
