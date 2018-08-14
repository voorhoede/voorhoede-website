import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import CaseExcerpt from './case-excerpt.vue'
import README from './README.md'

const stories = storiesOf('Components/Case Excerpt', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('case-excerpt', CaseExcerpt)

stories.add(
  'Case Excerpt tooltip center',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    data: () => {
      return {
        currentLocale: 'en'
      }
    },
    template: `
      <div style="margin: 25px;">
        <case-excerpt
          caseId="1"
          primaryLabel="See more"
          :primarySlug="{ name: 'locale-cases-slug', params: {slug: 'funda', locale: currentLocale }}"
          secondaryLabel="Learn more"
          :secondarySlug="{ name: 'locale-cases', params: { locale: currentLocale }}"
          imageName="logo"
          caseDescriptionHeader="A brand new Funda"
          caseDescriptionBody="The biggest, most responsive and modular website for real estate in the Netherlands"
        />
      </div>
    `,
  }),
)

stories.add(
  'Case Excerpt tooltip left',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    data: () => {
      return {
        currentLocale: 'en'
      }
    },
    template: `
      <div style="margin: 25px;">
        <case-excerpt
          caseId="1"
          primaryLabel="See more"
          :primarySlug="{ name: 'locale-cases-slug', params: { slug: 'funda', locale: currentLocale }}"
          secondaryLabel="Learn more"
          :secondarySlug="{ name: 'locale-cases', params: { locale: currentLocale }}"
          imageName="logo"
          caseDescriptionHeader="A brand new Funda"
          caseDescriptionBody="The biggest, most responsive and modular website for real estate in the Netherlands"
          alignTooltip="left"
        />
      </div>
    `,
  }),
)

stories.add(
  'Case Excerpt tooltip right',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    data: () => {
      return {
        currentLocale: 'en'
      }
    },
    template: `
      <div style="margin: 25px;">
        <case-excerpt
          caseId="1"
          primaryLabel="See more"
          :primarySlug="{ name: 'locale-cases-slug', params: {slug: 'funda', locale: currentLocale }}"
          secondaryLabel="Learn more"
          :secondarySlug="{ name: 'locale-cases', params: { locale: currentLocale }}"
          imageName="logo"
          caseDescriptionHeader="A brand new Funda"
          caseDescriptionBody="The biggest, most responsive and modular website for real estate in the Netherlands"
          alignTooltip="right"
        />
      </div>
    `,
  }),
)
