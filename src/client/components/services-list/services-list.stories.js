import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ServicesList from './services-list.vue'
import README from './README.md'

const stories = storiesOf('Components/Services List', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('services-list', ServicesList)

stories.add(
  'Services List',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    data() {
      return {
        services: [
          {
            tagline: 'We learn, we train',
            title: 'Kick-start your project',
            teaser: 'Get a roadmap\nBudget indication for your project\nTest your idea using a prototype\nWith our input, you decide the next step',
            slug: 'project-kick-start',
          },
          {
            tagline: 'Need a team?',
            title: 'Your own agile team',
            teaser: 'A dedicated team\nScrum master, developers and optional designers\nOn-site or at our office\nYou stay in charge',
            slug: 'agile-team',
          },
          {
            tagline: 'Need developers?',
            title: 'Front-end specialists',
            teaser: 'Experts in JavaScript (frameworks), HTML and CSS\nWho quickly get the hang of your project\nBack-up of 20 colleagues\nImmediately available',
            slug: 'front-end-specialists',
          },
        ]
      }
    },
    template: `
      <services-list
        :services="services"
      />
    `,
  }),
)
