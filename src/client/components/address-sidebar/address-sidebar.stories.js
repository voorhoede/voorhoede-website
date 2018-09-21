import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'

import '../app-core/index.css'

import AddressSidebar from './address-sidebar.vue'

const stories = storiesOf('Components/Address Sidebar', module)
  .addDecorator(withKnobs)

Vue.component('address-sidebar', AddressSidebar)

stories.add(
  'Address Sidebar',
  () => ({
    template: '<address-sidebar/>',
  }),
)
