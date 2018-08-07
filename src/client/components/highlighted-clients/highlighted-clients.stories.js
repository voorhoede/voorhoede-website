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
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495070-logo-olx.svg', name: 'OLX' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495095-logo-hyperloop.svg', name: 'Delft Hyperloop' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495094-logo-funda.svg', name: 'Funda' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495096-logo-npo.svg', name: 'NPO' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495144-logo-abn.svg', name: 'ABN AMRO' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495145-logo-hotelspecials.svg', name: 'HotelSpecials' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495143-logo-2dehands.svg', name: '2dehands.be' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495147-logo-ziggo.svg', name: 'Ziggo' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495146-logo-sita.svg', name: 'Sita' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495147-logo-trouw.svg', name: 'Trouw' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495146-logo-hva.svg', name: 'Hogeschool van Amsterdam' },
          { logoSrc: 'https://www.datocms-assets.com/2850/1529495144-logo-grandvision.svg', name: 'GrandVision' }
        ]"
        ctaLabel="Get your own name on the list"
        ctaLink="/en/contact/"
      />
    `,
  }),
)
