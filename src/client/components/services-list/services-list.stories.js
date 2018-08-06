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
    template: `
      <services-list
        :services="[
          {
            title: 'We learn, we train',
            subtitle: 'Kick-start your project',
            characteristics: [
              'Get a roadmap',
              'Budget indication for your project',
              'Test your idea using a prototype',
              'With our input, you decide the next step',
            ],
            href: '/services/project-kick-start',
          },
          {
            title: 'Need a team?',
            subtitle: 'Your own agile team',
            characteristics: [
              'A dedicated team',
              'Scrum master, developers and optional designers',
              'On-site or at our office',
              'You stay in charge',
            ],
            href: '/services/agile-team',
          },
          {
            title: 'Need developers?',
            subtitle: 'Front-end specialists',
            characteristics: [
              'Experts in JavaScript (frameworks), HTML and CSS',
              'Who quickly get the hang of your project',
              'Back-up of 20 colleagues',
              'Immediately available',
            ],
            href: '/services/front-end-specialists',
          },
        ]"
      />
    `,
  }),
)
