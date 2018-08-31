import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'

import '../app-core/index.css'

import PageHeader from './page-header.vue'
import README from './README.md'

const stories = storiesOf('Components/Page Header', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('page-header', PageHeader)

stories.add(
  'Page Header - with brick',
  () => ({
    template: `<div class="grid page">
                <page-header detailPage brick title="Drop & fly" sub-title="Case page">
                  <img slot="image" src="https://www.datocms-assets.com/6524/1535638068-drop-fly.svg" alt="">
                </page-header>
              </div>`,
  }),
)
.add(
  'Page Header - without brick',
  () => ({
    template: `<div class="grid page">
                <page-header detailPage title="Peer-to-peer APIs" sub-title="Blog">
                  <img slot="image" src="https://www.datocms-assets.com/6524/1535465393-unicorn.svg" alt="">
                </page-header>
              </div>`,
  }),
)
