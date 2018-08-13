import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import HighlightedClients from './highlighted-clients.vue'
import README from './README.md'

const stories = storiesOf('Components/Highlighted Clients', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('highlighted-clients', HighlightedClients)

stories.add(
  'Highlighted Clients',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <highlighted-clients
        :clients="[
          { logoSrc: '/client-logos/olx.svg', name: 'OLX' },
          { logoSrc: '/client-logos/hyperloop.svg', name: 'Delft Hyperloop' },
          { logoSrc: '/client-logos/funda.svg', name: 'Funda' },
          { logoSrc: '/client-logos/npo.svg', name: 'NPO' },
          { logoSrc: '/client-logos/abn-amro.svg', name: 'ABN AMRO' },
          { logoSrc: '/client-logos/hotelspecials.svg', name: 'HotelSpecials' },
          { logoSrc: '/client-logos/2dehands.svg', name: '2dehands.be' },
          { logoSrc: '/client-logos/ziggo.svg', name: 'Ziggo' },
          { logoSrc: '/client-logos/sita.svg', name: 'Sita' },
          { logoSrc: '/client-logos/trouw.svg', name: 'Trouw' },
          { logoSrc: '/client-logos/hva.svg', name: 'Hogeschool van Amsterdam' },
          { logoSrc: '/client-logos/grandvision.svg', name: 'GrandVision' }
        ]"
        ctaLabel="Get your name on the list"
      />
    `,
  }),
)
