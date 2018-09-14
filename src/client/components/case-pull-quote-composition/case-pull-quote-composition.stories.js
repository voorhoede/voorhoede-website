import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import CasePullQuoteComposition from './case-pull-quote-composition.vue'
import README from './README.md'

const stories = storiesOf('Components/Case Pull Quote Composition', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('case-pull-quote-composition', CasePullQuoteComposition)

stories.add(
  'Case Pull Quote Composition',
  () => ({
    data() {
      return {
        text:`
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <strong>ullamco laboris</strong> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        `
      }
    },
    template: `
    <div class="grid">
      <case-pull-quote-composition
        :inverse="false"
        :image="{
          url: 'https://www.datocms-assets.com/6524/1535640311-earth.svg',
          alt: 'A spherical model of Earth'
        }"
        pullquote="Drop and fly is installed in over 35 airports around the globe"
        :text="text"
      />
    </div>`,
  }),
).add(
  'Case Pull Quote Composition inversed',
  () => ({
    data() {
      return {
        text:`
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <strong>ullamco laboris</strong> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        `
      }
    },
    template: `
    <div class="grid">
      <case-pull-quote-composition
        :inverse="true"
        :image="{
          url: 'https://www.datocms-assets.com/6524/1535640311-earth.svg',
          alt: 'A spherical model of Earth'
        }"
        pullquote="Drop and fly is installed in over 35 airports around the globe"
        :text="text"
      />
    </div>`,
  }),
).add(
  'Case Pull Quote Composition no image',
  () => ({
    data() {
      return {
        text:`
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <strong>ullamco laboris</strong> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        `
      }
    },
    template: `
    <div class="grid">
      <case-pull-quote-composition
        :inverse="false"
        pullquote="Drop and fly is installed in over 35 airports around the globe"
        :text="text"
      />
    </div>`,
  }),
)
