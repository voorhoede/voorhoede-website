import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import ServiceExcerpt from './service-excerpt.vue'
import README from './README.md'

const stories = storiesOf('Components/Service Excerpt', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('service-excerpt', ServiceExcerpt)

stories.add(
  'Service Excerpt',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <service-excerpt
        title="We learn, we train"
        subtitle="Kick-start your project"
        :characteristics="[
          'Get a roadmap',
          'Budget indication for your project',
          'Test your idea using a prototype',
          'With our input, you decide the next step',
        ]"
        href="/services/project-kick-start"
      />
    `,
  }),
)
