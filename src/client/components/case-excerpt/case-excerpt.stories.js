import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import '../app-core/index.css'
import createStore from '../../store'

import CaseExcerpt from './case-excerpt.vue'
import README from './README.md'

const stories = storiesOf('Components/Case Excerpt', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('case-excerpt', CaseExcerpt)

stories.add(
  'Case Excerpt tooltip center',
  () => ({
    store: createStore(),
    template: `
      <div style="margin: 25px;">
        <case-excerpt
          case-id="1"
          primary-label="See more"
          slug="funda"
          secondary-label="Learn more"
          image-url="/images/logo.svg"
          title="A brand new Funda"
          body="The biggest, most responsive and modular website for real estate in the Netherlands"
        />
      </div>
    `,
  }),
)

stories.add(
  'Case Excerpt tooltip left',
  () => ({
    store: createStore(),
    template: `
      <div style="margin: 25px;">
        <case-excerpt
          case-id="1"
          primary-label="See more"
          slug="funda"
          secondary-label="Learn more"
          image-url="/images/logo.svg"
          title="A brand new Funda"
          body="The biggest, most responsive and modular website for real estate in the Netherlands"
          align-tooltip="left"
        />
      </div>
    `,
  }),
)

stories.add(
  'Case Excerpt tooltip right',
  () => ({
    store: createStore(),
    template: `
      <div style="margin: 25px;">
        <case-excerpt
          case-id="1"
          primary-label="See more"
          slug="funda"
          secondary-label="Learn more"
          image-url="/images/logo.svg"
          title="A brand new Funda"
          body="The biggest, most responsive and modular website for real estate in the Netherlands"
          align-tooltip="right"
        />
      </div>
    `,
  }),
)
