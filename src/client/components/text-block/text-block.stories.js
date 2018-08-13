import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import TextBlock from './text-block.vue'
import README from './README.md'

const stories = storiesOf('Components/Text Block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('text-block', TextBlock)

stories.add(
  'Text Block with title',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <text-block
        title="The solution"
      >
        <p class="text-block__item body">
          At De Voorhoede, we’re a technology minded bunch. So we started with a technology based idea: can we automatically detect litter in a picture? It turns out we can! And not just that: we can detect if there’s plastic in it, if you made a picture of a bottle, if you can see a brand name on it, and much more. How? We’re leveraging Google’s Vision API, a cloud service analysing images using machine learning. After a quick test we’re convinced this idea could work. But a tech-y idea is still a way off from something that would help the Plastic Soup Surfer.
        </p>
      </text-block>
    `,
  }),
)

stories.add(
  'Text Block without title',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
    <text-block>
      <p class="text-block__item body">
        Our front-end guide is a custom made component library. Each component in the front-end guide is a small bundle of HTML, CSS and/or JavaScript code. Front-end developers build these components independently. Some examples of components are a search field, a contact form and a navigation menu. We use them to compose pages, like the home page or search results page.
      </p>
      <p class="text-block__item body">
        We always develop and test components in isolation. This way we make sure that subsequent changes will not affect the rest of the website. When a component is delivered but not ready to use, you can implement it at a later stage without any hassle.
      </p>
    </text-block>
    `
  }),
)
