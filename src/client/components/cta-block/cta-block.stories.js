import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { text, withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import CtaBlock from './cta-block.vue'
import README from './README.md'

const stories = storiesOf('Components/Cta Block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('cta-block', CtaBlock)

stories.add(
  'Cta Block with body',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    methods: {
      clickHandler: action('Button'),
    },
    template: `
      <div style="margin-top: 55px;">
        <cta-block
          ctaLabel="${ text('ctaLabel', 'Drop us a line') }"
          ctaTo="https://voorhoede.nl"
        >
          <template slot="heading">
            <h2 class="h4">${ text('heading', 'Got a project you need to bring to life?') }</h2>
          </template>
          <template slot="body">
            <p class="body">${ text('body', 'For us, that’s about technology and user experience. Fast, available for all, enjoyable to use. And fun to build. This is how our team bands together, adhering to the same values, to make sure we achieve a solid result for clients both large and small. Does that fit you?') }</p>
          </template>
        </cta-block>
      </div>
    `,
  }),
)

stories.add(
  'Cta Block without body',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    methods: {
      clickHandler: action('Button'),
    },
    template: `
      <div style="margin-top: 55px;">
        <cta-block
          ctaLabel="${ text('ctaLabel', 'Drop us a line') }"
          ctaTo="https://voorhoede.nl"
        >
          <template slot="heading">
            <h2 class="h4">${ text('heading', 'Got a project you need to bring to life?') }</h2>
          </template>
        </cta-block>
      </div>
    `,
  }),
)

stories.add(
  'Cta Block with alternate link',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    methods: {
      clickHandler: action('Button'),
    },
    template: `
      <div style="margin-top: 55px;">
        <cta-block
          alternateLink
          ctaLabel="${ text('ctaLabel', 'Drop us a line') }"
          ctaTo="https://voorhoede.nl"
          alternateLinkLabel="${ text('alternateLinkLabel', 'Rss feed') }"
          alternateLinkTo="https://voorhoede.nl"
          alternateLinkExternal="true"
        />
      </div>
    `,
  }),
)
