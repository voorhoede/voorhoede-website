import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
import VueI18n from 'vue-i18n'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import HorizontalCarousel from '../horizontal-carousel'
import ResponsiveImage from '../responsive-image'
import ServiceExcerpt from '../service-excerpt'
import README from './README.md'

const stories = storiesOf('Components/Horizontal Carousel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('horizontal-carousel', HorizontalCarousel)
Vue.component('responsive-image', ResponsiveImage)
Vue.component('service-excerpt', ServiceExcerpt)

stories.add(
  'Horizontal Carousel',
  () => ({
    i18n: new VueI18n({ locale: 'en' }),
    template: `
      <horizontal-carousel>
        <template slot="slides">
          <responsive-image
            :image="{
              format: 'jpeg',
              width: 1280,
              height: 720,
              alt: 'Two hands forming a heart around the sun during a sunset',
              url: 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
            }"
          />
          <service-excerpt
            tagline="We learn, we train"
            title="Kick-start your project"
            teaser="Get a roadmap\nBudget indication for your project\nTest your idea using a prototype\nWith our input, you decide the next step"
            slug="/services/project-kick-start"
          />
          <responsive-image
            :image="{
              format: 'jpeg',
              width: 1280,
              height: 720,
              alt: 'Two hands forming a heart around the sun during a sunset',
              url: 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
            }"
          />
        </template>
      </horizontal-carousel>
    `,
  }),
)
