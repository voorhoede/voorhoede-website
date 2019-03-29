import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'

import '../app-core/index.css'

import ContactSidebar from './contact-sidebar.vue'

const stories = storiesOf('Components/Contact Sidebar', module)
  .addDecorator(withKnobs)

Vue.component('address-sidebar', ContactSidebar)

stories.add(
  'Contact Sidebar',
  () => ({
    template: '<address-sidebar/>',
  }),
)
