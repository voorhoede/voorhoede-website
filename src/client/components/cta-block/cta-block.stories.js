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
  'Cta Block',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    methods: {
      clickHandler: action('Button'),
    },
    template: `
      <div style="margin-top: 55px;">
        <cta-block
          title="${ text('title', 'got a project you need to bring to life?') }"
          ctaLabel="${ text('ctaLabel', 'Drop us a line') }"
          ctaTo="http://google.nl"
        />
      </div>
    `,
  }),
)
