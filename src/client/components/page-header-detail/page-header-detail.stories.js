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
  'Page Header Detail',
  () => ({
    template: '<page-header-detail/>',
  }),
)
