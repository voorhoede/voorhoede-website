import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ServicesBlock from './services-block.vue'
import README from './README.md'

const stories = storiesOf('Components/Services Block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('services-block', ServicesBlock)

stories.add(
  'Services Block',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <services-block
        :services="[
          {
            title: 'We learn, we train',
            subTitle: 'Kick-start your project',
            characteristics: [
              'Get a roadmap',
              'Budget indication for your project',
              'Test your idea using a prototype',
              'With our input, you decide the next step',
            ],
            ctaLink: '/services/project-kick-start',
          },
          {
            title: 'Need a team?',
            subTitle: 'Your own agile team',
            characteristics: [
              'A dedicated team',
              'Scrum master, developers and optional designers',
              'On-site or at our office',
              'You stay in charge',
            ],
            ctaLink: '/services/agile-team',
          },
          {
            title: 'Need developers?',
            subTitle: 'Front-end specialists',
            characteristics: [
              'Experts in JavaScript (frameworks), HTML and CSS',
              'Who quickly get the hang of your project',
              'Back-up of 20 colleagues',
              'Immediately available</li></ul>',
            ],
            ctaLink: '/services/front-end-specialists',
          },
        ]"
      />
    `,
  }),
)
